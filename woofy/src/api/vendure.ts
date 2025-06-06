// lib/vendure.ts
export async function vendureFetch<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch("http://localhost:3000/shop-api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Garde la session du panier
    body: JSON.stringify({ query, variables }),
  });
  const result = await res.json();
  if (result.errors) throw new Error(result.errors[0]?.message ?? "Vendure error");
  return result.data;
}
