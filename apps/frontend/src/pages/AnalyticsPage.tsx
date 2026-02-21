import { Download, Fuel, Percent, TrendingDown, TrendingUp, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const metrics = [
  {
    title: "Total Fuel Cost",
    value: "Rs. 2.6 L",
    change: "+5%",
    trend: "up",
    icon: Fuel,
    color: "text-blue-600",
  },
  {
    title: "Fleet ROI",
    value: "+12.5%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Utilization Rate",
    value: "82%",
    change: "+3%",
    trend: "up",
    icon: Percent,
    color: "text-purple-600",
  },
  {
    title: "Active Drivers",
    value: "12",
    change: "0%",
    trend: "neutral",
    icon: Users,
    color: "text-amber-600",
  },
];

const monthlyData = [
  {
    month: "Jan",
    revenue: "Rs. 17L",
    fuelCost: "Rs. 6L",
    maintenance: "Rs. 2L",
    netProfit: "Rs. 9L",
  },
  {
    month: "Feb",
    revenue: "Rs. 18L",
    fuelCost: "Rs. 6.5L",
    maintenance: "Rs. 2.2L",
    netProfit: "Rs. 9.3L",
  },
  {
    month: "Mar",
    revenue: "Rs. 19L",
    fuelCost: "Rs. 7L",
    maintenance: "Rs. 2.5L",
    netProfit: "Rs. 9.5L",
  },
  {
    month: "Apr",
    revenue: "Rs. 16L",
    fuelCost: "Rs. 5.5L",
    maintenance: "Rs. 1.8L",
    netProfit: "Rs. 8.7L",
  },
];

const vehiclePerformance = [
  { name: "TATA 1210", trips: 45, revenue: 150000, cost: 45000, roi: 70 },
  { name: "Ashok Leyland", trips: 38, revenue: 180000, cost: 52000, roi: 71 },
  { name: "Eicher", trips: 32, revenue: 120000, cost: 38000, roi: 68 },
  { name: "Mahindra", trips: 28, revenue: 98000, cost: 32000, roi: 67 },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Financial and operational insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
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

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary of Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Month</th>
                  <th className="text-right py-3 px-4 font-medium">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium">Fuel Cost</th>
                  <th className="text-right py-3 px-4 font-medium">Maintenance</th>
                  <th className="text-right py-3 px-4 font-medium">Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data) => (
                  <tr key={data.month} className="border-b">
                    <td className="py-3 px-4 font-medium">{data.month}</td>
                    <td className="text-right py-3 px-4 text-green-600">{data.revenue}</td>
                    <td className="text-right py-3 px-4 text-red-600">{data.fuelCost}</td>
                    <td className="text-right py-3 px-4 text-amber-600">{data.maintenance}</td>
                    <td className="text-right py-3 px-4 font-medium">{data.netProfit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Performance */}
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
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Revenue</div>
                    <div className="font-medium text-green-600">
                      {vehicle.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Cost</div>
                    <div className="font-medium text-red-600">{vehicle.cost.toLocaleString()}</div>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
