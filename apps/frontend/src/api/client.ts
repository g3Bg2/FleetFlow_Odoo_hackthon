import ky, { HTTPError, type KyInstance, type Options } from "ky";
import type { ApiError } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiClient {
  private client: KyInstance;
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("fleetflow_token");

    this.client = ky.create({
      prefixUrl: API_URL,
      hooks: {
        beforeRequest: [
          (request) => {
            if (this.token) {
              request.headers.set("Authorization", `Bearer ${this.token}`);
            }
          },
        ],
        afterResponse: [
          async (_request, _options, response) => {
            if (response.status === 401) {
              this.clearToken();
              window.location.href = "/login";
            }
          },
        ],
      },
    });
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("fleetflow_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("fleetflow_token");
    localStorage.removeItem("fleetflow_user");
  }

  getToken() {
    return this.token;
  }

  private async request<T>(method: string, endpoint: string, options?: Options): Promise<T> {
    try {
      const response = await this.client(endpoint, {
        method,
        ...options,
      });
      return response.json<T>();
    } catch (error) {
      if (error instanceof HTTPError) {
        const body = await error.response.json<ApiError>();
        throw new Error(body.error || "An error occurred");
      }
      throw error;
    }
  }

  get<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request<T>("get", endpoint, options);
  }

  post<T>(endpoint: string, body?: unknown, options?: Options): Promise<T> {
    return this.request<T>("post", endpoint, { json: body, ...options });
  }

  put<T>(endpoint: string, body?: unknown, options?: Options): Promise<T> {
    return this.request<T>("put", endpoint, { json: body, ...options });
  }

  delete<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request<T>("delete", endpoint, options);
  }
}

export const api = new ApiClient();
