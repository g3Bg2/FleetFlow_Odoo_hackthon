import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fuelLogsApi } from "@/api/fuel-logs.api";
import type { CreateFuelLogRequest, UpdateFuelLogRequest } from "@/api/types";

export function useFuelLogs() {
  return useQuery({
    queryKey: ["fuel-logs"],
    queryFn: fuelLogsApi.getAll,
  });
}

export function useFuelLog(id: string) {
  return useQuery({
    queryKey: ["fuel-logs", id],
    queryFn: () => fuelLogsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateFuelLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFuelLogRequest) => fuelLogsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuel-logs"] });
    },
  });
}

export function useUpdateFuelLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFuelLogRequest }) =>
      fuelLogsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuel-logs"] });
    },
  });
}

export function useDeleteFuelLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => fuelLogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuel-logs"] });
    },
  });
}
