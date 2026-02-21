import { AlertTriangle, Package, Percent, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stats = [
  {
    title: "Active Fleet",
    value: "12",
    subtitle: "vehicles on trip",
    icon: Truck,
    color: "text-blue-500",
  },
  {
    title: "Maintenance Alerts",
    value: "3",
    subtitle: "vehicles in shop",
    icon: AlertTriangle,
    color: "text-amber-500",
  },
  {
    title: "Utilization Rate",
    value: "78%",
    subtitle: "of fleet assigned",
    icon: Percent,
    color: "text-green-500",
  },
  {
    title: "Pending Cargo",
    value: "8",
    subtitle: "shipments waiting",
    icon: Package,
    color: "text-purple-500",
  },
];

const recentTrips = [
  {
    id: "TRP-001",
    vehicle: "Van-05",
    driver: "Alex Johnson",
    status: "On Trip",
    destination: "Warehouse A",
  },
  {
    id: "TRP-002",
    vehicle: "Truck-12",
    driver: "Sarah Smith",
    status: "Dispatched",
    destination: "Port Terminal",
  },
  {
    id: "TRP-003",
    vehicle: "Bike-03",
    driver: "Mike Brown",
    status: "Completed",
    destination: "Downtown Hub",
  },
  {
    id: "TRP-004",
    vehicle: "Van-02",
    driver: "Emily Davis",
    status: "Cancelled",
    destination: "Airport Cargo",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Trip":
      return <Badge variant="info">{status}</Badge>;
    case "Dispatched":
      return <Badge variant="warning">{status}</Badge>;
    case "Completed":
      return <Badge variant="success">{status}</Badge>;
    case "Cancelled":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">High-level fleet oversight at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="on-trip">On Trip</SelectItem>
              <SelectItem value="maintenance">In Shop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destination</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">{trip.id}</TableCell>
                  <TableCell>{trip.vehicle}</TableCell>
                  <TableCell>{trip.driver}</TableCell>
                  <TableCell>{getStatusBadge(trip.status)}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
