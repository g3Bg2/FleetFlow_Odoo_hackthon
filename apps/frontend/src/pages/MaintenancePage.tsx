import { Plus, Search, Wrench } from "lucide-react";
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

const maintenanceLogs = [
  {
    id: "MNT-001",
    vehicle: "Truck-12",
    type: "Oil Change",
    cost: 150,
    date: "2026-02-20",
    status: "Completed",
  },
  {
    id: "MNT-002",
    vehicle: "Van-05",
    type: "Brake Repair",
    cost: 300,
    date: "2026-02-19",
    status: "In Progress",
  },
  {
    id: "MNT-003",
    vehicle: "Truck-08",
    type: "Tire Replacement",
    cost: 800,
    date: "2026-02-18",
    status: "Completed",
  },
  {
    id: "MNT-004",
    vehicle: "Van-02",
    type: "Engine Tune-up",
    cost: 250,
    date: "2026-02-21",
    status: "Scheduled",
  },
  {
    id: "MNT-005",
    vehicle: "Bike-03",
    type: "Chain Maintenance",
    cost: 50,
    date: "2026-02-17",
    status: "Completed",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge variant="success">Completed</Badge>;
    case "In Progress":
      return <Badge variant="warning">In Progress</Badge>;
    case "Scheduled":
      return <Badge variant="info">Scheduled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredLogs = maintenanceLogs.filter(
    (m) =>
      m.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = filteredLogs.reduce((sum, m) => sum + m.cost, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance & Service</h1>
          <p className="text-muted-foreground">Track vehicle service and repairs</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Service Log</DialogTitle>
              <DialogDescription>Record maintenance or repair work</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Vehicle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck12">Truck-12</SelectItem>
                    <SelectItem value="van05">Van-05</SelectItem>
                    <SelectItem value="van02">Van-02</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Service Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oil">Oil Change</SelectItem>
                    <SelectItem value="brake">Brake Repair</SelectItem>
                    <SelectItem value="tire">Tire Replacement</SelectItem>
                    <SelectItem value="engine">Engine Tune-up</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input id="cost" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <Wrench className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-800">
                  Vehicle status will be set to "In Shop"
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Add Service Log</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-sm text-muted-foreground">Total Service Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Maintenance Cost</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by vehicle or service type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 max-w-md"
        />
      </div>

      {/* Maintenance Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.vehicle}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>${log.cost}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
