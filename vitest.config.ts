import path from 'path';
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname)
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts'
  },
  projects: [
    {
      test: {
        name: 'unit',
        include: ['**/*.test.ts', '**/*.test.tsx']
      }
    },
    {
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        include: ['**/*.stories.ts', '**/*.stories.tsx'],
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: 'chromium' }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }
  ]
})