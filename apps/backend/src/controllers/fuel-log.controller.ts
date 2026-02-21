import type { FuelLog } from "@repo/db";
import type { Context } from "hono";
import { NotFoundError, ValidationError } from "../middlewares/error.middleware.js";
import { getValidatedBody, getValidatedParams } from "../middlewares/validate.middleware.js";
import * as fuelLogService from "../services/fuel-log.service.js";
import * as tripService from "../services/trip.service.js";
import * as vehicleService from "../services/vehicle.service.js";
import type {
  CreateFuelLogInput,
  FuelLogParams,
  UpdateFuelLogInput,
} from "../validators/fuel-log.validator.js";

function sanitizeFuelLog(fuelLog: FuelLog) {
  return {
    id: fuelLog.id.toString(),
    vehicle_id: fuelLog.vehicleId,
    trip_id: fuelLog.tripId ?? undefined,
    liters: fuelLog.liters,
    cost: fuelLog.cost,
    log_date: fuelLog.logDate.toISOString().split("T")[0],
    created_at: fuelLog.createdAt.toISOString(),
    updated_at: fuelLog.updatedAt.toISOString(),
  };
}

export async function getAllFuelLogs(c: Context) {
  const fuelLogs = await fuelLogService.findAllFuelLogs();
  return c.json(fuelLogs.map(sanitizeFuelLog));
}

export async function getFuelLogById(c: Context) {
  const { id } = getValidatedParams<FuelLogParams>(c);
  const fuelLog = await fuelLogService.findFuelLogById(id);
  if (!fuelLog) {
    throw new NotFoundError("Fuel log");
  }
  return c.json(sanitizeFuelLog(fuelLog));
}

export async function createFuelLog(c: Context) {
  const data = getValidatedBody<CreateFuelLogInput>(c);

  const vehicle = await vehicleService.findVehicleById(data.vehicle_id);
  if (!vehicle) {
    throw new ValidationError("Vehicle does not exist");
  }

  if (data.trip_id !== undefined) {
    const trip = await tripService.findTripById(data.trip_id);
    if (!trip) {
      throw new ValidationError("Trip does not exist");
    }
  }

  const fuelLog = await fuelLogService.createFuelLog(data);
  return c.json(sanitizeFuelLog(fuelLog), 201);
}

export async function updateFuelLog(c: Context) {
  const { id } = getValidatedParams<FuelLogParams>(c);
  const data = getValidatedBody<UpdateFuelLogInput>(c);

  const existingFuelLog = await fuelLogService.findFuelLogById(id);
  if (!existingFuelLog) {
    throw new NotFoundError("Fuel log");
  }

  if (data.vehicle_id !== undefined) {
    const vehicle = await vehicleService.findVehicleById(data.vehicle_id);
    if (!vehicle) {
      throw new ValidationError("Vehicle does not exist");
    }
  }

  if (data.trip_id !== undefined) {
    const trip = await tripService.findTripById(data.trip_id);
    if (!trip) {
      throw new ValidationError("Trip does not exist");
    }
  }

  const fuelLog = await fuelLogService.updateFuelLog(id, data);
  if (!fuelLog) {
    throw new NotFoundError("Fuel log");
  }
  return c.json(sanitizeFuelLog(fuelLog));
}

export async function deleteFuelLog(c: Context) {
  const { id } = getValidatedParams<FuelLogParams>(c);
  const fuelLog = await fuelLogService.deleteFuelLog(id);
  if (!fuelLog) {
    throw new NotFoundError("Fuel log");
  }
  return c.json({ message: "Fuel log deleted successfully" });
}
