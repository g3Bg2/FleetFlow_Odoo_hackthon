import type { Vehicle } from "@repo/db";
import type { Context } from "hono";
import { ConflictError, NotFoundError } from "../middlewares/error.middleware.js";
import { getValidatedBody, getValidatedParams } from "../middlewares/validate.middleware.js";
import * as vehicleService from "../services/vehicle.service.js";
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  VehicleParams,
} from "../validators/vehicle.validator.js";

function sanitizeVehicle(vehicle: Vehicle) {
  return {
    id: vehicle.id.toString(),
    name_model: vehicle.nameModel,
    license_plate: vehicle.licensePlate,
    max_capacity: vehicle.maxCapacity,
    current_odometer: vehicle.currentOdometer,
    status: vehicle.status,
    acquisition_cost: vehicle.acquisitionCost,
    created_at: vehicle.createdAt.toISOString(),
    updated_at: vehicle.updatedAt.toISOString(),
  };
}

export async function getAllVehicles(c: Context) {
  const vehicles = await vehicleService.findAllVehicles();
  return c.json(vehicles.map(sanitizeVehicle));
}

export async function getVehicleById(c: Context) {
  const { id } = getValidatedParams<VehicleParams>(c);
  const vehicle = await vehicleService.findVehicleById(id);
  if (!vehicle) {
    throw new NotFoundError("Vehicle");
  }
  return c.json(sanitizeVehicle(vehicle));
}

export async function createVehicle(c: Context) {
  const data = getValidatedBody<CreateVehicleInput>(c);

  const existingPlate = await vehicleService.findVehicleByLicensePlate(data.license_plate);
  if (existingPlate) {
    throw new ConflictError("License plate already exists");
  }

  const vehicle = await vehicleService.createVehicle(data);
  return c.json(sanitizeVehicle(vehicle), 201);
}

export async function updateVehicle(c: Context) {
  const { id } = getValidatedParams<VehicleParams>(c);
  const data = getValidatedBody<UpdateVehicleInput>(c);

  const existingVehicle = await vehicleService.findVehicleById(id);
  if (!existingVehicle) {
    throw new NotFoundError("Vehicle");
  }

  if (data.license_plate !== undefined && data.license_plate !== existingVehicle.licensePlate) {
    const existingPlate = await vehicleService.findVehicleByLicensePlate(data.license_plate);
    if (existingPlate) {
      throw new ConflictError("License plate already exists");
    }
  }

  const vehicle = await vehicleService.updateVehicle(id, data);
  if (!vehicle) {
    throw new NotFoundError("Vehicle");
  }
  return c.json(sanitizeVehicle(vehicle));
}

export async function deleteVehicle(c: Context) {
  const { id } = getValidatedParams<VehicleParams>(c);
  const vehicle = await vehicleService.deleteVehicle(id);
  if (!vehicle) {
    throw new NotFoundError("Vehicle");
  }
  return c.json({ message: "Vehicle deleted successfully" });
}
