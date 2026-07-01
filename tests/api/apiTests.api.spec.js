const { test, expect } = require("../../fixtures/apiFixtures.js");
const {
  createPet,
  createPetPayload,
  uniquePetId,
  getPet,
  updatePet,
  deletePet,
  findPetsByStatus,
} = require("../../helpers/petStoreApi.js");

test.describe("TS-002 - API Test Suite", () => {
  test(
    "TC-006 - POST should create a new pet",
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

  test(
    "TC-007 - GET should return a pet by id",
    async ({ request, seededPet }) => {
      const response = await getPet(request, seededPet.id);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.id).toBe(seededPet.id);
      expect(body.name).toBe(seededPet.payload.name);
    },
  );

  test(
    "TC-008 - GET should find pets by status",
    async ({ request, seededPet }) => {
      const response = await findPetsByStatus(request, "available");

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.some((pet) => pet.id === seededPet.id)).toBeTruthy();
    },
  );

  test(
    "TC-009 - PUT should update an existing pet",
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

  test(
    "TC-010 - DELETE should remove a pet",
    async ({ request, seededPet }) => {
      const deleteResponse = await deletePet(request, seededPet.id);
      expect(deleteResponse.status()).toBe(200);

      const getResponse = await getPet(request, seededPet.id);
      expect([400, 404]).toContain(getResponse.status());
    },
  );
});
