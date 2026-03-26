import { defineConfig, devices } from '@playwright/test';
import { ENV } from './envLoader';
import * as dotenv from 'dotenv';
import { Locale } from './testData/locale';

dotenv.config({ path: `.env.${ENV}` });

// Fetch LOCALE environment variable
const envLocale = process.env.LOCALE;

// Map the environment variable to the Locale enum
const selectedLocale = envLocale && Locale[envLocale as keyof typeof Locale]
  ? Locale[envLocale as keyof typeof Locale]
  : Locale.EN; // Fallback to 'en-US' if LOCALE is undefined or invalid

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Default timeout value */
  timeout: 30 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    //viewport: { width: 1920, height: 1080 },
    extraHTTPHeaders: {
      'X-Env': ENV,
    },
    locale: selectedLocale,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', 
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
      testMatch: /.*\.setup\.ts/ 
    },
    {
      name: 'chromium-auth',
      testMatch: 'tests/auth/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1680, height: 900 },
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'chromium-no-auth',
      testMatch: 'tests/no-auth/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1680, height: 900 },
      }
    },

    // {
    //   name: 'firefox',
    //   testMatch: 'tests/no-auth/**/*.spec.ts',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     viewport: { width: 1920, height: 1080 }
    //   },
    // },

    // {
    //   name: 'webkit',
    //   testMatch: 'tests/no-auth/**/*.spec.ts',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1280, height: 800 }
    //   },
    //   grep: /@smoke/
    // },
  ],
  //repeatEach: 5,
});
