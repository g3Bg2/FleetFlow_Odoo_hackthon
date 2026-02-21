import { api } from "./client";
import type { CreateFuelLogRequest, FuelLog, UpdateFuelLogRequest } from "./types";

export const fuelLogsApi = {
  getAll: () => api.get<FuelLog[]>("fuel-logs"),

  getById: (id: string) => api.get<FuelLog>(`fuel-logs/${id}`),

  create: (data: CreateFuelLogRequest) => api.post<FuelLog>("fuel-logs", data),

  update: (id: string, data: UpdateFuelLogRequest) => api.put<FuelLog>(`fuel-logs/${id}`, data),

  delete: (id: string) => api.delete<{ message: string }>(`fuel-logs/${id}`),
};
