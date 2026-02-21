import { AlertTriangle, Award, Plus, Search, User } from "lucide-react";
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
    id: "1",
    name: "John Doe",
    license: "23223",
    expiry: "22/36",
    completionRate: "92%",
    safetyScore: "89%",
    complaints: "4",
    status: "On Duty",
  },
  {
    id: "2",
    name: "Rahul Sharma",
    license: "23224",
    expiry: "25/28",
    completionRate: "95%",
    safetyScore: "92%",
    complaints: "2",
    status: "On Trip",
  },
  {
    id: "3",
    name: "Vikram Singh",
    license: "23225",
    expiry: "30/27",
    completionRate: "88%",
    safetyScore: "85%",
    complaints: "6",
    status: "Off Duty",
  },
  {
    id: "4",
    name: "Amit Kumar",
    license: "23226",
    expiry: "15/26",
    completionRate: "90%",
    safetyScore: "91%",
    complaints: "3",
    status: "On Duty",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Duty":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Duty</Badge>;
    case "On Trip":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Trip</Badge>;
    case "Off Duty":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Off Duty</Badge>;
    case "Suspended":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const isLicenseExpiringSoon = (expiry: string) => {
  const [month] = expiry.split("/").map(Number);
  const currentMonth = 2;
  return month - currentMonth < 3;
};

export function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.license.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || d.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Driver Performance</h1>
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
                <TableHead>Name</TableHead>
                <TableHead>License #</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Safety Score</TableHead>
                <TableHead>Complaints</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{driver.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{driver.license}</TableCell>
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
                  <TableCell>{driver.completionRate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award
                        className={`h-4 w-4 ${parseInt(driver.safetyScore) >= 90 ? "text-green-500" : parseInt(driver.safetyScore) >= 80 ? "text-amber-500" : "text-red-500"}`}
                      />
                      <span>{driver.safetyScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={parseInt(driver.complaints) > 5 ? "destructive" : "secondary"}>
                      {driver.complaints}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
