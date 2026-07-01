const { test, expect } = require("../../fixtures/apiFixtures.js");
const { deletePet, getPet } = require("../../helpers/petStoreApi.js");

test.describe("TS-010 - API - Pet Store - Delete Pet", () => {
  test(
    "TC-010 - DELETE should remove a pet",
    { tag: "@regression" },
    async ({ request, seededPet }) => {
      const deleteResponse = await deletePet(request, seededPet.id);
      expect(deleteResponse.status()).toBe(200);

      const getResponse = await getPet(request, seededPet.id);
      expect([400, 404]).toContain(getResponse.status());
    },
  );
});
