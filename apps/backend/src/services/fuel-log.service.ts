import { db, fuelLogs } from "@repo/db";
import { eq } from "drizzle-orm";
import type { CreateFuelLogInput, UpdateFuelLogInput } from "../validators/fuel-log.validator.js";

export async function findAllFuelLogs() {
  return db.select().from(fuelLogs);
}

export async function findFuelLogById(id: number) {
  const [fuelLog] = await db.select().from(fuelLogs).where(eq(fuelLogs.id, id));
  return fuelLog ?? null;
}

export async function findTripById(id: number) {
  const { trips } = await import("@repo/db");
  const [trip] = await db.select().from(trips).where(eq(trips.id, id));
  return trip ?? null;
}

export async function createFuelLog(data: CreateFuelLogInput) {
  const camelData = {
    vehicleId: data.vehicle_id,
    tripId: data.trip_id ?? null,
    liters: data.liters,
    cost: data.cost,
    logDate: data.log_date,
  };
  const [fuelLog] = await db.insert(fuelLogs).values(camelData).returning();
  return fuelLog;
}

export async function updateFuelLog(id: number, data: UpdateFuelLogInput) {
  const updateData: Record<string, unknown> = {};
  if (data.vehicle_id !== undefined) updateData.vehicleId = data.vehicle_id;
  if (data.trip_id !== undefined) updateData.tripId = data.trip_id;
  if (data.liters !== undefined) updateData.liters = data.liters;
  if (data.cost !== undefined) updateData.cost = data.cost;
  if (data.log_date !== undefined) updateData.logDate = data.log_date;

  const [fuelLog] = await db
    .update(fuelLogs)
    .set(updateData)
    .where(eq(fuelLogs.id, id))
    .returning();
  return fuelLog ?? null;
}

export async function deleteFuelLog(id: number) {
  const [fuelLog] = await db.delete(fuelLogs).where(eq(fuelLogs.id, id)).returning();
  return fuelLog ?? null;
}
