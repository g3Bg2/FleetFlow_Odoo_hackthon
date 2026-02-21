export interface User {
  id: string;
  role_id?: number;
  username: string;
  full_name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  name_model: string;
  license_plate: string;
  max_capacity: string;
  current_odometer: number;
  status: "available" | "on_trip" | "in_shop" | "retired";
  acquisition_cost: string;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  full_name: string;
  license_category: string;
  license_expiry: string;
  safety_score: string;
  status: "on_duty" | "off_duty" | "suspended" | "on_trip";
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: string;
  vehicle_id: number;
  driver_id: number;
  cargo_weight: string;
  start_odometer: number;
  end_odometer?: number;
  status: "draft" | "dispatched" | "completed" | "cancelled";
  revenue?: string;
  created_at: string;
  updated_at: string;
}

export interface FuelLog {
  id: string;
  vehicle_id: number;
  trip_id?: number;
  liters: string;
  cost: string;
  log_date: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceLog {
  id: string;
  vehicle_id: number;
  service_type: string;
  cost: string;
  service_date: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  full_name: string;
  email: string;
  phone?: string;
  role_id?: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    roleId?: number;
  };
}

export interface DashboardStats {
  activeFleet: number;
  maintenanceAlerts: number;
  utilizationRate: number;
  pendingCargo: number;
  totalVehicles: number;
  availableVehicles: number;
  onTripVehicles: number;
  inShopVehicles: number;
  retiredVehicles: number;
  totalDrivers: number;
  availableDrivers: number;
  onTripDrivers: number;
  suspendedDrivers: number;
}

export interface VehicleAnalytics {
  vehicleId: number;
  totalTrips: number;
  completedTrips: number;
  totalRevenue: number;
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalOperationalCost: number;
  totalDistance: number;
  totalFuelLiters: number;
  fuelEfficiency: number;
  roi: number;
}

export interface FleetAnalytics {
  totalRevenue: number;
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalOperationalCost: number;
  averageFuelEfficiency: number;
  vehicleAnalytics: VehicleAnalytics[];
}

export interface CreateVehicleRequest {
  name_model: string;
  license_plate: string;
  max_capacity: string;
  current_odometer: number;
  status?: "available" | "on_trip" | "in_shop" | "retired";
  acquisition_cost: string;
}

export interface UpdateVehicleRequest {
  name_model?: string;
  license_plate?: string;
  max_capacity?: string;
  current_odometer?: number;
  status?: "available" | "on_trip" | "in_shop" | "retired";
  acquisition_cost?: string;
}

export interface CreateDriverRequest {
  full_name: string;
  license_category: string;
  license_expiry: string;
  safety_score: string;
  status?: "on_duty" | "off_duty" | "suspended" | "on_trip";
}

export interface UpdateDriverRequest {
  full_name?: string;
  license_category?: string;
  license_expiry?: string;
  safety_score?: string;
  status?: "on_duty" | "off_duty" | "suspended" | "on_trip";
}

export interface CreateTripRequest {
  vehicle_id: number;
  driver_id: number;
  cargo_weight: string;
  start_odometer: number;
  end_odometer?: number;
  status?: "draft" | "dispatched" | "completed" | "cancelled";
  revenue?: string;
}

export interface UpdateTripRequest {
  vehicle_id?: number;
  driver_id?: number;
  cargo_weight?: string;
  start_odometer?: number;
  end_odometer?: number;
  status?: "draft" | "dispatched" | "completed" | "cancelled";
  revenue?: string;
}

export interface CreateFuelLogRequest {
  vehicle_id: number;
  trip_id?: number;
  liters: string;
  cost: string;
  log_date: string;
}

export interface UpdateFuelLogRequest {
  vehicle_id?: number;
  trip_id?: number;
  liters?: string;
  cost?: string;
  log_date?: string;
}

export interface CreateMaintenanceLogRequest {
  vehicle_id: number;
  service_type: string;
  cost: string;
  service_date: string;
}

export interface UpdateMaintenanceLogRequest {
  vehicle_id?: number;
  service_type?: string;
  cost?: string;
  service_date?: string;
}

export interface ApiError {
  error: string;
  details?: Array<{ field: string; message: string }>;
}
