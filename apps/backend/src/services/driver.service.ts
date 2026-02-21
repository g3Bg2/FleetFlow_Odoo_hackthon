import { db, drivers } from "@repo/db";
import { eq } from "drizzle-orm";
import type { CreateDriverInput, UpdateDriverInput } from "../validators/driver.validator.js";

export async function findAllDrivers() {
  return db.select().from(drivers);
}

export async function findDriverById(id: number) {
  const [driver] = await db.select().from(drivers).where(eq(drivers.id, id));
  return driver ?? null;
}

export async function createDriver(data: CreateDriverInput) {
  const camelData = {
    fullName: data.full_name,
    licenseCategory: data.license_category,
    licenseExpiry: data.license_expiry,
    safetyScore: data.safety_score,
    status: data.status ?? "off_duty",
  };
  const [driver] = await db.insert(drivers).values(camelData).returning();
  return driver;
}

export async function updateDriver(id: number, data: UpdateDriverInput) {
  const updateData: Record<string, unknown> = {};
  if (data.full_name !== undefined) updateData.fullName = data.full_name;
  if (data.license_category !== undefined) updateData.licenseCategory = data.license_category;
  if (data.license_expiry !== undefined) updateData.licenseExpiry = data.license_expiry;
  if (data.safety_score !== undefined) updateData.safetyScore = data.safety_score;
  if (data.status !== undefined) updateData.status = data.status;

  const [driver] = await db.update(drivers).set(updateData).where(eq(drivers.id, id)).returning();
  return driver ?? null;
}

export async function deleteDriver(id: number) {
  const [driver] = await db.delete(drivers).where(eq(drivers.id, id)).returning();
  return driver ?? null;
}
