export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token || token !== env.ADMIN_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const siteId = env.SITE_ID || "think-riffs";
  const prefix = `sub::${siteId}::`;

  const list = await env.SUBSCRIBERS.list({ prefix });
  const subscribers = [];

  for (const key of list.keys) {
    const val = await env.SUBSCRIBERS.get(key.name);
    if (val) subscribers.push(JSON.parse(val));
  }

  subscribers.sort((a, b) => b.created_at.localeCompare(a.created_at));

  return new Response(JSON.stringify({ count: subscribers.length, subscribers }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
