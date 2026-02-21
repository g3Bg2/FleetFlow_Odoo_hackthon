import type { Context } from "hono";
import { UnauthorizedError } from "../middlewares/error.middleware.js";
import * as authService from "../services/auth.service.js";

export interface AuthPayload {
  sub: string;
  username: string;
  roleId: number | null;
}

export async function authMiddleware(c: Context, next: () => Promise<Response>) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Missing or invalid authorization header");
  }

  const token = authHeader.substring(7);
  const payload = await authService.verifyToken(token);

  if (!payload) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  c.set("user", {
    id: parseInt(payload.sub as string, 10),
    username: payload.username as string,
    roleId: payload.roleId as number | null,
  } as AuthPayload);

  await next();
}
