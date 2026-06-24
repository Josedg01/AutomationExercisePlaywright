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

test("GET should return a pet by id", async ({ request }) => {
  const petId = uniquePetId();
  const payload = createPetPayload(petId);

  await request.post("https://petstore.swagger.io/v2/pet", { data: payload });
  const response = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`,
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(petId);
  expect(body.name).toBe(payload.name);
});
