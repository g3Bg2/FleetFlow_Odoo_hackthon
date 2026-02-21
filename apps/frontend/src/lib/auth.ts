export type UserRole = "manager" | "dispatcher" | "safety" | "finance";

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

export const rolePermissions: Record<UserRole, string[]> = {
  manager: ["dashboard", "vehicles", "trips", "maintenance", "fuel", "drivers", "analytics"],
  dispatcher: ["dashboard", "vehicles", "trips", "maintenance"],
  safety: ["dashboard", "vehicles", "maintenance", "drivers"],
  finance: ["dashboard", "maintenance", "fuel", "analytics"],
};

export const roleLabels: Record<UserRole, string> = {
  manager: "Fleet Manager",
  dispatcher: "Dispatcher",
  safety: "Safety Officer",
  finance: "Financial Analyst",
};

export const roleDescriptions: Record<UserRole, string> = {
  manager: "Oversee vehicle health, asset lifecycle, and scheduling",
  dispatcher: "Create trips, assign drivers, and validate cargo loads",
  safety: "Monitor driver compliance, license expirations, and safety scores",
  finance: "Audit fuel spend, maintenance ROI, and operational costs",
};

export const dummyUsers: Array<{ email: string; password: string; name: string; role: UserRole }> =
  [
    {
      email: "manager@fleetflow.com",
      password: "manager123",
      name: "Admin Manager",
      role: "manager",
    },
    {
      email: "dispatcher@fleetflow.com",
      password: "dispatcher123",
      name: "John Dispatcher",
      role: "dispatcher",
    },
    { email: "safety@fleetflow.com", password: "safety123", name: "Sarah Safety", role: "safety" },
    {
      email: "finance@fleetflow.com",
      password: "finance123",
      name: "Mike Finance",
      role: "finance",
    },
  ];
