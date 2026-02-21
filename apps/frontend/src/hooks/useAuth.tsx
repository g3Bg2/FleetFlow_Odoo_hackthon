import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { dummyUsers, rolePermissions, type User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  hasPermission: (page: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("fleetflow_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const foundUser = dummyUsers.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const userObj: User = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      setUser(userObj);
      localStorage.setItem("fleetflow_user", JSON.stringify(userObj));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fleetflow_user");
  };

  const hasPermission = (page: string): boolean => {
    if (!user) return false;
    return rolePermissions[user.role].includes(page);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
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
