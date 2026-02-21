import { useQuery } from "@tanstack/react-query";
import { analyticsApi, dashboardApi } from "@/api/analytics.api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardApi.getStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useFleetAnalytics() {
  return useQuery({
    queryKey: ["analytics", "fleet"],
    queryFn: analyticsApi.getFleet,
  });
}

export function useVehicleAnalytics(vehicleId: string) {
  return useQuery({
    queryKey: ["analytics", "vehicle", vehicleId],
    queryFn: () => analyticsApi.getVehicle(vehicleId),
    enabled: !!vehicleId,
  });
}
