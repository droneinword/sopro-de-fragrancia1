import { getStore } from "@netlify/blobs";

// GET  /api/visits -> retorna o total
// POST /api/visits -> soma 1 e retorna o total
export default async (req) => {
  const headers = { "Cache-Control": "no-store" };
  try {
    const store = getStore("visitas");
    let total = Number(await store.get("total")) || 0;
    if (req.method === "POST") {
      total += 1;
      await store.set("total", String(total));
    }
    return Response.json({ total }, { headers });
  } catch (e) {
    return Response.json({ error: "indisponivel" }, { status: 503, headers });
  }
};

export const config = { path: "/api/visits" };
