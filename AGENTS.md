# Repository Instructions

## Branching

- `main` is the canonical branch. Develop feature changes on a separate branch from up-to-date `main`, commit there, and merge back after verification. Before deleting a branch, fetch remote refs and verify its tip is an ancestor of `main`; preserve any unmerged work.

## Architecture

- Use explicit `.js` extensions for relative imports in the Vercel server-side TypeScript module graph (for example, `api/index.ts` imports `../server/index.js`). TypeScript resolves the source `.ts` files; Node ESM needs the emitted `.js` paths. Extensionless imports caused production `ERR_MODULE_NOT_FOUND` failures.

- Vercel exception: `api/index.ts` exports the same Express app as a Function; `vercel.json` publishes Vite `dist/` assets and routes `/api` before the SPA fallback. With Vercel's `VERCEL=1`, do not start a listener, Vite middleware, or Express static serving. Standalone Node hosting retains the single-server architecture. Configure `APP_URL` to the exact deployment browser origin; rate limiting remains per process/instance. Vercel deployment verification is pending until tested on a deployed URL.

- One Express/Node server (`server/index.ts`) owns `/api`, Vite middleware in development, and `dist/` serving in production. API misses must return JSON, never the SPA fallback.
- React 19 + TypeScript entry is `index.html` -> `src/main.tsx` -> `src/App.tsx`. One React Router `BrowserRouter` in `main.tsx` wraps App's routes for `/` and `/checkout`; unknown paths render the landing page. Use router navigation rather than manual history mutations.
- Preserve Stripe return parameters until checkout's pure recovery initializer captures them, then scrub with replace navigation after StrictMode initialization. Parse and clamp `qty` to 1-10 in the checkout route adapter; it seeds initial quantity only. Do not key/remount checkout or reset active payment state on query changes.
- No database, ORM, local order files, or application admin UI. Stripe PaymentIntents are the payment/order references; all manual order management is in Stripe Dashboard.
- `@/*` resolves from the repository root, not `src/`. Tailwind v4 uses `@tailwindcss/vite` and `src/index.css`, not a Tailwind config.
- Preserve `DISABLE_HMR=true` support, including disabled watching. Express injects its HTTP server into Vite HMR.

## Commands

- `npm install` installs frontend and server dependencies in this single package.
- `npm run dev` runs Express with Vite middleware on `0.0.0.0:3000` (or `PORT`), not two servers.
- `npm run lint` means `tsc --noEmit`, not ESLint. Run `npm run lint` then `npm run build` for verification.
- `npm run build` builds `dist/` and bundles the server to root `server.js` with external npm dependencies. Both outputs are generated and ignored; do not edit them.
- `npm start` serves the production app/API from one Node process after building. Its environment assignment uses POSIX shell syntax.
- `npm run preview` serves only Vite assets, not the Stripe API; use `npm start` to verify the complete production application.
- Vitest Browser Mode uses Chromium: `npm run test:install` installs the headless browser, `npm run test:landing` runs desktop/mobile landing journeys, `npm test` runs all tests, and `npm run test:watch` watches. Focus cases with `npm run test:landing -- -t "offer quantity"`.
- `vitest.config.ts` intentionally disables `.env` loading and supplies a dummy publishable key. Browser tests mock Stripe and block external/API/POST requests. Keep this isolated from real credentials; these UI journeys do not test the Express backend or actual payments.
- Check that Chrome DevTools MCP tools are actually available in the current session before starting browser testing. `.mcp.json` launches Windows Chrome through `cmd.exe` from WSL; preserve that setup. When connected, run `npm run dev` and use DevTools to verify landing -> checkout navigation, `qty` clamp (1-10), quantity locking after intent creation, and desktop/mobile layouts. Never enter real card data or real credentials; use Stripe test card numbers only.

## Directory Guide

- `shared/checkout.ts`: image-free product catalog in integer minor units and strict Zod API contracts. Server pricing authority lives here; never trust client totals.
- `src/data/fragranceData.ts`: display pricing derived from the shared catalog, promotion/copy data and imported asset mappings. Check hardcoded promotional copy when changing prices/shipping.
- `src/pages/Landingpage.tsx`: landing composition and checkout CTAs; `src/pages/CheckoutPage.tsx`: quantity/search-parameter and return-navigation adapter around the existing checkout implementation. Both are routed by `src/App.tsx`.
- `src/components/`: landing sections; `src/components/checkout/`: customer details, staged checkout, Stripe Payment Element, summary and minimal confirmed receipt.
- `src/types/checkout.ts`: UI checkout models; API models are in `shared/checkout.ts`.
- `src/assets/` contains bundled images; `public/` contains root-served assets/favicons. Editing a duplicate in `public/` does not update imported images.
- `src/index.css` and `index.html` define the implemented dark green/black and gold theme, Cormorant Garamond headings and Montserrat body. Older `Khushboo_Design.md` fonts and COD copy are not the current implementation.

## Stripe Rules

- Only `VITE_STRIPE_PUBLISHABLE_KEY` reaches the browser and is baked in at build time. `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` remain server-only. Document env changes in `.env.example`; never commit credentials.
- `POST /api/create-payment-intent` accepts only customer details, known product ID, integer quantity 1-10 and UUID attempt ID. Server recomputes PKR amount, sets shipping/receipt email and minimal order metadata, and enables cards only.
- `APP_URL` must exactly match the browser origin for checkout POSTs. Configure `TRUST_PROXY` only with deployment-controlled proxy addresses/subnets; otherwise proxy users share the process-local rate limit.
- Card data must stay inside Stripe Elements. Never restore raw card inputs, card payload types, customer JSON drawers, mock success timers or payment/customer logging.
- Preserve same-request idempotency and duplicate-submit guards. Session storage holds only payment ID/client secret and a hashed request fingerprint/UUID/timestamp, not shipping/customer fields. Attempt reuse expires at 20 hours, within Stripe's finite idempotency window; it is not permanent deduplication.
- Details and quantity lock after intent creation. Return/reload recovers that intent rather than creating a new one. Unknown or processing status must block a new payment; only Stripe `succeeded` shows a paid receipt.
- Stripe client secrets are capabilities: scrub return query parameters, retain no-referrer headers, and redact payment query strings in deployment access logs. Never expose an unauthenticated order/PII lookup API.
- `/api/webhook` verifies Stripe signatures on raw bytes before JSON parsing, then acknowledges only. It does not persist orders, trigger fulfillment, or send notifications. Duplicate events have no side effects.
- Stripe Dashboard is not a shipping platform: no automated dispatch, inventory, courier tracking, custom email/SMS, or fulfillment state is implemented. Do not claim otherwise.

## Delivery Phases

- Phase 1, custom checkout UI: complete. Keep landing and checkout styling and responsive behavior consistent.
- Phase 2, Stripe integration: implemented, pending real Stripe test-mode payment/3DS and browser verification. No database. Do not call it production-verified from lint/build alone.
- Phase 3: Vitest configuration and scripts exist, but the current checkout contains no `tests/` files. Restore or implement the referenced suites before claiming browser coverage. Chrome DevTools MCP tools were unavailable in the recent session. Local API checks previously exercised validation, origin checks, intent creation and idempotency; browser/payment E2E remains pending.
- Latest Vercel fix: explicit `.js` imports added after production `ERR_MODULE_NOT_FOUND`. Typecheck and server/API JavaScript compilation passed; full Vite build and runtime smoke checks timed out. A deployed retest is required; do not describe the fix as production-verified yet.
- Update this file, README setup and relevant scripts/config together when changing runtime, API, environment variables or phase status.
