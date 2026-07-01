const base = require("@playwright/test");

const { uniquePetId, createPetPayload, createPet } = require("../helpers/petStoreApi.js");

// Most pet-store specs need a pet to already exist before the test's own
// action (get/update/delete) runs. Seeding it here, before the test body,
// keeps that setup out of every spec instead of repeating request.post calls.
const test = base.test.extend({
  seededPet: async ({ request }, use) => {
    const id = uniquePetId();
    const payload = createPetPayload(id);
    await createPet(request, payload);
    await use({ id, payload });
  },
});

module.exports = { test, expect: base.expect };
