import type { Trip } from "@repo/db";
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

  const trip = await tripService.createTrip(data);
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

  const trip = await tripService.updateTrip(id, data);
  if (!trip) {
    throw new NotFoundError("Trip");
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
