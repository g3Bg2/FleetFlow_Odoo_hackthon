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
    id: "1",
    fleetType: "Trailer Truck",
    vehicle: "TATA 1210",
    driver: "John Doe",
    origin: "Mumbai",
    destination: "Pune",
    status: "On Way",
  },
  {
    id: "2",
    fleetType: "Mini Truck",
    vehicle: "Eicher",
    driver: "Rahul Sharma",
    origin: "Delhi",
    destination: "Jaipur",
    status: "On Way",
  },
  {
    id: "3",
    fleetType: "Pickup",
    vehicle: "Mahindra",
    driver: "Vikram Singh",
    origin: "Bangalore",
    destination: "Chennai",
    status: "Completed",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Way":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Way</Badge>;
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

export function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.id.includes(searchTerm) || t.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
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
              New Trip
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Trip Form</DialogTitle>
              <DialogDescription>Create a new trip for your fleet</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Select Vehicle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tata">TATA 1210</SelectItem>
                      <SelectItem value="eicher">Eicher</SelectItem>
                      <SelectItem value="ashok">Ashok Leyland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Cargo Weight (Kg)</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Select Driver</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="rahul">Rahul Sharma</SelectItem>
                    <SelectItem value="vikram">Vikram Singh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="origin">Origin Address</Label>
                  <Input id="origin" placeholder="From location" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="To location" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Estimated Fuel Cost</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Confirm & Dispatch Trip</Button>
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
            <SelectItem value="on way">On Way</SelectItem>
            <SelectItem value="dispatched">Dispatched</SelectItem>
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
                <TableHead>Trip</TableHead>
                <TableHead>Fleet Type</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">#{trip.id}</TableCell>
                  <TableCell>{trip.fleetType}</TableCell>
                  <TableCell>{trip.vehicle}</TableCell>
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
