# Khushboo Checkout

React/Vite custom checkout with Stripe Payment Element, served by one Express Node process. No database or local order storage: payments, shipping details, product/quantity metadata and refunds are managed in Stripe Dashboard. The PaymentIntent ID is the order reference.

## Setup

Use Node 22 LTS and install dependencies with `npm install`. Configure a local `.env` using the variables documented in `.env.example`:

- `VITE_STRIPE_PUBLISHABLE_KEY`: Stripe publishable test key, included in the browser build.
- `STRIPE_SECRET_KEY`: matching account/test-mode server secret.
- `STRIPE_WEBHOOK_SECRET`: signing secret from Stripe CLI locally, or the Dashboard endpoint in deployment.
- `APP_URL`: exact public origin, locally `http://localhost:3000`.
- `PORT`: defaults to 3000.
- `TRUST_PROXY`: optional trusted proxy IPs/subnets; leave empty for direct connections. Do not trust arbitrary forwarded headers.

The existing Gemini variables are unrelated to checkout. Never enter real card data during development. Before live deployment, confirm the merchant's Stripe account eligibility and ability to accept the configured PKR currency; test keys do not establish live account eligibility.

```bash
npm run dev
```

This runs Express and Vite middleware together, including `/checkout` and `/api`. Missing keys do not stop the server, but checkout is disabled or returns a configuration error.

## Routing

React Router uses one `BrowserRouter` in `src/main.tsx`. `src/App.tsx` routes `/` to `src/pages/Landingpage.tsx` and `/checkout` to `src/pages/CheckoutPage.tsx`; unknown paths render the landing page without redirecting. Landing CTAs and return-to-shop actions use router navigation, including browser back/forward support.

The checkout page is a thin adapter around `src/components/checkout/CheckoutPage.tsx`. It parses `qty` with a default of 1 and clamps it to 1-10. Quantity seeds checkout on mount only; changing the query while staying in checkout does not reset customer details, quantity or an active payment. Direct reloads and Stripe returns recover the existing payment instead of creating another one. Return parameters are captured in the checkout's pure initializer before replace navigation scrubs Stripe parameters, preserving other query parameters and the hash and keeping router state synchronized under StrictMode.

Use the Express server for direct URL/reload support in development and production. Any reverse proxy must forward frontend paths such as `/checkout` to that server, while keeping `/api` responses separate from the SPA fallback.

## Production

### Vercel

Deploy from the repository root. `vercel.json` uses the Vite preset, runs `npm run build`, and publishes `dist/`. The tracked `api/index.ts` exports the existing Express application as a Vercel Function; `/api` and `/api/*` route there before the SPA fallback. Vercel serves frontend assets directly. The generated root `server.js` is for standalone Node hosting, not the Vercel function entry.

Set `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `APP_URL` in Vercel's environment settings, then redeploy. `APP_URL` must exactly match the browser origin (scheme and hostname, including a port if present). Preview URLs need their own matching environment configuration. Vercel supplies `VERCEL=1`; this prevents the function from starting a listener or Vite middleware. Point the Stripe webhook endpoint to `https://YOUR_DOMAIN/api/webhook`.

After deploying, verify `/checkout` loads and `/api/unknown` returns JSON 404 rather than HTML. Confirm checkout POSTs reach Express in Chrome's Network tab. The rate limiter remains process-local and is not shared across function instances. Deployment and actual Stripe payment/3DS verification are still required.

### Standalone Node

```bash
npm run lint
npm run build
npm start
```

Build emits `dist/` and `server.js`. Deploy both with `package.json`, the lockfile and installed runtime dependencies; run from the project root. `npm start` uses POSIX environment assignment. On a native Windows shell, set `NODE_ENV=production` using that shell's syntax and run `node server.js`.

Serve over HTTPS, set `APP_URL` to the exact frontend origin and build with the publishable key for the same account/mode as the runtime secret key. Changing the publishable key requires rebuilding. `/api` errors never fall through to the SPA. `npm run preview` is frontend-only, not a payment integration preview.

