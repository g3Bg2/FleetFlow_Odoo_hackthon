import { db, vehicles } from "@repo/db";
import { eq } from "drizzle-orm";
import type { CreateVehicleInput, UpdateVehicleInput } from "../validators/vehicle.validator.js";

export async function findAllVehicles() {
  return db.select().from(vehicles);
}

export async function findVehicleById(id: number) {
  const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
  return vehicle ?? null;
}

export async function findVehicleByLicensePlate(licensePlate: string) {
  const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.licensePlate, licensePlate));
  return vehicle ?? null;
}

export async function createVehicle(data: CreateVehicleInput) {
  const camelData = {
    nameModel: data.name_model,
    licensePlate: data.license_plate,
    maxCapacity: data.max_capacity,
    currentOdometer: data.current_odometer,
    status: data.status ?? "available",
    acquisitionCost: data.acquisition_cost,
  };
  const [vehicle] = await db.insert(vehicles).values(camelData).returning();
  return vehicle;
}

export async function updateVehicle(id: number, data: UpdateVehicleInput) {
  const updateData: Record<string, unknown> = {};
  if (data.name_model !== undefined) updateData.nameModel = data.name_model;
  if (data.license_plate !== undefined) updateData.licensePlate = data.license_plate;
  if (data.max_capacity !== undefined) updateData.maxCapacity = data.max_capacity;
  if (data.current_odometer !== undefined) updateData.currentOdometer = data.current_odometer;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.acquisition_cost !== undefined) updateData.acquisitionCost = data.acquisition_cost;

  const [vehicle] = await db
    .update(vehicles)
    .set(updateData)
    .where(eq(vehicles.id, id))
    .returning();
  return vehicle ?? null;
}

export async function deleteVehicle(id: number) {
  const [vehicle] = await db.delete(vehicles).where(eq(vehicles.id, id)).returning();
  return vehicle ?? null;
}
