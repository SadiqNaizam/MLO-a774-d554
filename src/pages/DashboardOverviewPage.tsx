import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KPICard from '@/components/KPICard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'; // Using recharts directly as per shadcn chart examples
import { DollarSign, ShoppingCart, Users, Activity, Package } from 'lucide-react';

// Sample data for charts
const salesData = [
  { month: 'Jan', sales: 4000, orders: 2400 },
  { month: 'Feb', sales: 3000, orders: 1398 },
  { month: 'Mar', sales: 2000, orders: 9800 },
  { month: 'Apr', sales: 2780, orders: 3908 },
  { month: 'May', sales: 1890, orders: 4800 },
  { month: 'Jun', sales: 2390, orders: 3800 },
  { month: 'Jul', sales: 3490, orders: 4300 },
];

const recentActivity = [
  { user: 'Olivia Martin', action: 'placed Order #10024', time: '5m ago', avatar: 'OM' },
  { user: 'Jackson Lee', action: 'updated product "Eco-friendly Water Bottle"', time: '15m ago', avatar: 'JL' },
  { user: 'Isabella Nguyen', action: 'registered a new account', time: '30m ago', avatar: 'IN' },
  { user: 'William Kim', action: 'cancelled Order #10012', time: '1h ago', avatar: 'WK' },
  { user: 'Sophia Davis', action: 'viewed "Summer Collection"', time: '2h ago', avatar: 'SD' },
];

const DashboardOverviewPage = () => {
  console.log('DashboardOverviewPage loaded');

  const chartConfig = {
    sales: { label: "Sales ($)", color: "hsl(var(--chart-1))" },
    orders: { label: "Orders", color: "hsl(var(--chart-2))" },
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 flex-grow"> {/* Adjust pl-64 based on Sidebar width (w-60) */}
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Total Revenue"
              value="$45,231.89"
              icon={DollarSign}
              description="+20.1% from last month"
            />
            <KPICard
              title="New Orders"
              value="2,350"
              icon={ShoppingCart}
              description="+180.1% from last month"
            />
            <KPICard
              title="Active Users"
              value="1,250"
              icon={Users}
              description="+19% from last month"
            />
            <KPICard
              title="Pending Shipments"
              value="102"
              icon={Package}
              description="Awaiting processing"
            />
          </div>

          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Sales Trends</CardTitle>
                <CardDescription>Monthly sales and order volume.</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line yAxisId="left" type="monotone" dataKey="sales" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={true} />
                      <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={true} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions from users and system.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {activity.avatar}
                    </div>
                    <div className="grid gap-0.5 text-sm">
                      <p className="font-medium leading-none">{activity.user}</p>
                      <p className="text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;