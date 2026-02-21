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
    id: "321",
    vehicle: "TATA",
    issue: "Engine Issue",
    date: "20/02/2026",
    cost: "10k",
    status: "New",
  },
  {
    id: "322",
    vehicle: "Ashok Leyland",
    issue: "Brake Pads",
    date: "19/02/2026",
    cost: "5k",
    status: "In Progress",
  },
  {
    id: "323",
    vehicle: "Eicher",
    issue: "Oil Change",
    date: "18/02/2026",
    cost: "3k",
    status: "Completed",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "New":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
    case "In Progress":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
    case "Completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
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
      m.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">Track vehicle service and repairs</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Service</DialogTitle>
              <DialogDescription>Log a new maintenance entry</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Vehicle Name</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tata">TATA</SelectItem>
                    <SelectItem value="ashok">Ashok Leyland</SelectItem>
                    <SelectItem value="eicher">Eicher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Issue/Service</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engine">Engine Issue</SelectItem>
                    <SelectItem value="brake">Brake Repair</SelectItem>
                    <SelectItem value="oil">Oil Change</SelectItem>
                    <SelectItem value="tire">Tire Replacement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
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
              <Button onClick={() => setDialogOpen(false)}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by vehicle or service..."
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
                <TableHead>Log ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Issue/Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.vehicle}</TableCell>
                  <TableCell>{log.issue}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>Rs. {log.cost}</TableCell>
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
