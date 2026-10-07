// Zero-config helper for the Suno API. No environment variables needed.
//
//  /api/suno/<path>  Pass-through used only if the browser can't call
//                    api.sunoapi.org directly (CORS). It forwards the API key
//                    the user typed in; nothing is stored here.
//  /api/callback     Suno requires a callback URL. The app polls for results,
//                    so this just acknowledges the notification.

const SUNO_BASE = "https://api.sunoapi.org/api/v1";

// Only these Suno endpoints can be reached, so this can't be used as an open proxy.
const ALLOWED = new Set([
  "generate",
  "generate/record-info",
  "generate/extend",
  "generate/credit",
  "lyrics",
  "lyrics/record-info",
]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export default async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/callback") return json({ code: 200, msg: "received" });

  const path = url.pathname.replace(/^\/api\/suno\/?/, "").replace(/\/$/, "");
  if (!ALLOWED.has(path)) return json({ code: 404, msg: "Unknown endpoint" }, 404);
  if (!["GET", "POST"].includes(req.method)) return json({ code: 405, msg: "Method not allowed" }, 405);

  const auth = req.headers.get("authorization");
  if (!auth || !/^Bearer\s+\S+/.test(auth)) return json({ code: 401, msg: "Add your Suno API key first." }, 401);

  let upstream;
  try {
    upstream = await fetch(`${SUNO_BASE}/${path}${url.search}`, {
      method: req.method,
      headers: { Authorization: auth, "Content-Type": "application/json", Accept: "application/json" },
      body: req.method === "POST" ? await req.text() : undefined,
    });
  } catch {
    return json({ code: 502, msg: "Couldn't reach api.sunoapi.org." }, 502);
  }

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};

export const config = { path: ["/api/suno/*", "/api/callback"] };
