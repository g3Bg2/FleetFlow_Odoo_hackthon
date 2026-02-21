import {
  BarChart3,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Fuel,
  LayoutDashboard,
  LogOut,
  Menu,
  Route,
  Search,
  Settings,
  Truck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { roleLabels } from "@/lib/auth";
import { cn } from "@/lib/utils";

const allNavItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { to: "/vehicles", icon: Truck, label: "Vehicles", key: "vehicles" },
  { to: "/trips", icon: Route, label: "Trips", key: "trips" },
  { to: "/maintenance", icon: Wrench, label: "Maintenance", key: "maintenance" },
  { to: "/fuel", icon: Fuel, label: "Expenses", key: "fuel" },
  { to: "/drivers", icon: Users, label: "Drivers", key: "drivers" },
  { to: "/analytics", icon: BarChart3, label: "Analytics", key: "analytics" },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = allNavItems.filter((item) => hasPermission(item.key));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPageTitle = () => {
    const item = allNavItems.find((item) => item.to === location.pathname);
    return item?.label || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">FleetFlow</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white/80 backdrop-blur-xl border-r transition-all duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          sidebarCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
              <Truck className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-lg animate-fade-in">FleetFlow</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* User Info */}
        {!sidebarCollapsed && (
          <div className="px-4 py-4 border-b animate-fade-in">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold shadow-sm">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{user?.name}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {user?.role && roleLabels[user.role]}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  sidebarCollapsed && "justify-center px-0"
                )
              }
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", sidebarCollapsed && "mx-auto")} />
              {!sidebarCollapsed && <span className="animate-fade-in">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200",
              sidebarCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className={cn("h-5 w-5", sidebarCollapsed && "mx-auto")} />
            {!sidebarCollapsed && <span className="animate-fade-in">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={cn("transition-all duration-300", sidebarCollapsed ? "lg:ml-20" : "lg:ml-64")}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b">
          <div className="flex items-center justify-between h-full px-6">
            {/* Left - Page Title & Breadcrumb */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
              </div>
              <div className="lg:hidden text-lg font-semibold">FleetFlow</div>
            </div>

            {/* Right - Search, Notifications, User */}
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="hidden lg:block">
                  <div className="text-sm font-medium">{user?.name}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
