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
    plate: "MH 00 AB 1234",
    model: "TATA 1210",
    type: "Truck",
    capacity: "20 Ton",
    odometer: 79000,
    status: "Idle",
  },
  {
    id: 2,
    plate: "DL 01 CD 5678",
    model: "Ashok Leyland",
    type: "Truck",
    capacity: "25 Ton",
    odometer: 120000,
    status: "On Trip",
  },
  {
    id: 3,
    plate: "KA 02 EF 9012",
    model: "Eicher",
    type: "Van",
    capacity: "5 Ton",
    odometer: 65000,
    status: "Idle",
  },
  {
    id: 4,
    plate: "MH 04 GH 3456",
    model: "Mahindra",
    type: "Van",
    capacity: "3 Ton",
    odometer: 45000,
    status: "In Shop",
  },
  {
    id: 5,
    plate: "TN 05 IJ 7890",
    model: "Piaggio",
    type: "Bike",
    capacity: "200 kg",
    odometer: 25000,
    status: "Idle",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Idle":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Idle</Badge>;
    case "On Trip":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Trip</Badge>;
    case "In Shop":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Shop</Badge>;
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
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              New Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Vehicle Registration</DialogTitle>
              <DialogDescription>Add a new vehicle to your fleet</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="plate">License Plate</Label>
                <Input id="plate" placeholder="e.g., MH 00 AB 1234" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="e.g., TATA 1210" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Type</Label>
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
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Max Payload</Label>
                  <Input id="capacity" placeholder="e.g., 20 Ton" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odometer">Initial Odometer</Label>
                <Input id="odometer" type="number" placeholder="0" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by plate or model..."
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
            <SelectItem value="truck">Trucks</SelectItem>
            <SelectItem value="van">Vans</SelectItem>
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
                <TableHead>No</TableHead>
                <TableHead>Plate</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Odometer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle, index) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.capacity}</TableCell>
                  <TableCell>{vehicle.odometer.toLocaleString()} km</TableCell>
                  <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
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
