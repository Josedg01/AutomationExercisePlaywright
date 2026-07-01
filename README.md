# automation-exercise-playwright

Playwright test suite covering two independent targets:

- **UI** (`tests/ui/*.ui.spec.js`) — end-to-end flows against [automationexercise.com](https://automationexercise.com), run against Chromium, Firefox and WebKit.
- **API** (`tests/api/*.api.spec.js`) — CRUD checks against the public [Petstore Swagger API](https://petstore.swagger.io/v2), run against Playwright's `request` fixture (no browser).

## Project structure

```
fixtures/    Custom Playwright test/expect, extended with project-specific fixtures
  uiFixtures.js   page-object fixtures + shared ad-handling/navigation setup for UI tests
  apiFixtures.js  seededPet fixture for API tests
helpers/     Reusable logic shared across page objects and/or tests
  BaseHelper.js   generic Playwright action wrappers (click, fill, expectVisible, ...)
  adsHelper.js    ad-blocking / ad-closing setup used by UI tests
  petStoreApi.js  Petstore API client used by API tests
pages/       Page Objects (one per page of the site), each extending BaseHelper
tests/ui/    UI specs
tests/api/   API specs
testData/    Static fixtures such as login credentials
```

`BaseHelper` is not itself a page object — it doesn't represent a specific page and has no page-specific selectors. It's a small wrapper around common Playwright actions/assertions that every page object extends, which is why it lives in `helpers/` rather than `pages/`.

Test setup (ad handling, initial navigation for UI; seeding a pet for API) is done through Playwright fixtures in `fixtures/`, not `beforeEach`/`beforeAll` blocks in the spec files. Fixtures run once per test right before the test body, so this setup lives in a single place instead of being duplicated in every spec file, and specs receive already-configured `page`/page-object/`seededPet` fixtures directly as test arguments.

## Test naming convention

Every suite and test case is prefixed with a stable ID so it can be referenced independently of its title text (e.g. in bug reports, test plans, or Testmo):

- `test.describe("TS-00X - ...")` — Test Suite ID
- `test("TC-00X - ...")` — Test Case ID

See [docs/TEST_CASES.md](docs/TEST_CASES.md) for the full test case documentation (title, description, preconditions, steps and expected results for every UI and API test).

## Project Installation

- Download and install [node.js](https://nodejs.org/en).
- Run `npm install` in the project terminal to install all required dependencies.

## Project Execution

- `npm run test` — execute all test cases (UI + API).
- `npm run test:ui` — open Playwright's **UI Test Runner** to debug tests interactively.
- `npm run test:grep -- <pattern>` — execute only the tests whose title matches `<pattern>`.
- `npm run report` — open the standard Playwright HTML report from the last run.
- `npm run allure:report` — generate the Allure HTML report from `allure-results`.
- `npm run allure:open` — open the Allure report generated in `allure-report`.
- `npm run test:allure` — run the full pipeline: run tests → generate the Allure report → open it.
- `npm run allure:clean` — clean the `.allure` cache folder Allure uses to store historical data.
- `npm run ci:allure` — run tests and generate the Allure report without opening it (used in CI).

Every `test*` script (`test`, `test:ui`, `test:grep`) clears `allure-results/` first via an npm `pretest*` hook. Allure never overwrites or dedupes raw result files — it just accumulates them — so without this the generated report would keep showing every past run mixed together instead of only the one you just executed.

## CI/CD

`.github/workflows/playwright.yml` runs the full suite on push/PR to `main`, on a nightly schedule, and on manual dispatch. It publishes the Playwright and Allure HTML reports as workflow artifacts, deploys the Allure report to GitHub Pages on `main`, emails a pass/fail summary, and submits results to Testmo.
