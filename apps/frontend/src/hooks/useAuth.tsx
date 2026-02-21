import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { authApi } from "@/api/auth.api";
import { api } from "@/api/client";
import type { AuthResponse } from "@/api/types";

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  roleId?: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (page: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const rolePermissions: Record<number, string[]> = {
  1: ["dashboard", "vehicles", "trips", "maintenance", "fuel", "drivers", "analytics"], // Admin
  2: ["dashboard", "vehicles", "trips", "maintenance"], // Fleet Manager
  3: ["dashboard", "vehicles", "maintenance", "drivers"], // Safety Officer
  4: ["dashboard", "maintenance", "fuel", "analytics"], // Financial Analyst
};

const roleLabels: Record<number, string> = {
  1: "Admin",
  2: "Fleet Manager",
  3: "Safety Officer",
  4: "Financial Analyst",
};

export function getRoleLabel(roleId?: number): string {
  if (!roleId) return "User";
  return roleLabels[roleId] || "User";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("fleetflow_user");
    const token = localStorage.getItem("fleetflow_token");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        api.setToken(token);
      } catch {
        localStorage.removeItem("fleetflow_user");
        localStorage.removeItem("fleetflow_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response: AuthResponse = await authApi.login(username, password);

      const userObj: User = {
        id: response.user.id,
        username: response.user.username,
        fullName: response.user.fullName,
        email: response.user.email,
        roleId: response.user.roleId,
      };

      setUser(userObj);
      localStorage.setItem("fleetflow_user", JSON.stringify(userObj));
      return { success: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Login failed";
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const hasPermission = (page: string): boolean => {
    if (!user?.roleId) return false;
    const permissions = rolePermissions[user.roleId] || [];
    return permissions.includes(page);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
