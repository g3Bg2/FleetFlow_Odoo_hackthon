import { db, maintenanceLogs } from "@repo/db";
import { eq } from "drizzle-orm";
import type {
  CreateMaintenanceLogInput,
  UpdateMaintenanceLogInput,
} from "../validators/maintenance-log.validator.js";

export async function findAllMaintenanceLogs() {
  return db.select().from(maintenanceLogs);
}

export async function findMaintenanceLogById(id: number) {
  const [maintenanceLog] = await db
    .select()
    .from(maintenanceLogs)
    .where(eq(maintenanceLogs.id, id));
  return maintenanceLog ?? null;
}

export async function createMaintenanceLog(data: CreateMaintenanceLogInput) {
  const camelData = {
    vehicleId: data.vehicle_id,
    serviceType: data.service_type,
    cost: data.cost,
    serviceDate: data.service_date,
  };
  const [maintenanceLog] = await db.insert(maintenanceLogs).values(camelData).returning();
  return maintenanceLog;
}

export async function updateMaintenanceLog(id: number, data: UpdateMaintenanceLogInput) {
  const updateData: Record<string, unknown> = {};
  if (data.vehicle_id !== undefined) updateData.vehicleId = data.vehicle_id;
  if (data.service_type !== undefined) updateData.serviceType = data.service_type;
  if (data.cost !== undefined) updateData.cost = data.cost;
  if (data.service_date !== undefined) updateData.serviceDate = data.service_date;

  const [maintenanceLog] = await db
    .update(maintenanceLogs)
    .set(updateData)
    .where(eq(maintenanceLogs.id, id))
    .returning();
  return maintenanceLog ?? null;
}

export async function deleteMaintenanceLog(id: number) {
  const [maintenanceLog] = await db
    .delete(maintenanceLogs)
    .where(eq(maintenanceLogs.id, id))
    .returning();
  return maintenanceLog ?? null;
}
