import { DollarSign, Download, Fuel, TrendingDown, TrendingUp, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const metrics = [
  { title: "Fuel Efficiency", value: "8.5 km/L", change: "+5%", trend: "up", icon: Fuel },
  { title: "Total Revenue", value: "$125,400", change: "+12%", trend: "up", icon: DollarSign },
  { title: "Vehicle ROI", value: "24%", change: "-2%", trend: "down", icon: TrendingDown },
  { title: "Active Drivers", value: "12", change: "0%", trend: "neutral", icon: Users },
];

const vehiclePerformance = [
  { name: "Van-05", trips: 45, revenue: 15000, cost: 4500, roi: 70 },
  { name: "Truck-12", trips: 38, revenue: 42000, cost: 12000, roi: 71 },
  { name: "Van-02", trips: 32, revenue: 12000, cost: 3800, roi: 68 },
  { name: "Truck-08", trips: 28, revenue: 38000, cost: 15000, roi: 60 },
  { name: "Bike-03", trips: 120, revenue: 8400, cost: 1200, roi: 85 },
];

const monthlyData = [
  { month: "Sep", revenue: 85000, expenses: 45000 },
  { month: "Oct", revenue: 92000, expenses: 48000 },
  { month: "Nov", revenue: 88000, expenses: 52000 },
  { month: "Dec", revenue: 105000, expenses: 55000 },
  { month: "Jan", revenue: 115000, expenses: 58000 },
  { month: "Feb", revenue: 125400, expenses: 62000 },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Financial and operational insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {metric.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                {metric.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                <span
                  className={
                    metric.trend === "up"
                      ? "text-green-500"
                      : metric.trend === "down"
                        ? "text-red-500"
                        : ""
                  }
                >
                  {metric.change}
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(data.revenue / 150000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-20">
                          ${(data.revenue / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fleet Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>On Trip</span>
                      <span>12 vehicles</span>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "48%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Available</span>
                      <span>8 vehicles</span>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "32%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>In Shop</span>
                      <span>3 vehicles</span>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "12%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Retired</span>
                      <span>2 vehicles</span>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400" style={{ width: "8%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehiclePerformance.map((vehicle) => (
                  <div
                    key={vehicle.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Truck className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{vehicle.name}</div>
                        <div className="text-sm text-muted-foreground">{vehicle.trips} trips</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${vehicle.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Cost: ${vehicle.cost.toLocaleString()}
                      </div>
                    </div>
                    <div className="w-24">
                      <div className="text-sm font-medium text-right">{vehicle.roi}% ROI</div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full ${vehicle.roi >= 70 ? "bg-green-500" : vehicle.roi >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${vehicle.roi}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div
                    key={data.month}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <span className="font-medium">{data.month}</span>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="font-medium text-green-600">
                          ${data.revenue.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Expenses</div>
                        <div className="font-medium text-red-600">
                          ${data.expenses.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Profit</div>
                        <div className="font-medium">
                          ${(data.revenue - data.expenses).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
