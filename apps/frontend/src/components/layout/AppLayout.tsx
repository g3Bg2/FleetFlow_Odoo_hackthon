import {
  BarChart3,
  Fuel,
  LayoutDashboard,
  LogOut,
  Menu,
  Route,
  Truck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { roleLabels } from "@/lib/auth";
import { cn } from "@/lib/utils";

const allNavItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { to: "/vehicles", icon: Truck, label: "Vehicle Registry", key: "vehicles" },
  { to: "/trips", icon: Route, label: "Trip Dispatcher", key: "trips" },
  { to: "/maintenance", icon: Wrench, label: "Maintenance", key: "maintenance" },
  { to: "/fuel", icon: Fuel, label: "Trip & Expense", key: "fuel" },
  { to: "/drivers", icon: Users, label: "Performance", key: "drivers" },
  { to: "/analytics", icon: BarChart3, label: "Analytics", key: "analytics" },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();

  const navItems = allNavItems.filter((item) => hasPermission(item.key));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b bg-background z-40 flex items-center justify-between px-4">
        <span className="font-bold text-xl">FleetFlow</span>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 border-r bg-card transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <span className="font-bold text-xl">FleetFlow</span>
        </div>

        {/* User Info */}
        <div className="px-4 py-3 border-b">
          <div className="text-sm font-medium">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.role && roleLabels[user.role]}</div>
        </div>

        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="min-h-screen p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
