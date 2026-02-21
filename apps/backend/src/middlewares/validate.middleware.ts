import type { Context, MiddlewareHandler } from "hono";
import type { z } from "zod";
import { ZodError } from "zod";

type ValidationTargets = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

export type ValidatedData = {
  validatedBody?: unknown;
  validatedParams?: unknown;
  validatedQuery?: unknown;
};

export function validate(schemas: ValidationTargets): MiddlewareHandler {
  return async (c, next) => {
    try {
      if (schemas.body) {
        const body = await c.req.json();
        const parsed = schemas.body.safeParse(body);
        if (!parsed.success) {
          throw parsed.error;
        }
        c.set("validatedBody", parsed.data);
      }

      if (schemas.params) {
        const params = c.req.param();
        const parsed = schemas.params.safeParse(params);
        if (!parsed.success) {
          throw parsed.error;
        }
        c.set("validatedParams", parsed.data);
      }

      if (schemas.query) {
        const query = c.req.query();
        const parsed = schemas.query.safeParse(query);
        if (!parsed.success) {
          throw parsed.error;
        }
        c.set("validatedQuery", parsed.data);
      }

      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  };
}

export function getValidatedBody<T>(c: Context): T {
  return c.get("validatedBody") as T;
}

export function getValidatedParams<T>(c: Context): T {
  return c.get("validatedParams") as T;
}

export function getValidatedQuery<T>(c: Context): T {
  return c.get("validatedQuery") as T;
}
