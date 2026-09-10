import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import type { BrowserContext, Route } from 'playwright';

const networkGuards = new WeakMap<BrowserContext, { handler: (route: Route) => Promise<void>; blocked: string[] }>();

// Deliberately independent of vite.config.ts and all local credential files.
export default defineConfig({
  envDir: false,
  envPrefix: [],
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify('pk_test_browser_placeholder'),
  },
  test: {
    include: ['tests/browser/**/*.test.tsx'],
    setupFiles: ['tests/browser/setup.ts'],
    testTimeout: 30000,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({
        contextOptions: { locale: 'en-US' },
      }),
      instances: [
        { browser: 'chromium', name: 'desktop', viewport: { width: 1440, height: 900 } },
        { browser: 'chromium', name: 'mobile', viewport: { width: 390, height: 844 } },
      ],
      commands: {
        async guardNetwork({ context }) {
          const blocked: string[] = [];
          const handler = async (route: Route) => {
            const request = route.request();
            const url = new URL(request.url());
            const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
            if (request.method() === 'POST' || url.pathname.startsWith('/api/') || !local) {
              // Record no query strings, headers, bodies, or credential values.
              blocked.push(`${request.method()} ${local ? '/api or POST' : 'external request'}`);
              await route.abort();
            } else {
              await route.continue();
            }
          };
          networkGuards.set(context, { handler, blocked });
          await context.route('**/*', handler);
        },
        async releaseNetwork({ context }) {
          const guard = networkGuards.get(context)!;
          await context.unroute('**/*', guard.handler);
          networkGuards.delete(context);
          return guard.blocked;
        },
      },
    },
  },
});
