import type { Driver } from "@repo/db";
import type { Context } from "hono";
import { NotFoundError } from "../middlewares/error.middleware.js";
import { getValidatedBody, getValidatedParams } from "../middlewares/validate.middleware.js";
import * as driverService from "../services/driver.service.js";
import type {
  CreateDriverInput,
  DriverParams,
  UpdateDriverInput,
} from "../validators/driver.validator.js";

function sanitizeDriver(driver: Driver) {
  return {
    id: driver.id.toString(),
    full_name: driver.fullName,
    license_category: driver.licenseCategory,
    license_expiry: driver.licenseExpiry.toISOString().split("T")[0],
    safety_score: driver.safetyScore,
    status: driver.status,
    created_at: driver.createdAt.toISOString(),
    updated_at: driver.updatedAt.toISOString(),
  };
}

export async function getAllDrivers(c: Context) {
  const drivers = await driverService.findAllDrivers();
  return c.json(drivers.map(sanitizeDriver));
}

export async function getDriverById(c: Context) {
  const { id } = getValidatedParams<DriverParams>(c);
  const driver = await driverService.findDriverById(id);
  if (!driver) {
    throw new NotFoundError("Driver");
  }
  return c.json(sanitizeDriver(driver));
}

export async function createDriver(c: Context) {
  const data = getValidatedBody<CreateDriverInput>(c);
  const driver = await driverService.createDriver(data);
  return c.json(sanitizeDriver(driver), 201);
}

export async function updateDriver(c: Context) {
  const { id } = getValidatedParams<DriverParams>(c);
  const data = getValidatedBody<UpdateDriverInput>(c);

  const existingDriver = await driverService.findDriverById(id);
  if (!existingDriver) {
    throw new NotFoundError("Driver");
  }

  const driver = await driverService.updateDriver(id, data);
  if (!driver) {
    throw new NotFoundError("Driver");
  }
  return c.json(sanitizeDriver(driver));
}

export async function deleteDriver(c: Context) {
  const { id } = getValidatedParams<DriverParams>(c);
  const driver = await driverService.deleteDriver(id);
  if (!driver) {
    throw new NotFoundError("Driver");
  }
  return c.json({ message: "Driver deleted successfully" });
}
