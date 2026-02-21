import { db, fuelLogs, maintenanceLogs, trips, vehicles } from "@repo/db";
import { eq } from "drizzle-orm";

export interface VehicleAnalytics {
  vehicleId: number;
  totalTrips: number;
  completedTrips: number;
  totalRevenue: number;
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalOperationalCost: number;
  totalDistance: number;
  totalFuelLiters: number;
  fuelEfficiency: number;
  roi: number;
}

export interface FleetAnalytics {
  totalRevenue: number;
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalOperationalCost: number;
  averageFuelEfficiency: number;
  vehicleAnalytics: VehicleAnalytics[];
}

function parseDecimal(value: string | number | null): number {
  if (value === null || value === undefined) return 0;
  return typeof value === "number" ? value : parseFloat(value);
}

export async function getVehicleAnalytics(vehicleId: number): Promise<VehicleAnalytics | null> {
  const vehicle = await db.select().from(vehicles).where(eq(vehicles.id, vehicleId));
  if (!vehicle.length) return null;

  const vehicleTrips = await db.select().from(trips).where(eq(trips.vehicleId, vehicleId));
  const completedTrips = vehicleTrips.filter((t) => t.status === "completed");

  const vehicleFuelLogs = await db.select().from(fuelLogs).where(eq(fuelLogs.vehicleId, vehicleId));
  const vehicleMaintenanceLogs = await db
    .select()
    .from(maintenanceLogs)
    .where(eq(maintenanceLogs.vehicleId, vehicleId));

  const totalRevenue = completedTrips.reduce((acc, t) => acc + parseDecimal(t.revenue), 0);
  const totalFuelCost = vehicleFuelLogs.reduce((acc, f) => acc + parseDecimal(f.cost), 0);
  const totalMaintenanceCost = vehicleMaintenanceLogs.reduce(
    (acc, m) => acc + parseDecimal(m.cost),
    0
  );
  const totalFuelLiters = vehicleFuelLogs.reduce((acc, f) => acc + parseDecimal(f.liters), 0);
  const totalOperationalCost = totalFuelCost + totalMaintenanceCost;

  let totalDistance = 0;
  for (const trip of completedTrips) {
    if (trip.endOdometer && trip.startOdometer) {
      totalDistance += trip.endOdometer - trip.startOdometer;
    }
  }

  const acquisitionCost = parseDecimal(vehicle[0].acquisitionCost);
  const roi = acquisitionCost > 0 ? (totalRevenue - totalOperationalCost) / acquisitionCost : 0;
  const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;

  return {
    vehicleId,
    totalTrips: vehicleTrips.length,
    completedTrips: completedTrips.length,
    totalRevenue,
    totalFuelCost,
    totalMaintenanceCost,
    totalOperationalCost,
    totalDistance,
    totalFuelLiters,
    fuelEfficiency: Math.round(fuelEfficiency * 100) / 100,
    roi: Math.round(roi * 10000) / 100,
  };
}

export async function getFleetAnalytics(): Promise<FleetAnalytics> {
  const allVehicles = await db.select().from(vehicles);
  const allTrips = await db.select().from(trips);
  const allFuelLogs = await db.select().from(fuelLogs);
  const allMaintenanceLogs = await db.select().from(maintenanceLogs);

  const completedTrips = allTrips.filter((t) => t.status === "completed");

  const totalRevenue = completedTrips.reduce((acc, t) => acc + parseDecimal(t.revenue), 0);
  const totalFuelCost = allFuelLogs.reduce((acc, f) => acc + parseDecimal(f.cost), 0);
  const totalMaintenanceCost = allMaintenanceLogs.reduce((acc, m) => acc + parseDecimal(m.cost), 0);
  const totalOperationalCost = totalFuelCost + totalMaintenanceCost;

  let totalDistance = 0;
  let totalFuelLiters = 0;

  for (const trip of completedTrips) {
    if (trip.endOdometer && trip.startOdometer) {
      totalDistance += trip.endOdometer - trip.startOdometer;
    }
  }

  totalFuelLiters = allFuelLogs.reduce((acc, f) => acc + parseDecimal(f.liters), 0);

  const averageFuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;

  const vehicleAnalytics: VehicleAnalytics[] = [];
  for (const vehicle of allVehicles) {
    const analytics = await getVehicleAnalytics(vehicle.id);
    if (analytics) {
      vehicleAnalytics.push(analytics);
    }
  }

  return {
    totalRevenue,
    totalFuelCost,
    totalMaintenanceCost,
    totalOperationalCost,
    averageFuelEfficiency: Math.round(averageFuelEfficiency * 100) / 100,
    vehicleAnalytics,
  };
}

export async function getAllTripsCompleted() {
  const result = await db.select().from(trips).where(eq(trips.status, "completed"));
  return result.map((trip) => ({
    ...trip,
    status: trip.status as string,
    revenue: trip.revenue ?? "0",
  }));
}
