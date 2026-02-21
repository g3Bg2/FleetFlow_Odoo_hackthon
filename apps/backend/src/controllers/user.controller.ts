import type { User } from "@repo/db";
import type { Context } from "hono";
import { ConflictError, NotFoundError, ValidationError } from "../middlewares/error.middleware.js";
import { getValidatedBody, getValidatedParams } from "../middlewares/validate.middleware.js";
import * as roleService from "../services/role.service.js";
import * as userService from "../services/user.service.js";
import { convertToCamelCase, convertToSnakeCase } from "../utils/transform.js";
import type { CreateUserInput, UpdateUserInput, UserParams } from "../validators/user.validator.js";

function sanitizeUser(user: User) {
  const { passwordHash, ...userWithoutPassword } = user;
  const camelResult = {
    ...userWithoutPassword,
    id: user.id.toString(),
    roleId: user.roleId ?? undefined,
  };
  return convertToSnakeCase(camelResult);
}

export async function getAllUsers(c: Context) {
  const users = await userService.findAllUsers();
  return c.json(users.map(sanitizeUser));
}

export async function getUserById(c: Context) {
  const { id } = getValidatedParams<UserParams>(c);
  const user = await userService.findUserById(id);
  if (!user) {
    throw new NotFoundError("User");
  }
  return c.json(sanitizeUser(user));
}

export async function createUser(c: Context) {
  const rawData = getValidatedBody<CreateUserInput>(c);
  const data = convertToCamelCase<CreateUserInput>(rawData as unknown as Record<string, unknown>);

  const existingUsername = await userService.findUserByUsername(data.username);
  if (existingUsername) {
    throw new ConflictError("Username already exists");
  }

  const existingEmail = await userService.findUserByEmail(data.email);
  if (existingEmail) {
    throw new ConflictError("Email already exists");
  }

  if (data.roleId !== undefined && data.roleId !== null) {
    const role = await roleService.findRoleById(data.roleId);
    if (!role) {
      throw new ValidationError("Role does not exist");
    }
  }

  const user = await userService.createUser(data);
  return c.json(sanitizeUser(user), 201);
}

export async function updateUser(c: Context) {
  const { id } = getValidatedParams<UserParams>(c);
  const rawData = getValidatedBody<UpdateUserInput>(c);
  const data = convertToCamelCase<UpdateUserInput>(rawData as unknown as Record<string, unknown>);

  const existingUser = await userService.findUserById(id);
  if (!existingUser) {
    throw new NotFoundError("User");
  }

  if (data.username !== undefined && data.username !== existingUser.username) {
    const existingUsername = await userService.findUserByUsername(data.username);
    if (existingUsername) {
      throw new ConflictError("Username already exists");
    }
  }

  if (data.email !== undefined && data.email !== existingUser.email) {
    const existingEmail = await userService.findUserByEmail(data.email);
    if (existingEmail) {
      throw new ConflictError("Email already exists");
    }
  }

  if (data.roleId !== undefined && data.roleId !== null) {
    const role = await roleService.findRoleById(data.roleId);
    if (!role) {
      throw new ValidationError("Role does not exist");
    }
  }

  const user = await userService.updateUser(id, data);
  if (!user) {
    throw new NotFoundError("User");
  }
  return c.json(sanitizeUser(user));
}

export async function deleteUser(c: Context) {
  const { id } = getValidatedParams<UserParams>(c);
  const user = await userService.deleteUser(id);
  if (!user) {
    throw new NotFoundError("User");
  }
  return c.json({ message: "User deleted successfully" });
}
