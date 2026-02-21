import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { maintenanceLogsApi } from "@/api/maintenance-logs.api";
import type { CreateMaintenanceLogRequest, UpdateMaintenanceLogRequest } from "@/api/types";

export function useMaintenanceLogs() {
  return useQuery({
    queryKey: ["maintenance-logs"],
    queryFn: maintenanceLogsApi.getAll,
  });
}

export function useMaintenanceLog(id: string) {
  return useQuery({
    queryKey: ["maintenance-logs", id],
    queryFn: () => maintenanceLogsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateMaintenanceLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaintenanceLogRequest) => maintenanceLogsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-logs"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useUpdateMaintenanceLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMaintenanceLogRequest }) =>
      maintenanceLogsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-logs"] });
    },
  });
}

export function useDeleteMaintenanceLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => maintenanceLogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-logs"] });
    },
  });
}
