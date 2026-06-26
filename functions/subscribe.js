export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON." }, 400);
  }

  const { email, source = "unknown" } = body;

  if (!email || typeof email !== "string") {
    return json({ ok: false, error: "Email is required." }, 400);
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email.trim())) {
    return json({ ok: false, error: "Invalid email address." }, 400);
  }

  const siteId = env.SITE_ID || "think-riffs";
  const key = `sub::${siteId}::${email.trim().toLowerCase()}`;

  const existing = await env.SUBSCRIBERS.get(key);
  if (existing) {
    return json({ ok: true });
  }

  const record = {
    email: email.trim().toLowerCase(),
    site_id: siteId,
    source,
    status: "active",
    created_at: new Date().toISOString(),
  };

  await env.SUBSCRIBERS.put(key, JSON.stringify(record));

  return json({ ok: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
