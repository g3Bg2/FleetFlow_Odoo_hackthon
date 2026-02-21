import {
  Calendar,
  Fuel,
  IndianRupee,
  Plus,
  Receipt,
  Search,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const expenseLogs = [
  {
    id: "EXP-001",
    tripId: "TRP-001",
    vehicle: "TATA 1210",
    driver: "John Doe",
    distance: 1500,
    fuelCost: 19000,
    miscCost: 3000,
    date: "2026-02-21",
    status: "Done",
  },
  {
    id: "EXP-002",
    tripId: "TRP-002",
    vehicle: "Eicher Pro",
    driver: "Rahul Sharma",
    distance: 800,
    fuelCost: 15000,
    miscCost: 2000,
    date: "2026-02-20",
    status: "Done",
  },
  {
    id: "EXP-003",
    tripId: "TRP-003",
    vehicle: "Ashok Leyland",
    driver: "Vikram Singh",
    distance: 1200,
    fuelCost: 22000,
    miscCost: 4000,
    date: "2026-02-19",
    status: "Pending",
  },
  {
    id: "EXP-004",
    tripId: "TRP-004",
    vehicle: "Mahindra",
    driver: "Amit Kumar",
    distance: 600,
    fuelCost: 8500,
    miscCost: 1500,
    date: "2026-02-18",
    status: "Done",
  },
  {
    id: "EXP-005",
    tripId: "TRP-005",
    vehicle: "Tata Ace",
    driver: "Suresh Patel",
    distance: 400,
    fuelCost: 5000,
    miscCost: 800,
    date: "2026-02-17",
    status: "Done",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Done":
      return <Badge variant="success">Done</Badge>;
    case "Pending":
      return <Badge variant="warning">Pending</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function FuelPage() {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredLogs = expenseLogs.filter((f) => {
    const matchesSearch =
      f.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.tripId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || f.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalFuelCost = expenseLogs.reduce((sum, f) => sum + f.fuelCost, 0);
  const totalMiscCost = expenseLogs.reduce((sum, f) => sum + f.miscCost, 0);
  const totalDistance = expenseLogs.reduce((sum, f) => sum + f.distance, 0);
  const canCreate = hasPermission("fuel");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trip & Expense</h1>
          <p className="text-muted-foreground mt-1">
            Track fuel consumption and operational expenses
          </p>
        </div>
        {canCreate && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Log New Expense</DialogTitle>
                <DialogDescription>Record fuel and miscellaneous trip expenses</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Trip ID</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trp001">TRP-001</SelectItem>
                        <SelectItem value="trp002">TRP-002</SelectItem>
                        <SelectItem value="trp003">TRP-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Driver</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="rahul">Rahul Sharma</SelectItem>
                        <SelectItem value="vikram">Vikram Singh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelCost">Fuel Cost (₹)</Label>
                    <Input id="fuelCost" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="miscCost">Misc Expense (₹)</Label>
                    <Input id="miscCost" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (km)</Label>
                    <Input id="distance" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Log Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Fuel Cost
            </CardTitle>
            <Fuel className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ₹<AnimatedNumber value={totalFuelCost} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across {expenseLogs.length} trips</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Misc Expenses
            </CardTitle>
            <Receipt className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ₹<AnimatedNumber value={totalMiscCost} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tolls, parking, etc.</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Distance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              <AnimatedNumber value={totalDistance} suffix=" km" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Distance covered</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cost per km</CardTitle>
            <IndianRupee className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              ₹{((totalFuelCost + totalMiscCost) / totalDistance).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Average expense</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by driver, vehicle, or trip..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expense Cards */}
      <div className="grid gap-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Left - Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-sm text-muted-foreground">{log.id}</span>
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">
                      {log.tripId}
                    </span>
                    {getStatusBadge(log.status)}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Truck className="h-4 w-4" />
                        Vehicle
                      </div>
                      <div className="font-medium">{log.vehicle}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Driver</div>
                      <div className="font-medium">{log.driver}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Distance</div>
                      <div className="font-medium">{log.distance.toLocaleString()} km</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                      <div className="font-medium">{log.date}</div>
                    </div>
                  </div>
                </div>

                {/* Right - Costs */}
                <div className="flex items-center gap-6 lg:border-l lg:pl-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Fuel</div>
                    <div className="text-xl font-bold text-blue-600">
                      ₹{log.fuelCost.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Misc</div>
                    <div className="text-xl font-bold text-purple-600">
                      ₹{log.miscCost.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-xl font-bold text-primary">
                      ₹{(log.fuelCost + log.miscCost).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No expense logs found</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
