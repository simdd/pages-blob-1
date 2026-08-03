/**
 * Edge Function: edge-app homepage
 * Route: /edge-app
 */
import { getStore } from "pages-blob-test";

export default async function onRequest(context) {
  process.env.PAGES_BLOB_STS_ENV = 'test';
  const store = getStore("functions-test");

  const countStr = await store.get("edge-app/visit-count.txt");
  const count = countStr ? parseInt(countStr, 10) + 1 : 1;
  await store.set("edge-app/visit-count.txt", String(count));

  return new Response(
    JSON.stringify({
      message: "Hello from Edge Functions!",
      visitCount: count,
      timestamp: new Date().toISOString()
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
