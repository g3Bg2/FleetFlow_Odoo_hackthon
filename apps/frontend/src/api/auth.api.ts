import { api } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "./types";

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("auth/login", data);
    api.setToken(response.token);
    return response;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("auth/register", data);
    api.setToken(response.token);
    return response;
  },

  logout: () => {
    api.clearToken();
  },
};
