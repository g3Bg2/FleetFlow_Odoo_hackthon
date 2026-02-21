import type { Context } from "hono";

export function notFoundHandler(c: Context) {
  return c.json({ error: `Route ${c.req.path} not found` }, 404);
}
