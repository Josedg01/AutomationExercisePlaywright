const { test, expect } = require("../../fixtures/apiFixtures.js");
const { getPet } = require("../../helpers/petStoreApi.js");

test.describe("TS-007 - API - Pet Store - Retrieve Pet", () => {
  test(
    "TC-007 - GET should return a pet by id",
    { tag: "@regression" },
    async ({ request, seededPet }) => {
      const response = await getPet(request, seededPet.id);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.id).toBe(seededPet.id);
      expect(body.name).toBe(seededPet.payload.name);
    },
  );
});
