import type { Context } from "hono";
import { ConflictError, ValidationError } from "../middlewares/error.middleware.js";
import { getValidatedBody } from "../middlewares/validate.middleware.js";
import * as authService from "../services/auth.service.js";
import * as roleService from "../services/role.service.js";
import * as userService from "../services/user.service.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";
import { passwordSchema } from "../validators/user.validator.js";

export async function login(c: Context) {
  const data = getValidatedBody<LoginInput>(c);

  const result = await authService.login(data.username, data.password);
  if (!result) {
    throw new ValidationError("Invalid username or password");
  }

  return c.json(result);
}

export async function register(c: Context) {
  const rawData = getValidatedBody<RegisterInput>(c);

  const validatedPassword = passwordSchema.safeParse(rawData.password);
  if (!validatedPassword.success) {
    throw new ValidationError(validatedPassword.error.errors[0]?.message || "Invalid password");
  }

  const existingUsername = await userService.findUserByUsername(rawData.username);
  if (existingUsername) {
    throw new ConflictError("Username already exists");
  }

  const existingEmail = await userService.findUserByEmail(rawData.email);
  if (existingEmail) {
    throw new ConflictError("Email already exists");
  }

  if (rawData.role_id !== undefined && rawData.role_id !== null) {
    const role = await roleService.findRoleById(rawData.role_id);
    if (!role) {
      throw new ValidationError("Role does not exist");
    }
  }

  const result = await authService.register(rawData);
  return c.json(result, 201);
}
