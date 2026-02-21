import { AlertTriangle, Award, Ban, Clock, Plus, Search, User } from "lucide-react";
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

const drivers = [
  {
    id: "DRV-001",
    name: "Alex Johnson",
    license: "DL-123456",
    category: "Van",
    expiry: "2027-06-15",
    status: "On Duty",
    trips: 45,
    safetyScore: 95,
    phone: "+1 555-0101",
  },
  {
    id: "DRV-002",
    name: "Sarah Smith",
    license: "DL-234567",
    category: "Truck",
    expiry: "2026-08-20",
    status: "On Trip",
    trips: 78,
    safetyScore: 92,
    phone: "+1 555-0102",
  },
  {
    id: "DRV-003",
    name: "Mike Brown",
    license: "DL-345678",
    category: "Bike",
    expiry: "2027-03-10",
    status: "Off Duty",
    trips: 120,
    safetyScore: 98,
    phone: "+1 555-0103",
  },
  {
    id: "DRV-004",
    name: "Emily Davis",
    license: "DL-456789",
    category: "Van",
    expiry: "2025-12-01",
    status: "Suspended",
    trips: 34,
    safetyScore: 75,
    phone: "+1 555-0104",
  },
  {
    id: "DRV-005",
    name: "John Wilson",
    license: "DL-567890",
    category: "Truck",
    expiry: "2027-09-25",
    status: "On Duty",
    trips: 156,
    safetyScore: 88,
    phone: "+1 555-0105",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Duty":
      return <Badge variant="success">On Duty</Badge>;
    case "On Trip":
      return <Badge variant="info">On Trip</Badge>;
    case "Off Duty":
      return <Badge variant="secondary">Off Duty</Badge>;
    case "Suspended":
      return <Badge variant="destructive">Suspended</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const isLicenseExpiringSoon = (expiry: string) => {
  const expiryDate = new Date(expiry);
  const today = new Date();
  const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays < 90;
};

export function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.license.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || d.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Driver Profiles</h1>
          <p className="text-muted-foreground">Manage driver compliance and performance</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>Enter driver details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 555-0100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>License Number</Label>
                  <Input placeholder="DL-123456" />
                </div>
                <div className="grid gap-2">
                  <Label>License Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">License Expiry</Label>
                <Input id="expiry" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Add Driver</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{drivers.length}</div>
                <p className="text-sm text-muted-foreground">Total Drivers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <p className="text-sm text-muted-foreground">On Duty</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">License Expiring</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or license..."
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
            <SelectItem value="on duty">On Duty</SelectItem>
            <SelectItem value="off duty">Off Duty</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Drivers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trips</TableHead>
                <TableHead>Safety Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-sm text-muted-foreground">{driver.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{driver.license}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{driver.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {isLicenseExpiringSoon(driver.expiry) && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      <span
                        className={
                          isLicenseExpiringSoon(driver.expiry) ? "text-amber-600 font-medium" : ""
                        }
                      >
                        {driver.expiry}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>{driver.trips}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award
                        className={`h-4 w-4 ${driver.safetyScore >= 90 ? "text-green-500" : driver.safetyScore >= 80 ? "text-amber-500" : "text-red-500"}`}
                      />
                      <span>{driver.safetyScore}%</span>
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
