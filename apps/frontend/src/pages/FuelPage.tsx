import { Fuel, Plus, Receipt, Search } from "lucide-react";
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

const fuelLogs = [
  {
    id: "FL-001",
    vehicle: "Van-05",
    type: "Fuel",
    liters: 45,
    cost: 67.5,
    date: "2026-02-21",
    tripId: "TRP-001",
  },
  {
    id: "FL-002",
    vehicle: "Truck-12",
    type: "Fuel",
    liters: 120,
    cost: 180.0,
    date: "2026-02-20",
    tripId: "TRP-002",
  },
  {
    id: "FL-003",
    vehicle: "Van-02",
    type: "Toll",
    liters: 0,
    cost: 25.0,
    date: "2026-02-19",
    tripId: "",
  },
  {
    id: "FL-004",
    vehicle: "Truck-08",
    type: "Fuel",
    liters: 100,
    cost: 150.0,
    date: "2026-02-18",
    tripId: "TRP-005",
  },
  {
    id: "FL-005",
    vehicle: "Bike-03",
    type: "Fuel",
    liters: 8,
    cost: 12.0,
    date: "2026-02-17",
    tripId: "TRP-003",
  },
  {
    id: "FL-006",
    vehicle: "Van-05",
    type: "Parking",
    liters: 0,
    cost: 15.0,
    date: "2026-02-16",
    tripId: "",
  },
];

export function FuelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredLogs = fuelLogs.filter((f) => {
    const matchesSearch = f.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || f.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalCost = filteredLogs.reduce((sum, f) => sum + f.cost, 0);
  const totalLiters = filteredLogs
    .filter((f) => f.liters > 0)
    .reduce((sum, f) => sum + f.liters, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fuel & Expenses</h1>
          <p className="text-muted-foreground">Track fuel consumption and operational costs</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Expense</DialogTitle>
              <DialogDescription>Record fuel or operational expense</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Vehicle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="van05">Van-05</SelectItem>
                    <SelectItem value="truck12">Truck-12</SelectItem>
                    <SelectItem value="van02">Van-02</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Expense Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fuel">Fuel</SelectItem>
                    <SelectItem value="toll">Toll</SelectItem>
                    <SelectItem value="parking">Parking</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="liters">Liters</Label>
                  <Input id="liters" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input id="cost" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Add Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{totalLiters}L</div>
                <p className="text-sm text-muted-foreground">Total Fuel</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="text-2xl font-bold">{filteredLogs.length}</div>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Expense Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="fuel">Fuel</SelectItem>
            <SelectItem value="toll">Toll</SelectItem>
            <SelectItem value="parking">Parking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Liters</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Trip ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.vehicle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.type}</Badge>
                  </TableCell>
                  <TableCell>{log.liters > 0 ? `${log.liters}L` : "-"}</TableCell>
                  <TableCell>${log.cost.toFixed(2)}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.tripId || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
