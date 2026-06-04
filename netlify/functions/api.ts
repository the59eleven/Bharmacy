import { handle } from "hono/netlify";
import app from "../../api/boot";

const handler = handle(app);

export default async (req: Request, context: unknown) => {
  // Rewrite the URL to match Hono's expected path
  const url = new URL(req.url);
  if (url.pathname.startsWith("/.netlify/functions/api")) {
    url.pathname = url.pathname.replace("/.netlify/functions/api", "/api");
  }
  const modifiedReq = new Request(url, req);
  return handler(modifiedReq, context);
};
