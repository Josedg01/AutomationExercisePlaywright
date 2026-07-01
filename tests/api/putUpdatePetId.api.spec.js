const { test, expect } = require("../../fixtures/apiFixtures.js");
const { updatePet, createPetPayload } = require("../../helpers/petStoreApi.js");

test.describe("TS-009 - API - Pet Store - Update Pet", () => {
  test(
    "TC-009 - PUT should update an existing pet",
    { tag: "@regression" },
    async ({ request, seededPet }) => {
      const updatedPayload = createPetPayload(
        seededPet.id,
        `updated-doggie-${seededPet.id}`,
        "sold",
      );

      const response = await updatePet(request, updatedPayload);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.id).toBe(seededPet.id);
      expect(body.name).toBe(updatedPayload.name);
      expect(body.status).toBe("sold");
    },
  );
});
