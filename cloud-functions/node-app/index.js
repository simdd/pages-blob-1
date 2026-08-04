/**
 * Node Function: node-app homepage
 * Route: /node-app
 */
import { getStore } from "pages-blob-test";

export default async function onRequest(context) {
  const store = getStore("functions-test");

  const info = {
    uuid: context.uuid,
    clientIp: context.clientIp,
    geo: context.geo,
    region: context.region,
    timestamp: new Date().toISOString(),
  };

  await store.setJSON("node-app/last-visit.json", info);

  const res = await fetch("https://static.cloudcachetci.com/qcloud/main/scripts/release/common/vendors/jquery-3.2.1.min.js");

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "application/javascript",
      "x-cube-outer-flux-restricted": context.request.headers.get("x-cube-outer-flux-restricted") || "",
    },
  });
}
