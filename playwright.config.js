// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 50000,
  expect: {
    timeout: 50000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { outputFile: "playwright-report", open: "never" }],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["allure-playwright"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: "chromium",
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "on",
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      testMatch: /.*\.ui\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://automationexercise.com",
      },
    },

    {
      name: "firefox",
      testMatch: /.*\.ui\.spec\.js/,
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "https://automationexercise.com",
      },
    },

    {
      name: "webkit",
      testMatch: /.*\.ui\.spec\.js/,
      use: {
        ...devices["Desktop Safari"],
        baseURL: "https://automationexercise.com",
      },
    },

    {
      name: "api",
      testMatch: /.*\.api\.spec\.js/,
      use: {
        baseURL: "https://petstore.swagger.io/v2",
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
