import { ArrowRight, MapPin, Package, Plus, Search } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";

const trips = [
  {
    id: "TRP-001",
    fleetType: "Trailer Truck",
    vehicle: "TATA 1210",
    driver: "John Doe",
    cargo: "15000 kg",
    origin: "Mumbai",
    destination: "Pune",
    status: "On Way",
    eta: "14:30",
    progress: 65,
  },
  {
    id: "TRP-002",
    fleetType: "Mini Truck",
    vehicle: "Eicher Pro",
    driver: "Rahul Sharma",
    cargo: "5000 kg",
    origin: "Delhi",
    destination: "Jaipur",
    status: "On Way",
    eta: "16:45",
    progress: 40,
  },
  {
    id: "TRP-003",
    fleetType: "Pickup",
    vehicle: "Mahindra",
    driver: "Vikram Singh",
    cargo: "800 kg",
    origin: "Bangalore",
    destination: "Chennai",
    status: "Completed",
    eta: "Done",
    progress: 100,
  },
  {
    id: "TRP-004",
    fleetType: "Trailer Truck",
    vehicle: "Ashok Leyland",
    driver: "Amit Kumar",
    cargo: "20000 kg",
    origin: "Hyderabad",
    destination: "Vizag",
    status: "Dispatched",
    eta: "18:00",
    progress: 10,
  },
  {
    id: "TRP-005",
    fleetType: "Van",
    vehicle: "Tata Ace",
    driver: "Suresh Patel",
    cargo: "600 kg",
    origin: "Ahmedabad",
    destination: "Surat",
    status: "Draft",
    eta: "-",
    progress: 0,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Way":
      return (
        <Badge variant="info">
          On Way
        </Badge>
      );
    case "Dispatched":
      return <Badge variant="warning">Dispatched</Badge>;
    case "Completed":
      return <Badge variant="success">Completed</Badge>;
    case "Draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "Cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getProgressColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-500";
    case "On Way":
      return "bg-blue-500";
    case "Dispatched":
      return "bg-amber-500";
    default:
      return "bg-slate-300";
  }
};

export function TripsPage() {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || t.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const canCreate = hasPermission("trips");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trip Dispatcher</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage delivery trips across your fleet
          </p>
        </div>
        {canCreate && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
                <DialogDescription>
                  Dispatch a new trip by selecting vehicle, driver, and cargo details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Vehicle *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tata">TATA 1210 (20 Ton)</SelectItem>
                        <SelectItem value="eicher">Eicher Pro (5 Ton)</SelectItem>
                        <SelectItem value="ashok">Ashok Leyland (25 Ton)</SelectItem>
                        <SelectItem value="tata-ace">Tata Ace (750 kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Driver *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose driver" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="rahul">Rahul Sharma</SelectItem>
                        <SelectItem value="vikram">Vikram Singh</SelectItem>
                        <SelectItem value="amit">Amit Kumar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin *</Label>
                    <Input id="origin" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination *</Label>
                    <Input id="destination" placeholder="Pune" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo Weight (kg) *</Label>
                    <Input id="cargo" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel">Est. Fuel Cost</Label>
                    <Input id="fuel" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Cargo weight will be validated against vehicle capacity
                    before dispatch.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Dispatch Trip</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Trips", value: trips.length, color: "text-primary" },
          {
            label: "On Way",
            value: trips.filter((t) => t.status === "On Way").length,
            color: "text-blue-600",
          },
          {
            label: "Completed",
            value: trips.filter((t) => t.status === "Completed").length,
            color: "text-emerald-600",
          },
          {
            label: "Pending",
            value: trips.filter((t) => t.status === "Draft" || t.status === "Dispatched").length,
            color: "text-amber-600",
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="text-sm text-muted-foreground">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trips, vehicles, or drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="dispatched">Dispatched</SelectItem>
            <SelectItem value="on way">On Way</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trips Cards */}
      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <Card key={trip.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Left - Trip Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{trip.id}</span>
                        {getStatusBadge(trip.status)}
                      </div>
                      <div className="text-lg font-semibold">{trip.fleetType}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">ETA</div>
                      <div className="font-semibold">{trip.eta}</div>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{trip.origin}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span>{trip.destination}</span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Vehicle</div>
                      <div className="font-medium">{trip.vehicle}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Driver</div>
                      <div className="font-medium">{trip.driver}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Cargo</div>
                      <div className="font-medium">{trip.cargo}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Progress</div>
                      <div className="font-medium">{trip.progress}%</div>
                    </div>
                  </div>
                </div>

                {/* Right - Progress */}
                <div className="lg:w-48 bg-slate-50 p-6 flex flex-col justify-center items-center">
                  <div className="relative w-24 h-24 mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-200"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${trip.progress * 2.51} 251`}
                        className={getProgressColor(trip.status).replace("bg-", "text-")}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">{trip.progress}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-center text-muted-foreground">
                    {trip.status === "Completed"
                      ? "Delivered"
                      : trip.status === "On Way"
                        ? "In Transit"
                        : trip.status === "Dispatched"
                          ? "Starting Soon"
                          : "Not Started"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No trips found</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
