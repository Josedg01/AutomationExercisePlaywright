// Petstore API calls, shared across tests/api/*.spec.js so every spec talks
// to the API the same way instead of redefining these requests per file.
// Paths are relative and rely on the `baseURL` set for the "api" project in
// playwright.config.js.

const uniquePetId = () => Math.floor(Date.now() + Math.random() * 1000);

const createPetPayload = (id, name = "Doggie", status = "available") => ({
  id,
  category: { id: 1, name: "Dogs" },
  name,
  photoUrls: ["https://example.com/dog.png"],
  tags: [{ id: 1, name: "automation" }],
  status,
});

// Note: no leading slash on these paths. A leading slash resolves against
// the baseURL's origin and drops its "/v2" path segment.
async function createPet(request, payload) {
  return request.post("pet", { data: payload });
}

async function getPet(request, id) {
  return request.get(`pet/${id}`);
}

async function updatePet(request, payload) {
  return request.put("pet", { data: payload });
}

async function deletePet(request, id) {
  return request.delete(`pet/${id}`);
}

async function findPetsByStatus(request, status) {
  return request.get("pet/findByStatus", { params: { status } });
}

module.exports = {
  uniquePetId,
  createPetPayload,
  createPet,
  getPet,
  updatePet,
  deletePet,
  findPetsByStatus,
};
