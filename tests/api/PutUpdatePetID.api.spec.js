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

test("PUT should update an existing pet", async ({ request }) => {
  const petId = uniquePetId();
  await request.post("https://petstore.swagger.io/v2/pet", {
    data: createPetPayload(petId),
  });

  const updatedPayload = createPetPayload(petId, `updated-doggie-${petId}`);
  updatedPayload.status = "sold";

  const response = await request.put("https://petstore.swagger.io/v2/pet", {
    data: updatedPayload,
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(petId);
  expect(body.name).toBe(updatedPayload.name);
  expect(body.status).toBe("sold");
});
