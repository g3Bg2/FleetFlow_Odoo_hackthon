import type { Hono } from "hono";
import type { ValidatedData } from "../middlewares/validate.middleware.js";

export type AppVariables = ValidatedData;

export type AppHono = Hono<{ Variables: AppVariables }>;
