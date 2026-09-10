import 'dotenv/config';
import express, { type ErrorRequestHandler } from 'express';
import { createServer } from 'node:http';
import path from 'node:path';
import Stripe from 'stripe';
import {
  PRODUCT,
  createPaymentIntentRequestSchema,
  type CreatePaymentIntentResponse,
} from '../shared/checkout';

const app = express();
const server = createServer(app);
const port = Number(process.env.PORT || 3000);
const production = process.env.NODE_ENV === 'production';
const trustedOrigin = new URL(process.env.APP_URL || `http://localhost:${port}`).origin;
let stripe: Stripe | undefined;
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return undefined;
  return stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY, { maxNetworkRetries: 2 });
}

app.disable('x-powered-by');
// Set only to the addresses/subnets of deployment-controlled reverse proxies.
if (process.env.TRUST_PROXY) app.set('trust proxy', process.env.TRUST_PROXY.split(',').map(value => value.trim()));
app.use((_req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});
app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Stripe sends server-to-server requests, so this uses signatures, not Origin.
app.post('/api/webhook', express.raw({ type: 'application/json', limit: '256kb' }), (req, res) => {
  const client = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!client || !secret) {
    res.status(503).json({ error: 'Webhook is not configured.' });
    return;
  }
  const signature = req.get('stripe-signature');
  if (!signature || !Buffer.isBuffer(req.body)) {
    res.status(400).json({ error: 'Invalid webhook signature.' });
    return;
  }
  try {
    client.webhooks.constructEvent(req.body, signature, secret);
  } catch {
    res.status(400).json({ error: 'Invalid webhook signature.' });
    return;
  }
  // Acknowledgement only: no order storage, fulfillment, or PII logging.
  res.json({ received: true });
});

// Ephemeral abuse control only, not persistent orders or idempotency storage.
// Do not trust forwarded IP headers without a deployment-specific proxy policy.
const requests = new Map<string, { count: number; expires: number }>();
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of requests) {
    if (entry.expires <= now) requests.delete(ip);
  }
}, 60_000).unref();

app.post('/api/create-payment-intent', (req, res, next) => {
  if (req.get('origin') !== trustedOrigin) {
    res.status(403).json({ error: 'Untrusted request origin.' });
    return;
  }
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  let entry = requests.get(ip);
  if (!entry || entry.expires <= now) {
    if (!entry && requests.size >= 10000) {
      res.status(429).json({ error: 'Too many requests. Try again later.' });
      return;
    }
    entry = { count: 0, expires: now + 60_000 };
    requests.set(ip, entry);
  }
  if (++entry.count > 20) {
    res.setHeader('Retry-After', Math.ceil((entry.expires - now) / 1000));
    res.status(429).json({ error: 'Too many requests. Try again later.' });
    return;
  }
  if (!req.is('application/json')) {
    res.status(415).json({ error: 'Expected application/json.' });
    return;
  }
  next();
}, express.json({ limit: '16kb' }), async (req, res) => {
  const parsed = createPaymentIntentRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid checkout request.' });
    return;
  }
  const client = getStripe();
  if (!client) {
    res.status(503).json({ error: 'Payments are not configured.' });
    return;
  }
  const { customer, quantity, productId, attemptId } = parsed.data;
  const amount = PRODUCT.unitAmount * quantity + PRODUCT.shippingAmount;
  try {
    const intent = await client.paymentIntents.create({
      amount,
      currency: PRODUCT.currency,
      payment_method_types: ['card'],
      receipt_email: customer.email,
      shipping: {
        name: customer.fullName,
        phone: customer.phone,
        address: { line1: customer.address, city: customer.city, country: 'PK' },
      },
      metadata: {
        productId,
        quantity: String(quantity),
        unit_amount: String(PRODUCT.unitAmount),
        ...(customer.notes ? { notes: customer.notes } : {}),
      },
    }, { idempotencyKey: attemptId });
    if (!intent.client_secret) {
      res.status(502).json({ error: 'Payment initialization failed.' });
      return;
    }
    const response: CreatePaymentIntentResponse = {
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount: intent.amount,
      currency: PRODUCT.currency,
      quantity,
    };
    res.json(response);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeIdempotencyError ||
        (error instanceof Stripe.errors.StripeError && error.code === 'idempotency_key_in_use')) {
      res.status(409).json({ error: 'Attempt conflict. Retry the identical request, or use a new attemptId after editing.' });
      return;
    }
    res.status(502).json({ error: 'Payment service unavailable. Retry the identical request with the same attemptId.' });
  }
});

// API misses must never return the SPA or expose payment/customer retrieval.
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
  res.status(status).json({ error: status === 413 ? 'Request too large.' : status === 400 ? 'Invalid request body.' : 'Internal server error.' });
};
app.use(handleError);

if (production) {
  const dist = path.resolve('dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR === 'true' ? false : { server },
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

server.listen(port, '0.0.0.0', () => {
  console.info(`Server listening on port ${port}`);
});

