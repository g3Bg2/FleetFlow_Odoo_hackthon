import { db, trips } from "@repo/db";
import { eq } from "drizzle-orm";
import type { CreateTripInput, UpdateTripInput } from "../validators/trip.validator.js";

export async function findAllTrips() {
  return db.select().from(trips);
}

export async function findTripById(id: number) {
  const [trip] = await db.select().from(trips).where(eq(trips.id, id));
  return trip ?? null;
}

export async function createTrip(data: CreateTripInput) {
  const camelData = {
    vehicleId: data.vehicle_id,
    driverId: data.driver_id,
    cargoWeight: data.cargo_weight,
    startOdometer: data.start_odometer,
    endOdometer: data.end_odometer ?? null,
    status: data.status ?? "draft",
    revenue: data.revenue ?? null,
  };
  const [trip] = await db.insert(trips).values(camelData).returning();
  return trip;
}

export async function updateTrip(id: number, data: UpdateTripInput) {
  const updateData: Record<string, unknown> = {};
  if (data.vehicle_id !== undefined) updateData.vehicleId = data.vehicle_id;
  if (data.driver_id !== undefined) updateData.driverId = data.driver_id;
  if (data.cargo_weight !== undefined) updateData.cargoWeight = data.cargo_weight;
  if (data.start_odometer !== undefined) updateData.startOdometer = data.start_odometer;
  if (data.end_odometer !== undefined) updateData.endOdometer = data.end_odometer;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.revenue !== undefined) updateData.revenue = data.revenue;

  const [trip] = await db.update(trips).set(updateData).where(eq(trips.id, id)).returning();
  return trip ?? null;
}

export async function deleteTrip(id: number) {
  const [trip] = await db.delete(trips).where(eq(trips.id, id)).returning();
  return trip ?? null;
}
