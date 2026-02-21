import { api } from "./client";
import type {
  CreateMaintenanceLogRequest,
  MaintenanceLog,
  UpdateMaintenanceLogRequest,
} from "./types";

export const maintenanceLogsApi = {
  getAll: () => api.get<MaintenanceLog[]>("maintenance-logs"),

  getById: (id: string) => api.get<MaintenanceLog>(`maintenance-logs/${id}`),

  create: (data: CreateMaintenanceLogRequest) => api.post<MaintenanceLog>("maintenance-logs", data),

  update: (id: string, data: UpdateMaintenanceLogRequest) =>
    api.put<MaintenanceLog>(`maintenance-logs/${id}`, data),

  delete: (id: string) => api.delete<{ message: string }>(`maintenance-logs/${id}`),
};
