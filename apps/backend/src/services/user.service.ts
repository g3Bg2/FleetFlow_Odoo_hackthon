import { createHash } from "node:crypto";
import { db, users } from "@repo/db";
import { eq } from "drizzle-orm";
import type { CreateUserInput, UpdateUserInput } from "../validators/user.validator.js";

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export async function findAllUsers() {
  return db.select().from(users);
}

export async function findUserById(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user ?? null;
}

export async function findUserByUsername(username: string) {
  const [user] = await db.select().from(users).where(eq(users.username, username));
  return user ?? null;
}

export async function findUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user ?? null;
}

export async function createUser(data: CreateUserInput) {
  const passwordHash = hashPassword(data.password);
  const [user] = await db
    .insert(users)
    .values({
      roleId: data.roleId,
      username: data.username,
      passwordHash,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    })
    .returning();
  return user;
}

export async function updateUser(id: number, data: UpdateUserInput) {
  const updateData: Record<string, unknown> = {};
  if (data.roleId !== undefined) updateData.roleId = data.roleId;
  if (data.username !== undefined) updateData.username = data.username;
  if (data.password !== undefined) updateData.passwordHash = hashPassword(data.password);
  if (data.fullName !== undefined) updateData.fullName = data.fullName;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone;

  const [user] = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
  return user ?? null;
}

export async function deleteUser(id: number) {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return user ?? null;
}
