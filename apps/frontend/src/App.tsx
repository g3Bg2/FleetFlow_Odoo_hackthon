import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { DriversPage } from "@/pages/DriversPage";
import { FuelPage } from "@/pages/FuelPage";
import { LoginPage } from "@/pages/LoginPage";
import { MaintenancePage } from "@/pages/MaintenancePage";
import { RegisterPage } from "@/pages/RegisterPage";
import { TripsPage } from "@/pages/TripsPage";
import { VehiclesPage } from "@/pages/VehiclesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/fuel" element={<FuelPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
