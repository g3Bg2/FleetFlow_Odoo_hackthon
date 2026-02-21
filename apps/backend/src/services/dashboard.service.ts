import { db, drivers, trips, vehicles } from "@repo/db";
import { inArray } from "drizzle-orm";

export interface DashboardStats {
  activeFleet: number;
  maintenanceAlerts: number;
  utilizationRate: number;
  pendingCargo: number;
  totalVehicles: number;
  availableVehicles: number;
  onTripVehicles: number;
  inShopVehicles: number;
  retiredVehicles: number;
  totalDrivers: number;
  availableDrivers: number;
  onTripDrivers: number;
  suspendedDrivers: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const allVehicles = await db.select().from(vehicles);
  const allDrivers = await db.select().from(drivers);
  const activeTrips = await db
    .select()
    .from(trips)
    .where(inArray(trips.status, ["draft", "dispatched"]));

  const totalVehicles = allVehicles.length;
  const onTripVehicles = allVehicles.filter((v) => v.status === "on_trip").length;
  const inShopVehicles = allVehicles.filter((v) => v.status === "in_shop").length;
  const availableVehicles = allVehicles.filter((v) => v.status === "available").length;
  const retiredVehicles = allVehicles.filter((v) => v.status === "retired").length;

  const totalDrivers = allDrivers.length;
  const onTripDrivers = allDrivers.filter((d) => d.status === "on_trip").length;
  const availableDrivers = allDrivers.filter(
    (d) => d.status === "off_duty" || d.status === "on_duty"
  ).length;
  const suspendedDrivers = allDrivers.filter((d) => d.status === "suspended").length;

  const utilizationRate =
    totalVehicles > 0 ? (onTripVehicles / (totalVehicles - retiredVehicles)) * 100 : 0;

  return {
    activeFleet: onTripVehicles,
    maintenanceAlerts: inShopVehicles,
    utilizationRate: Math.round(utilizationRate * 100) / 100,
    pendingCargo: activeTrips.length,
    totalVehicles,
    availableVehicles,
    onTripVehicles,
    inShopVehicles,
    retiredVehicles,
    totalDrivers,
    availableDrivers,
    onTripDrivers,
    suspendedDrivers,
  };
}
