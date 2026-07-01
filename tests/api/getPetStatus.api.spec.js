const { test, expect } = require("../../fixtures/apiFixtures.js");
const { findPetsByStatus } = require("../../helpers/petStoreApi.js");

test.describe("TS-008 - API - Pet Store - Retrieve Pets by Status", () => {
  test(
    "TC-008 - GET should find pets by status",
    { tag: "@regression" },
    async ({ request, seededPet }) => {
      const response = await findPetsByStatus(request, "available");

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.some((pet) => pet.id === seededPet.id)).toBeTruthy();
    },
  );
});
