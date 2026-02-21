import { AlertCircle, Calendar, CheckCircle2, Clock, Plus, Search, Wrench } from "lucide-react";
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

const maintenanceLogs = [
  {
    id: "MNT-001",
    vehicle: "TATA 1210",
    vehiclePlate: "MH 00 AB 1234",
    issue: "Engine Issue",
    date: "2026-02-20",
    cost: 10000,
    status: "New",
    mechanic: "Rajesh Kumar",
  },
  {
    id: "MNT-002",
    vehicle: "Ashok Leyland",
    vehiclePlate: "DL 01 CD 5678",
    issue: "Brake Pads Replacement",
    date: "2026-02-19",
    cost: 5000,
    status: "In Progress",
    mechanic: "Sunil Verma",
  },
  {
    id: "MNT-003",
    vehicle: "Eicher Pro",
    vehiclePlate: "KA 02 EF 9012",
    issue: "Oil Change",
    date: "2026-02-18",
    cost: 3000,
    status: "Completed",
    mechanic: "Anil Sharma",
  },
  {
    id: "MNT-004",
    vehicle: "Mahindra Loadking",
    vehiclePlate: "MH 04 GH 3456",
    issue: "Tire Replacement",
    date: "2026-02-21",
    cost: 8000,
    status: "New",
    mechanic: "Ramesh Singh",
  },
  {
    id: "MNT-005",
    vehicle: "Tata Ace",
    vehiclePlate: "UP 16 KL 4567",
    issue: "AC Repair",
    date: "2026-02-17",
    cost: 4500,
    status: "Completed",
    mechanic: "Rajesh Kumar",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "New":
      return <Badge variant="info">New</Badge>;
    case "In Progress":
      return <Badge variant="warning">In Progress</Badge>;
    case "Completed":
      return <Badge variant="success">Completed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "New":
      return <AlertCircle className="h-5 w-5 text-blue-500" />;
    case "In Progress":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "Completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    default:
      return <Wrench className="h-5 w-5 text-muted-foreground" />;
  }
};

export function MaintenancePage() {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredLogs = maintenanceLogs.filter((m) => {
    const matchesSearch =
      m.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || m.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalCost = filteredLogs.reduce((sum, m) => sum + m.cost, 0);
  const canCreate = hasPermission("maintenance");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Maintenance & Service</h1>
          <p className="text-muted-foreground mt-1">
            Track vehicle repairs, services, and maintenance schedules
          </p>
        </div>
        {canCreate && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Log Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Service Log</DialogTitle>
                <DialogDescription>Record a new maintenance or repair entry</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Vehicle *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tata">TATA 1210 (MH 00 AB 1234)</SelectItem>
                      <SelectItem value="ashok">Ashok Leyland (DL 01 CD 5678)</SelectItem>
                      <SelectItem value="eicher">Eicher Pro (KA 02 EF 9012)</SelectItem>
                      <SelectItem value="mahindra">Mahindra Loadking (MH 04 GH 3456)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Service Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engine">Engine Issue</SelectItem>
                      <SelectItem value="brake">Brake Repair</SelectItem>
                      <SelectItem value="oil">Oil Change</SelectItem>
                      <SelectItem value="tire">Tire Replacement</SelectItem>
                      <SelectItem value="ac">AC Repair</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost">Est. Cost (₹)</Label>
                    <Input id="cost" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-xs text-amber-700">
                    <strong>Auto-Status:</strong> Vehicle will be marked as "In Shop" and hidden
                    from dispatch until service is completed.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Create Log</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          {
            label: "Total Logs",
            value: maintenanceLogs.length,
            color: "text-primary",
            icon: Wrench,
          },
          {
            label: "New",
            value: maintenanceLogs.filter((m) => m.status === "New").length,
            color: "text-blue-600",
            icon: AlertCircle,
          },
          {
            label: "In Progress",
            value: maintenanceLogs.filter((m) => m.status === "In Progress").length,
            color: "text-amber-600",
            icon: Clock,
          },
          {
            label: "Total Cost",
            value: `₹${(totalCost / 1000).toFixed(0)}k`,
            color: "text-emerald-600",
            icon: null,
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
              {stat.icon && (
                <div className={`p-2 rounded-xl bg-slate-100 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vehicle, issue, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Maintenance Timeline */}
      <div className="space-y-4">
        {filteredLogs.map((log, index) => (
          <Card key={log.id} className="overflow-hidden hover:shadow-md transition-all">
            <CardContent className="p-0">
              <div className="flex items-stretch">
                {/* Status Indicator */}
                <div className="flex flex-col items-center py-6 px-4 bg-slate-50">
                  {getStatusIcon(log.status)}
                  {index < filteredLogs.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-200 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{log.id}</span>
                        {getStatusBadge(log.status)}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{log.issue}</h3>
                      <p className="text-muted-foreground">
                        {log.vehicle} • {log.vehiclePlate}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₹{log.cost.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Est. Cost</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {log.date}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Mechanic</div>
                      <div className="font-medium">{log.mechanic}</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        View Details
                      </Button>
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
            <Wrench className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No maintenance logs found</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
