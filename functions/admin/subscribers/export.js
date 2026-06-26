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
  const rows = [["email", "source", "status", "created_at"]];

  for (const key of list.keys) {
    const val = await env.SUBSCRIBERS.get(key.name);
    if (val) {
      const { email, source, status, created_at } = JSON.parse(val);
      rows.push([email, source, status, created_at]);
    }
  }

  const csv = rows.map(r => r.map(f => `"${(f || "").replace(/"/g, '""')}"`).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="subscribers-${siteId}.csv"`,
    },
  });
}
