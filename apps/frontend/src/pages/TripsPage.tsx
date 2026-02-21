import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const trips = [
  {
    id: "TRP-001",
    vehicle: "Van-05",
    driver: "Alex Johnson",
    cargo: 450,
    status: "On Trip",
    from: "Warehouse A",
    to: "Downtown Hub",
    date: "2026-02-21",
  },
  {
    id: "TRP-002",
    vehicle: "Truck-12",
    driver: "Sarah Smith",
    cargo: 15000,
    status: "Dispatched",
    from: "Port Terminal",
    to: "Warehouse B",
    date: "2026-02-21",
  },
  {
    id: "TRP-003",
    vehicle: "Bike-03",
    driver: "Mike Brown",
    cargo: 30,
    status: "Completed",
    from: "Central Hub",
    to: "Office Tower",
    date: "2026-02-20",
  },
  {
    id: "TRP-004",
    vehicle: "Van-02",
    driver: "Emily Davis",
    cargo: 500,
    status: "Draft",
    from: "Airport Cargo",
    to: "Distribution Center",
    date: "2026-02-22",
  },
  {
    id: "TRP-005",
    vehicle: "Truck-08",
    driver: "John Wilson",
    cargo: 18000,
    status: "Cancelled",
    from: "Factory A",
    to: "Port Terminal",
    date: "2026-02-19",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "Dispatched":
      return <Badge variant="warning">Dispatched</Badge>;
    case "On Trip":
      return <Badge variant="info">On Trip</Badge>;
    case "Completed":
      return <Badge variant="success">Completed</Badge>;
    case "Cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || t.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trip Dispatcher</h1>
          <p className="text-muted-foreground">Create and manage trips</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Trip
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Trip</DialogTitle>
              <DialogDescription>Assign vehicle and driver for the trip</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Vehicle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="van05">Van-05 (500kg)</SelectItem>
                      <SelectItem value="truck12">Truck-12 (20t)</SelectItem>
                      <SelectItem value="van02">Van-02 (600kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Driver</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex Johnson</SelectItem>
                      <SelectItem value="sarah">Sarah Smith</SelectItem>
                      <SelectItem value="mike">Mike Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="from">From</Label>
                  <Input id="from" placeholder="Origin location" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="to">To</Label>
                  <Input id="to" placeholder="Destination" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cargo">Cargo Weight (kg)</Label>
                <Input id="cargo" type="number" placeholder="0" />
                <p className="text-xs text-muted-foreground">
                  Validation: Cargo must not exceed vehicle capacity
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Create Trip</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="dispatched">Dispatched</SelectItem>
            <SelectItem value="on trip">On Trip</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trips Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Cargo (kg)</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">{trip.id}</TableCell>
                  <TableCell>{trip.vehicle}</TableCell>
                  <TableCell>{trip.driver}</TableCell>
                  <TableCell>{trip.cargo.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{trip.from}</div>
                      <div className="text-muted-foreground">→ {trip.to}</div>
                    </div>
                  </TableCell>
                  <TableCell>{trip.date}</TableCell>
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
