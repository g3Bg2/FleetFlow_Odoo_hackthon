import type { MaintenanceLog } from "@repo/db";
import type { Context } from "hono";
import { NotFoundError, ValidationError } from "../middlewares/error.middleware.js";
import { getValidatedBody, getValidatedParams } from "../middlewares/validate.middleware.js";
import * as maintenanceLogService from "../services/maintenance-log.service.js";
import * as vehicleService from "../services/vehicle.service.js";
import type {
  CreateMaintenanceLogInput,
  MaintenanceLogParams,
  UpdateMaintenanceLogInput,
} from "../validators/maintenance-log.validator.js";

function sanitizeMaintenanceLog(maintenanceLog: MaintenanceLog) {
  return {
    id: maintenanceLog.id.toString(),
    vehicle_id: maintenanceLog.vehicleId,
    service_type: maintenanceLog.serviceType,
    cost: maintenanceLog.cost,
    service_date: maintenanceLog.serviceDate.toISOString().split("T")[0],
    created_at: maintenanceLog.createdAt.toISOString(),
    updated_at: maintenanceLog.updatedAt.toISOString(),
  };
}

export async function getAllMaintenanceLogs(c: Context) {
  const maintenanceLogs = await maintenanceLogService.findAllMaintenanceLogs();
  return c.json(maintenanceLogs.map(sanitizeMaintenanceLog));
}

export async function getMaintenanceLogById(c: Context) {
  const { id } = getValidatedParams<MaintenanceLogParams>(c);
  const maintenanceLog = await maintenanceLogService.findMaintenanceLogById(id);
  if (!maintenanceLog) {
    throw new NotFoundError("Maintenance log");
  }
  return c.json(sanitizeMaintenanceLog(maintenanceLog));
}

export async function createMaintenanceLog(c: Context) {
  const data = getValidatedBody<CreateMaintenanceLogInput>(c);

  const vehicle = await vehicleService.findVehicleById(data.vehicle_id);
  if (!vehicle) {
    throw new ValidationError("Vehicle does not exist");
  }

  if (vehicle.status === "on_trip") {
    throw new ValidationError("Cannot add maintenance log while vehicle is on a trip");
  }

  if (vehicle.status === "retired") {
    throw new ValidationError("Cannot add maintenance log for retired vehicle");
  }

  const maintenanceLog = await maintenanceLogService.createMaintenanceLog(data);

  await vehicleService.updateVehicle(data.vehicle_id, { status: "in_shop" });

  return c.json(sanitizeMaintenanceLog(maintenanceLog), 201);
}

export async function updateMaintenanceLog(c: Context) {
  const { id } = getValidatedParams<MaintenanceLogParams>(c);
  const data = getValidatedBody<UpdateMaintenanceLogInput>(c);

  const existingMaintenanceLog = await maintenanceLogService.findMaintenanceLogById(id);
  if (!existingMaintenanceLog) {
    throw new NotFoundError("Maintenance log");
  }

  if (data.vehicle_id !== undefined) {
    const vehicle = await vehicleService.findVehicleById(data.vehicle_id);
    if (!vehicle) {
      throw new ValidationError("Vehicle does not exist");
    }
  }

  const maintenanceLog = await maintenanceLogService.updateMaintenanceLog(id, data);
  if (!maintenanceLog) {
    throw new NotFoundError("Maintenance log");
  }
  return c.json(sanitizeMaintenanceLog(maintenanceLog));
}

export async function deleteMaintenanceLog(c: Context) {
  const { id } = getValidatedParams<MaintenanceLogParams>(c);
  const maintenanceLog = await maintenanceLogService.findMaintenanceLogById(id);
  if (!maintenanceLog) {
    throw new NotFoundError("Maintenance log");
  }

  const vehicle = await vehicleService.findVehicleById(maintenanceLog.vehicleId);
  if (vehicle && vehicle.status === "in_shop") {
    await vehicleService.updateVehicle(maintenanceLog.vehicleId, { status: "available" });
  }

  await maintenanceLogService.deleteMaintenanceLog(id);
  return c.json({ message: "Maintenance log deleted successfully" });
}