If deployed behind a reverse proxy, configure its trusted addresses/subnets in `TRUST_PROXY` for accurate rate limiting. Redact Stripe return query strings in proxy/access logs; the app scrubs them after capture and serves a no-referrer header.

## Payment Lifecycle

1. Customer reviews details and quantity, then initializes payment. The server validates the strict request and computes the amount from `shared/checkout.ts` in integer PKR minor units.
2. Details lock and Stripe-hosted card fields appear in the existing checkout design. Card numbers/CVC never enter application state or the API.
3. Stripe confirms payment and handles bank authentication. Only `succeeded` displays a paid receipt; processing/unknown status blocks another payment.
4. Refresh and redirect recovery retrieve the existing intent using Stripe.js. Session storage retains only its ID/client secret and an attempt fingerprint/UUID/timestamp, not customer details.
5. The operator reviews successful payments and their shipping details in Stripe Dashboard and handles refunds there. Product ID, quantity, unit amount and optional bounded delivery notes are metadata.

Identical creation retries reuse an idempotency key for up to 20 hours. This is not permanent deduplication across devices, cleared storage or expired attempts. If storage fails, the UI warns that recovery is limited. Details cannot currently be edited after initialization; returning to the store does not cancel the payment. Keep the payment reference when contacting the operator.

Stripe records payment status, not courier delivery status. Fulfillment is manual; there is no inventory, custom admin UI, automatic shipping, custom email/SMS or courier tracking. Configure Stripe receipt settings and verify delivery in live mode before promising receipts; test mode does not provide normal live receipt delivery.

## Webhooks

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Use the CLI signing secret locally. For deployment, register the HTTPS `/api/webhook` endpoint in Stripe Dashboard with payment intent succeeded, failed and processing events. It verifies the signature against the raw request bytes and acknowledges delivery. No fulfillment or persistence is triggered, so retries produce no order-management side effects.

## Verification Status

Typecheck, production builds and server smoke checks have been run previously. Vitest Browser Mode now contains landing-page UI journeys in Chromium at desktop (1440x900) and mobile (390x844) viewports. These render the real app/router, but do not exercise Express or real payments.

```bash
npm run test:install
npm run test:landing
```

`npm test` runs all browser tests; `npm run test:watch` runs watch mode. A focused case can be run with `npm run test:landing -- -t "offer quantity"`. On Linux, missing browser system libraries may require `npx playwright install-deps chromium`.

The standalone `vitest.config.ts` disables `.env` loading, defines a dummy publishable key, and mocks Stripe loading. Tests block external requests, API requests and POSTs; do not replace these safeguards with real credentials. Coverage includes section/image rendering, anchors, FAQ toggling, offer quantities/totals, checkout CTAs, browser history, quantity bounds and unknown-route fallback.

Execution status: Chromium is not installed in the current environment. Download attempts timed out, so no browser assertions have run yet. Typecheck passes. Complete the browser installation and rerun before claiming these journeys pass. The normal production build was not rerun during this testing session because it loads local environment files.

Stripe credentials and browser testing are still required to validate:

- Direct `/checkout`, landing CTAs, browser history and responsive mobile/desktop layouts.
- Invalid customer data and quantity bounds; rejected client totals, unknown products and oversized/malformed requests.
- Stripe test success (`4242 4242 4242 4242`), decline (`4000 0000 0000 0002`) and authentication (`4000 0025 0000 3155`), using future expiry and test CVC.
- Repeated clicks, unchanged creation retries, lost responses, refresh, authentication return, uncertain status and canceled payments.
- Correct amount, email, shipping and metadata in the matching Stripe test Dashboard.
- Valid/invalid webhook signatures, repeated events, unavailable keys, origin restrictions and deployment proxy rate limiting.

Phase 1 UI is complete. Phase 2 implementation is present but is not live-payment/browser verified. Phase 3 has landing browser tests configured but not yet executed; full backend/payment E2E coverage remains pending.
