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

test("GET should find pets by status", async ({ request }) => {
  const response = await request.get(
    "https://petstore.swagger.io/v2/pet/findByStatus",
    {
      params: { status: "available" },
    },
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});
