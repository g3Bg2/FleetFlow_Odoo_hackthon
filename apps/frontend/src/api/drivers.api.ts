import { api } from "./client";
import type { CreateDriverRequest, Driver, UpdateDriverRequest } from "./types";

export const driversApi = {
  getAll: () => api.get<Driver[]>("drivers"),

  getById: (id: string) => api.get<Driver>(`drivers/${id}`),

  create: (data: CreateDriverRequest) => api.post<Driver>("drivers", data),

  update: (id: string, data: UpdateDriverRequest) => api.put<Driver>(`drivers/${id}`, data),

  delete: (id: string) => api.delete<{ message: string }>(`drivers/${id}`),
};
