import type { Driver, Trip, Vehicle } from "@repo/db";
import type { Context } from "hono";
import { NotFoundError, ValidationError } from "../middlewares/error.middleware.js";
import { getValidatedBody, getValidatedParams } from "../middlewares/validate.middleware.js";
import * as driverService from "../services/driver.service.js";
import * as tripService from "../services/trip.service.js";
import * as vehicleService from "../services/vehicle.service.js";
import type { CreateTripInput, TripParams, UpdateTripInput } from "../validators/trip.validator.js";

function sanitizeTrip(trip: Trip) {
  return {
    id: trip.id.toString(),
    vehicle_id: trip.vehicleId,
    driver_id: trip.driverId,
    cargo_weight: trip.cargoWeight,
    start_odometer: trip.startOdometer,
    end_odometer: trip.endOdometer ?? undefined,
    status: trip.status,
    revenue: trip.revenue ?? undefined,
    created_at: trip.createdAt.toISOString(),
    updated_at: trip.updatedAt.toISOString(),
  };
}

function parseDecimalToNumber(value: string | number): number {
  return typeof value === "number" ? value : parseFloat(value);
}

function isLicenseExpired(expiryDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  return expiry < today;
}

async function validateTripPreconditions(
  vehicle: Vehicle,
  driver: Driver,
  cargoWeight: string,
  newStatus?: string
) {
  if (vehicle.status !== "available") {
    throw new ValidationError(`Vehicle is not available. Current status: ${vehicle.status}`);
  }

  if (driver.status === "suspended") {
    throw new ValidationError("Driver is suspended and cannot be assigned to trips");
  }

  if (driver.status === "on_trip") {
    throw new ValidationError("Driver is already on a trip");
  }

  if (isLicenseExpired(driver.licenseExpiry)) {
    throw new ValidationError("Driver license has expired");
  }

  if (newStatus === "dispatched") {
    const weight = parseDecimalToNumber(cargoWeight);
    const maxCapacity = parseDecimalToNumber(vehicle.maxCapacity);
    if (weight > maxCapacity) {
      throw new ValidationError(
        `Cargo weight (${weight}) exceeds vehicle max capacity (${maxCapacity})`
      );
    }
  }
}

async function updateVehicleStatus(vehicleId: number, status: "available" | "on_trip" | "in_shop") {
  await vehicleService.updateVehicle(vehicleId, { status });
}

async function updateDriverStatus(driverId: number, status: "on_duty" | "off_duty" | "on_trip") {
  await driverService.updateDriver(driverId, { status });
}

export async function getAllTrips(c: Context) {
  const trips = await tripService.findAllTrips();
  return c.json(trips.map(sanitizeTrip));
}

export async function getTripById(c: Context) {
  const { id } = getValidatedParams<TripParams>(c);
  const trip = await tripService.findTripById(id);
  if (!trip) {
    throw new NotFoundError("Trip");
  }
  return c.json(sanitizeTrip(trip));
}

export async function createTrip(c: Context) {
  const data = getValidatedBody<CreateTripInput>(c);

  const vehicle = await vehicleService.findVehicleById(data.vehicle_id);
  if (!vehicle) {
    throw new ValidationError("Vehicle does not exist");
  }

  const driver = await driverService.findDriverById(data.driver_id);
  if (!driver) {
    throw new ValidationError("Driver does not exist");
  }

  const newStatus = data.status ?? "draft";
  await validateTripPreconditions(vehicle, driver, data.cargo_weight, newStatus);

  const trip = await tripService.createTrip(data);

  if (newStatus === "dispatched") {
    await updateVehicleStatus(data.vehicle_id, "on_trip");
    await updateDriverStatus(data.driver_id, "on_trip");
  }

  return c.json(sanitizeTrip(trip), 201);
}

export async function updateTrip(c: Context) {
  const { id } = getValidatedParams<TripParams>(c);
  const data = getValidatedBody<UpdateTripInput>(c);

  const existingTrip = await tripService.findTripById(id);
  if (!existingTrip) {
    throw new NotFoundError("Trip");
  }

  if (data.vehicle_id !== undefined) {
    const vehicle = await vehicleService.findVehicleById(data.vehicle_id);
    if (!vehicle) {
      throw new ValidationError("Vehicle does not exist");
    }
  }

  if (data.driver_id !== undefined) {
    const driver = await driverService.findDriverById(data.driver_id);
    if (!driver) {
      throw new ValidationError("Driver does not exist");
    }
  }

  const newStatus = data.status ?? existingTrip.status;
  const vehicleId = data.vehicle_id ?? existingTrip.vehicleId;
  const driverId = data.driver_id ?? existingTrip.driverId;
  const cargoWeight = data.cargo_weight ?? existingTrip.cargoWeight;

  if (newStatus !== existingTrip.status || data.vehicle_id || data.driver_id || data.cargo_weight) {
    const vehicle = await vehicleService.findVehicleById(vehicleId);
    const driver = await driverService.findDriverById(driverId);
    if (vehicle && driver) {
      await validateTripPreconditions(vehicle, driver, String(cargoWeight), newStatus);
    }
  }

  const trip = await tripService.updateTrip(id, data);
  if (!trip) {
    throw new NotFoundError("Trip");
  }

  if (newStatus === "dispatched" && existingTrip.status !== "dispatched") {
    await updateVehicleStatus(vehicleId, "on_trip");
    await updateDriverStatus(driverId, "on_trip");
  } else if (newStatus === "completed" && existingTrip.status !== "completed") {
    await updateVehicleStatus(vehicleId, "available");
    await updateDriverStatus(driverId, "off_duty");

    if (data.end_odometer !== undefined) {
      await vehicleService.updateVehicle(vehicleId, { current_odometer: data.end_odometer });
    }
  } else if (newStatus === "cancelled" && existingTrip.status !== "cancelled") {
    await updateVehicleStatus(vehicleId, "available");
    await updateDriverStatus(driverId, "off_duty");
  }

  return c.json(sanitizeTrip(trip));
}

export async function deleteTrip(c: Context) {
  const { id } = getValidatedParams<TripParams>(c);
  const trip = await tripService.deleteTrip(id);
  if (!trip) {
    throw new NotFoundError("Trip");
  }
  return c.json({ message: "Trip deleted successfully" });
}
