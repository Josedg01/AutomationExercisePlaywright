const { test, expect } = require("../../fixtures/apiFixtures.js");
const {
  createPet,
  createPetPayload,
  uniquePetId,
} = require("../../helpers/petStoreApi.js");

test.describe("TS-006 - API - Pet Store - Create Pet", () => {
  test(
    "TC-006 - POST should create a new pet",
    { tag: "@smoke" },
    async ({ request }) => {
      const petId = uniquePetId();
      const payload = createPetPayload(petId);

      const response = await createPet(request, payload);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.id).toBe(petId);
      expect(body.name).toBe(payload.name);
      expect(body.status).toBe("available");
    },
  );
});
