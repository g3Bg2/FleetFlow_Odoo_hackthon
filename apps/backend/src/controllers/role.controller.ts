import type { Role } from "@repo/db";
import type { Context } from "hono";
import { ConflictError, NotFoundError } from "../middlewares/error.middleware.js";
import { getValidatedBody, getValidatedParams } from "../middlewares/validate.middleware.js";
import * as roleService from "../services/role.service.js";
import type { CreateRoleInput, RoleParams, UpdateRoleInput } from "../validators/role.validator.js";

function sanitizeRole(role: Role) {
  return {
    id: role.id.toString(),
    name: role.name,
    description: role.description ?? undefined,
    created_at: role.createdAt.toISOString(),
    updated_at: role.updatedAt.toISOString(),
  };
}

export async function getAllRoles(c: Context) {
  const roles = await roleService.findAllRoles();
  return c.json(roles.map(sanitizeRole));
}

export async function getRoleById(c: Context) {
  const { id } = getValidatedParams<RoleParams>(c);
  const role = await roleService.findRoleById(id);
  if (!role) {
    throw new NotFoundError("Role");
  }
  return c.json(sanitizeRole(role));
}

export async function createRole(c: Context) {
  const data = getValidatedBody<CreateRoleInput>(c);

  const existingName = await roleService.findRoleByName(data.name);
  if (existingName) {
    throw new ConflictError("Role name already exists");
  }

  const role = await roleService.createRole(data);
  return c.json(sanitizeRole(role), 201);
}

export async function updateRole(c: Context) {
  const { id } = getValidatedParams<RoleParams>(c);
  const data = getValidatedBody<UpdateRoleInput>(c);

  const existingRole = await roleService.findRoleById(id);
  if (!existingRole) {
    throw new NotFoundError("Role");
  }

  if (data.name !== undefined && data.name !== existingRole.name) {
    const existingName = await roleService.findRoleByName(data.name);
    if (existingName) {
      throw new ConflictError("Role name already exists");
    }
  }

  const role = await roleService.updateRole(id, data);
  if (!role) {
    throw new NotFoundError("Role");
  }
  return c.json(sanitizeRole(role));
}

export async function deleteRole(c: Context) {
  const { id } = getValidatedParams<RoleParams>(c);
  const role = await roleService.deleteRole(id);
  if (!role) {
    throw new NotFoundError("Role");
  }
  return c.json({ message: "Role deleted successfully" });
}
