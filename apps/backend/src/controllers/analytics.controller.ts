import type { Context } from "hono";
import * as analyticsService from "../services/analytics.service.js";

export async function getVehicleAnalytics(c: Context) {
  const vehicleId = Number(c.req.param("vehicleId"));
  if (Number.isNaN(vehicleId)) {
    return c.json({ error: "Invalid vehicle ID" }, 400);
  }
  const analytics = await analyticsService.getVehicleAnalytics(vehicleId);
  if (!analytics) {
    return c.json({ error: "Vehicle not found" }, 404);
  }
  return c.json(analytics);
}

export async function getFleetAnalytics(c: Context) {
  const analytics = await analyticsService.getFleetAnalytics();
  return c.json(analytics);
}

export async function exportTripsCSV(c: Context) {
  const trips = await analyticsService.getAllTripsCompleted();

  const headers = [
    "ID",
    "Vehicle ID",
    "Driver ID",
    "Cargo Weight",
    "Start Odometer",
    "End Odometer",
    "Status",
    "Revenue",
    "Created At",
  ];
  const rows = trips.map((t) => [
    t.id.toString(),
    t.vehicleId.toString(),
    t.driverId.toString(),
    t.cargoWeight,
    t.startOdometer.toString(),
    t.endOdometer?.toString() ?? "",
    t.status,
    t.revenue,
    t.createdAt.toISOString(),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return c.text(csv, 200, {
    "Content-Type": "text/csv",
    "Content-Disposition": "attachment; filename=completed_trips.csv",
  });
}
