import { AlertTriangle, Package, Percent, Search, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    value: "220",
    subtitle: "vehicles on road",
    icon: Truck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Maintenance Alert",
    value: "180",
    subtitle: "vehicles in shop",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Pending Cargo",
    value: "20",
    subtitle: "shipments waiting",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Utilization Rate",
    value: "82%",
    subtitle: "fleet utilization",
    icon: Percent,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

const recentTrips = [
  {
    id: "1",
    vehicle: "TATA 1210",
    driver: "John Doe",
    status: "On Trip",
    origin: "Mumbai",
    destination: "Pune",
  },
  {
    id: "2",
    vehicle: "Ashok Leyland",
    driver: "Rahul Sharma",
    status: "On Trip",
    origin: "Delhi",
    destination: "Jaipur",
  },
  {
    id: "3",
    vehicle: "Eicher",
    driver: "Vikram Singh",
    status: "On Trip",
    origin: "Bangalore",
    destination: "Chennai",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Trip":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Trip</Badge>;
    case "Dispatched":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Dispatched</Badge>;
    case "Completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    case "Cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Quick overview of your fleet operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
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
            <SelectTrigger className="w-[150px]">
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
          <Card key={stat.title} className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Trips */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Trips</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">#{trip.id}</TableCell>
                  <TableCell>{trip.vehicle}</TableCell>
                  <TableCell>{trip.driver}</TableCell>
                  <TableCell>{trip.origin}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>{getStatusBadge(trip.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
