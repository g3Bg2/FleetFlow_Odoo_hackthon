import { Edit, Plus, Search, Trash2 } from "lucide-react";
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

const vehicles = [
  {
    id: 1,
    name: "Ford Transit",
    plate: "ABC-1234",
    type: "Van",
    capacity: 500,
    odometer: 45000,
    status: "Available",
  },
  {
    id: 2,
    name: "Mercedes Sprinter",
    plate: "XYZ-5678",
    type: "Van",
    capacity: 800,
    odometer: 62000,
    status: "On Trip",
  },
  {
    id: 3,
    name: "Volvo FH16",
    plate: "DEF-9012",
    type: "Truck",
    capacity: 20000,
    odometer: 120000,
    status: "In Shop",
  },
  {
    id: 4,
    name: "Iveco Daily",
    plate: "GHI-3456",
    type: "Truck",
    capacity: 15000,
    odometer: 85000,
    status: "Available",
  },
  {
    id: 5,
    name: "Delivery Bike",
    plate: "JKL-7890",
    type: "Bike",
    capacity: 50,
    odometer: 12000,
    status: "Available",
  },
  {
    id: 6,
    name: "Peugeot Boxer",
    plate: "MNO-2345",
    type: "Van",
    capacity: 600,
    odometer: 38000,
    status: "Retired",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Available":
      return <Badge variant="success">Available</Badge>;
    case "On Trip":
      return <Badge variant="info">On Trip</Badge>;
    case "In Shop":
      return <Badge variant="warning">In Shop</Badge>;
    case "Retired":
      return <Badge variant="secondary">Retired</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.plate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || v.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Registry</h1>
          <p className="text-muted-foreground">Manage your fleet assets</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Enter the vehicle details below</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Vehicle Name/Model</Label>
                <Input id="name" placeholder="e.g., Ford Transit" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plate">License Plate</Label>
                <Input id="plate" placeholder="e.g., ABC-1234" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Vehicle Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Max Load (kg)</Label>
                  <Input id="capacity" type="number" placeholder="500" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odometer">Current Odometer (km)</Label>
                <Input id="odometer" type="number" placeholder="0" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Add Vehicle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Vehicle Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="van">Vans</SelectItem>
            <SelectItem value="truck">Trucks</SelectItem>
            <SelectItem value="bike">Bikes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vehicles Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name/Model</TableHead>
                <TableHead>License Plate</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity (kg)</TableHead>
                <TableHead>Odometer (km)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.name}</TableCell>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.capacity.toLocaleString()}</TableCell>
                  <TableCell>{vehicle.odometer.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
