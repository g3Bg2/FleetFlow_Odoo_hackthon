import { db, roles } from "@repo/db";
import { eq } from "drizzle-orm";
import type { CreateRoleInput, UpdateRoleInput } from "../validators/role.validator.js";

export async function findAllRoles() {
  return db.select().from(roles);
}

export async function findRoleById(id: number) {
  const [role] = await db.select().from(roles).where(eq(roles.id, id));
  return role ?? null;
}

export async function findRoleByName(name: string) {
  const [role] = await db.select().from(roles).where(eq(roles.name, name));
  return role ?? null;
}

export async function createRole(data: CreateRoleInput) {
  const [role] = await db.insert(roles).values(data).returning();
  return role;
}

export async function updateRole(id: number, data: UpdateRoleInput) {
  const [role] = await db.update(roles).set(data).where(eq(roles.id, id)).returning();
  return role ?? null;
}

export async function deleteRole(id: number) {
  const [role] = await db.delete(roles).where(eq(roles.id, id)).returning();
  return role ?? null;
}
