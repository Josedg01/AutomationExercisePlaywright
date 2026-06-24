const { test, expect } = require("@playwright/test");

const uniquePetId = () => Math.floor(Date.now() + Math.random() * 1000);
const createPetPayload = (id, name = `Doggie`) => ({
  id,
  category: {
    id: 1,
    name: "Dogs",
  },
  name,
  photoUrls: ["https://example.com/dog.png"],
  tags: [
    {
      id: 1,
      name: "automation",
    },
  ],
  status: "available",
});

test("DELETE should remove a pet", async ({ request }) => {
  const petId = uniquePetId();
  const payload = createPetPayload(petId);
  const response = await request.post("https://petstore.swagger.io/v2/pet", {
    data: payload,
  });

  const deleteResponse = await request.delete(
    `https://petstore.swagger.io/v2/pet/${petId}`,
  );
  expect(deleteResponse.status()).toBe(200);

  const getResponse = await request.get(
    `https://petstore.swagger.io/v2/pet/pet/${petId}`,
  );

  expect([400, 404]).toContain(getResponse.status());
});
