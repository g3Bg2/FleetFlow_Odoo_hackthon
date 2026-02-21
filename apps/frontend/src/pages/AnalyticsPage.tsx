import {
  Calendar,
  Download,
  Fuel,
  IndianRupee,
  PieChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
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
    value: 260000,
    prefix: "₹",
    suffix: "L",
    change: 5,
    trend: "up" as const,
    icon: Fuel,
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Fleet ROI",
    value: 12.5,
    suffix: "%",
    change: 2,
    trend: "up" as const,
    icon: TrendingUp,
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Utilization Rate",
    value: 82,
    suffix: "%",
    change: 3,
    trend: "up" as const,
    icon: PieChart,
    color: "text-purple-600",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Avg Cost/Km",
    value: 18.5,
    prefix: "₹",
    change: -2,
    trend: "down" as const,
    icon: IndianRupee,
    color: "text-amber-600",
    gradient: "from-amber-500 to-amber-600",
  },
];

const monthlyData = [
  { month: "Oct", revenue: 920000, fuelCost: 48000, maintenance: 22000, netProfit: 850000 },
  { month: "Nov", revenue: 880000, fuelCost: 52000, maintenance: 25000, netProfit: 803000 },
  { month: "Dec", revenue: 1050000, fuelCost: 55000, maintenance: 28000, netProfit: 967000 },
  { month: "Jan", revenue: 1150000, fuelCost: 58000, maintenance: 30000, netProfit: 1062000 },
  { month: "Feb", revenue: 1254000, fuelCost: 62000, maintenance: 32000, netProfit: 1160000 },
];

const vehiclePerformance = [
  { name: "TATA 1210", trips: 45, revenue: 150000, cost: 45000, efficiency: 8.5 },
  { name: "Ashok Leyland", trips: 38, revenue: 180000, cost: 52000, efficiency: 7.2 },
  { name: "Eicher Pro", trips: 32, revenue: 120000, cost: 38000, efficiency: 9.1 },
  { name: "Mahindra Loadking", trips: 28, revenue: 98000, cost: 32000, efficiency: 8.8 },
  { name: "Tata Ace", trips: 120, revenue: 84000, cost: 12000, efficiency: 12.5 },
];

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${value.toLocaleString()}`;
};

export function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Financial insights and operational performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-35">
              <SelectValue placeholder="Period" />
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
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className="relative overflow-hidden group hover:shadow-lg transition-all"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${metric.gradient}`}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-xl bg-slate-50 ${metric.color}`}>
                <metric.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.prefix}
                <AnimatedNumber value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={metric.trend === "up" ? "text-emerald-600" : "text-red-500"}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Financial Summary</CardTitle>
            <Badge variant="secondary">Last 5 months</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                    Month
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">
                    Fuel Cost
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">
                    Maintenance
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">
                    Net Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr
                    key={data.month}
                    className={`border-b last:border-0 hover:bg-slate-50/50 transition-colors ${
                      index === monthlyData.length - 1 ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{data.month}</span>
                        {index === monthlyData.length - 1 && (
                          <Badge variant="secondary" className="text-[10px]">
                            Current
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-600">
                      {formatCurrency(data.revenue)}
                    </td>
                    <td className="py-4 px-4 text-right text-red-600">
                      {formatCurrency(data.fuelCost)}
                    </td>
                    <td className="py-4 px-4 text-right text-amber-600">
                      {formatCurrency(data.maintenance)}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-primary">
                      {formatCurrency(data.netProfit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Vehicles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehiclePerformance.slice(0, 5).map((vehicle, index) => (
              <div
                key={vehicle.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{vehicle.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {vehicle.trips} trips completed
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-emerald-600">
                    {formatCurrency(vehicle.revenue)}
                  </div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
                <div className="w-20">
                  <div className="text-right text-sm font-medium mb-1">
                    {vehicle.efficiency} km/L
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(vehicle.efficiency / 15) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "Fuel", percentage: 45, amount: 62000, color: "bg-blue-500" },
                { label: "Maintenance", percentage: 25, amount: 32000, color: "bg-amber-500" },
                { label: "Driver Wages", percentage: 20, amount: 28000, color: "bg-purple-500" },
                { label: "Miscellaneous", percentage: 10, amount: 14000, color: "bg-slate-400" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{formatCurrency(item.amount)}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Expenses</span>
                <span className="text-2xl font-bold text-primary">₹1,36,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
