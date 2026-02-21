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
    id: "321",
    tripId: "TRP-001",
    driver: "John Doe",
    distance: "1000 km",
    fuelExpense: "19k",
    miscExpense: "3k",
    status: "Done",
  },
  {
    id: "322",
    tripId: "TRP-002",
    driver: "Rahul Sharma",
    distance: "800 km",
    fuelExpense: "15k",
    miscExpense: "2k",
    status: "Done",
  },
  {
    id: "323",
    tripId: "TRP-003",
    driver: "Vikram Singh",
    distance: "1200 km",
    fuelExpense: "22k",
    miscExpense: "4k",
    status: "Pending",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Done":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Done</Badge>;
    case "Pending":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function FuelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredLogs = fuelLogs.filter(
    (f) =>
      f.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.tripId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trip & Expense</h1>
          <p className="text-muted-foreground">Track fuel and operational expenses</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add an Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Expense</DialogTitle>
              <DialogDescription>Log a new expense</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Trip ID</Label>
                <Input placeholder="e.g., TRP-001" />
              </div>
              <div className="grid gap-2">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Fuel Cost</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label>Misc Expense</Label>
                  <Input type="number" placeholder="0" />
                </div>
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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Total Fuel Cost</div>
                <div className="text-2xl font-bold">Rs. 2.6 L</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">Total Expenses</div>
                <div className="text-2xl font-bold">Rs. 4.5 L</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by driver or trip ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 max-w-md"
        />
      </div>

      {/* Expenses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip ID</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Fuel Expense</TableHead>
                <TableHead>Misc. Expense</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.tripId}</TableCell>
                  <TableCell>{log.driver}</TableCell>
                  <TableCell>{log.distance}</TableCell>
                  <TableCell>Rs. {log.fuelExpense}</TableCell>
                  <TableCell>Rs. {log.miscExpense}</TableCell>
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
