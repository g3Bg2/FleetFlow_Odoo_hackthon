import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Fuel,
  MapPin,
  Package,
  Route,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

const stats = [
  {
    title: "Active Fleet",
    value: 220,
    change: 12,
    trend: "up" as const,
    subtitle: "vehicles on road",
    icon: Truck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Maintenance Alerts",
    value: 180,
    change: -5,
    trend: "down" as const,
    subtitle: "in service",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Pending Cargo",
    value: 20,
    change: 3,
    trend: "up" as const,
    subtitle: "awaiting dispatch",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    title: "Utilization Rate",
    value: 82,
    change: 2,
    trend: "up" as const,
    subtitle: "fleet efficiency",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    gradient: "from-emerald-500 to-teal-600",
    suffix: "%",
  },
];

const liveTrips = [
  {
    id: "TRP-001",
    vehicle: "Truck-12",
    driver: "John Doe",
    route: "Mumbai → Pune",
    status: "on-way",
    eta: "14:30",
    progress: 65,
  },
  {
    id: "TRP-002",
    vehicle: "Van-05",
    driver: "Rahul Sharma",
    route: "Delhi → Jaipur",
    status: "on-way",
    eta: "16:45",
    progress: 40,
  },
  {
    id: "TRP-003",
    vehicle: "Eicher",
    driver: "Vikram Singh",
    route: "Bangalore → Chennai",
    status: "completed",
    eta: "Done",
    progress: 100,
  },
  {
    id: "TRP-004",
    vehicle: "Truck-08",
    driver: "Amit Kumar",
    route: "Hyderabad → Vizag",
    status: "delayed",
    eta: "18:00",
    progress: 25,
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Trip dispatched",
    details: "Truck-12 to Mumbai",
    time: "2 min ago",
    icon: Route,
    color: "text-blue-500",
  },
  {
    id: 2,
    action: "Maintenance completed",
    details: "Van-05 oil change",
    time: "15 min ago",
    icon: Wrench,
    color: "text-emerald-500",
  },
  {
    id: 3,
    action: "Driver check-in",
    details: "Rahul at checkpoint",
    time: "32 min ago",
    icon: Users,
    color: "text-purple-500",
  },
  {
    id: 4,
    action: "Expense logged",
    details: "Rs. 15,000 fuel",
    time: "1 hour ago",
    icon: Fuel,
    color: "text-amber-500",
  },
  {
    id: 5,
    action: "Trip completed",
    details: "Bike-03 delivery",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-500",
  },
];

const quickActions = [
  { label: "New Trip", icon: Route, href: "/trips", color: "from-blue-500 to-blue-600" },
  { label: "Add Vehicle", icon: Truck, href: "/vehicles", color: "from-purple-500 to-purple-600" },
  { label: "Log Expense", icon: Fuel, href: "/fuel", color: "from-amber-500 to-amber-600" },
  { label: "Add Driver", icon: Users, href: "/drivers", color: "from-emerald-500 to-emerald-600" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getStatusBadge(status: string) {
  switch (status) {
    case "on-way":
      return (
        <Badge variant="info">
          On Way
        </Badge>
      );
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    case "delayed":
      return <Badge variant="warning">Delayed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{getGreeting()}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your fleet today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Vehicle Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="truck">Trucks</SelectItem>
              <SelectItem value="van">Vans</SelectItem>
              <SelectItem value="bike">Bikes</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="idle">Idle</SelectItem>
              <SelectItem value="maintenance">In Shop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient}`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={`p-2 rounded-xl ${stat.bgColor} transition-transform group-hover:scale-110`}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mounted ? (
                  <AnimatedNumber value={stat.value} suffix={stat.suffix || ""} duration={1000} />
                ) : (
                  stat.value
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{stat.subtitle}</span>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Tracking - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="text-lg font-semibold">Live Tracking</h2>
            </div>
            <Link to="/trips">
              <Button variant="ghost" size="sm" className="text-primary">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {liveTrips.map((trip) => (
                  <div key={trip.id} className="p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="font-medium">{trip.vehicle}</div>
                          <div className="text-sm text-muted-foreground">{trip.driver}</div>
                        </div>
                      </div>
                      {getStatusBadge(trip.status)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.route}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          ETA: <span className="font-medium text-foreground">{trip.eta}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              trip.status === "completed"
                                ? "bg-green-500"
                                : trip.status === "delayed"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                            }`}
                            style={{ width: `${trip.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {trip.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.href}>
                  <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    <CardContent className="p-4">
                      <div
                        className={`w-10 h-10 rounded-xl bg-linear-to-br ${action.color} flex items-center justify-center mb-3 shadow-sm`}
                      >
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="font-medium text-sm">{action.label}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-slate-50 ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{activity.action}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {activity.details}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
