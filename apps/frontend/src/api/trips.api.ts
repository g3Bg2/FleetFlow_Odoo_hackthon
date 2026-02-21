import { api } from "./client";
import type { CreateTripRequest, Trip, UpdateTripRequest } from "./types";

export const tripsApi = {
  getAll: () => api.get<Trip[]>("trips"),

  getById: (id: string) => api.get<Trip>(`trips/${id}`),

  create: (data: CreateTripRequest) => api.post<Trip>("trips", data),

  update: (id: string, data: UpdateTripRequest) => api.put<Trip>(`trips/${id}`, data),

  delete: (id: string) => api.delete<{ message: string }>(`trips/${id}`),
};
