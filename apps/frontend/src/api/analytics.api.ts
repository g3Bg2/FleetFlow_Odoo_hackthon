import { api } from "./client";
import type { DashboardStats, FleetAnalytics, VehicleAnalytics } from "./types";

export const dashboardApi = {
  getStats: () => api.get<DashboardStats>("dashboard/stats"),
};

export const analyticsApi = {
  getFleet: () => api.get<FleetAnalytics>("analytics/fleet"),

  getVehicle: (vehicleId: string) => api.get<VehicleAnalytics>(`analytics/vehicle/${vehicleId}`),

  exportTrips: () => api.get<string>("analytics/export/trips"),
};
