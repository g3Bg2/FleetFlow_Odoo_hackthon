import { Bike, Car, Edit, Plus, Search, Trash2, Truck } from "lucide-react";
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

const vehicles = [
  {
    id: 1,
    plate: "MH 00 AB 1234",
    model: "TATA 1210",
    type: "Truck",
    capacity: "20 Ton",
    odometer: 79000,
    status: "Idle",
    driver: "John Doe",
  },
  {
    id: 2,
    plate: "DL 01 CD 5678",
    model: "Ashok Leyland",
    type: "Truck",
    capacity: "25 Ton",
    odometer: 120000,
    status: "On Trip",
    driver: "Rahul Sharma",
  },
  {
    id: 3,
    plate: "KA 02 EF 9012",
    model: "Eicher Pro",
    type: "Van",
    capacity: "5 Ton",
    odometer: 65000,
    status: "Idle",
    driver: "Unassigned",
  },
  {
    id: 4,
    plate: "MH 04 GH 3456",
    model: "Mahindra Loadking",
    type: "Van",
    capacity: "3 Ton",
    odometer: 45000,
    status: "In Shop",
    driver: "Unassigned",
  },
  {
    id: 5,
    plate: "TN 05 IJ 7890",
    model: "Piaggio Ape",
    type: "Bike",
    capacity: "200 kg",
    odometer: 25000,
    status: "Idle",
    driver: "Vikram Singh",
  },
  {
    id: 6,
    plate: "UP 16 KL 4567",
    model: "Tata Ace",
    type: "Van",
    capacity: "750 kg",
    odometer: 52000,
    status: "On Trip",
    driver: "Amit Kumar",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Idle":
      return <Badge variant="success">Idle</Badge>;
    case "On Trip":
      return (
        <Badge variant="info">
          On Trip
        </Badge>
      );
    case "In Shop":
      return <Badge variant="warning">In Shop</Badge>;
    case "Retired":
      return <Badge variant="secondary">Retired</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Truck":
      return <Truck className="h-4 w-4" />;
    case "Van":
      return <Car className="h-4 w-4" />;
    case "Bike":
      return <Bike className="h-4 w-4" />;
    default:
      return <Truck className="h-4 w-4" />;
  }
};

export function VehiclesPage() {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.plate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || v.type.toLowerCase() === typeFilter;
    const matchesStatus =
      statusFilter === "all" || v.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const canAdd = hasPermission("vehicles");
  const canEdit = hasPermission("vehicles");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Registry</h1>
          <p className="text-muted-foreground mt-1">
            Manage your fleet assets and vehicle information
          </p>
        </div>
        {canAdd && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>New Vehicle Registration</DialogTitle>
                <DialogDescription>Add a new vehicle to your fleet inventory</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plate">License Plate *</Label>
                    <Input id="plate" placeholder="MH 00 AB 1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Input id="model" placeholder="TATA 1210" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="bike">Bike</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Payload *</Label>
                    <Input id="capacity" placeholder="20 Ton" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="odometer">Initial Odometer (km)</Label>
                  <Input id="odometer" type="number" placeholder="0" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Register Vehicle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Vehicles", value: vehicles.length, color: "text-primary" },
          {
            label: "On Trip",
            value: vehicles.filter((v) => v.status === "On Trip").length,
            color: "text-blue-600",
          },
          {
            label: "Idle",
            value: vehicles.filter((v) => v.status === "Idle").length,
            color: "text-emerald-600",
          },
          {
            label: "In Shop",
            value: vehicles.filter((v) => v.status === "In Shop").length,
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
            placeholder="Search by plate or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-35">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="truck">Trucks</SelectItem>
            <SelectItem value="van">Vans</SelectItem>
            <SelectItem value="bike">Bikes</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-35">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="on trip">On Trip</SelectItem>
            <SelectItem value="in shop">In Shop</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vehicles Grid/Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50/50">
                  <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                    Plate
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                    Capacity
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                    Odometer
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                    Driver
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                    Status
                  </th>
                  {canEdit && (
                    <th className="text-right py-4 px-4 font-medium text-sm text-muted-foreground">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="border-b last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          {getTypeIcon(vehicle.type)}
                        </div>
                        <span className="font-medium">{vehicle.model}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                        {vehicle.plate}
                      </code>
                    </td>
                    <td className="py-4 px-4">{vehicle.type}</td>
                    <td className="py-4 px-4">{vehicle.capacity}</td>
                    <td className="py-4 px-4">{vehicle.odometer.toLocaleString()} km</td>
                    <td className="py-4 px-4 text-muted-foreground">{vehicle.driver}</td>
                    <td className="py-4 px-4">{getStatusBadge(vehicle.status)}</td>
                    {canEdit && (
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No vehicles found</p>
              <p className="text-sm text-muted-foreground/70">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
