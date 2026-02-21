import { api } from "./client";
import type { CreateVehicleRequest, UpdateVehicleRequest, Vehicle } from "./types";

export const vehiclesApi = {
  getAll: () => api.get<Vehicle[]>("vehicles"),

  getById: (id: string) => api.get<Vehicle>(`vehicles/${id}`),

  create: (data: CreateVehicleRequest) => api.post<Vehicle>("vehicles", data),

  update: (id: string, data: UpdateVehicleRequest) => api.put<Vehicle>(`vehicles/${id}`, data),

  delete: (id: string) => api.delete<{ message: string }>(`vehicles/${id}`),
};
