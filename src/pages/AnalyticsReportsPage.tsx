import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CalendarIcon, DownloadIcon, FilterIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

const reportTypes = [
  { value: 'sales_overview', label: 'Sales Overview' },
  { value: 'product_performance', label: 'Product Performance' },
  { value: 'customer_segmentation', label: 'Customer Segmentation' },
  { value: 'traffic_sources', label: 'Traffic Sources' },
];

// Sample data - replace with actual data fetching and processing logic
const sampleSalesData = [
  { date: '2024-07-01', revenue: 1200, orders: 15 },
  { date: '2024-07-02', revenue: 1500, orders: 20 },
  { date: '2024-07-03', revenue: 900, orders: 12 },
  { date: '2024-07-04', revenue: 2200, orders: 25 },
  { date: '2024-07-05', revenue: 1800, orders: 22 },
];
const sampleProductPerformanceData = [
  { productName: 'Eco Bottle', unitsSold: 150, revenue: 3750, conversion: '5%' },
  { productName: 'Organic Tee', unitsSold: 80, revenue: 2400, conversion: '3%' },
  { productName: 'Fitness Tracker', unitsSold: 220, revenue: 11000, conversion: '8%' },
];

const chartConfigSales = {
  revenue: { label: "Revenue ($)", color: "hsl(var(--chart-1))" },
  orders: { label: "Orders", color: "hsl(var(--chart-2))" },
};

const AnalyticsReportsPage = () => {
  console.log('AnalyticsReportsPage loaded');
  const [selectedReportType, setSelectedReportType] = useState(reportTypes[0].value);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const handleGenerateReport = () => {
    console.log('Generating report:', selectedReportType, dateRange);
    // Add logic to fetch and display report data
  };
  
  const handleExportReport = () => {
    console.log('Exporting report:', selectedReportType, dateRange);
    // Add logic to export data
  };

  const renderReportContent = () => {
    switch (selectedReportType) {
      case 'sales_overview':
        return (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview Chart</CardTitle>
                <CardDescription>Daily revenue and order count for the selected period.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigSales} className="aspect-auto h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleSalesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="date" tickFormatter={(val) => format(new Date(val), "MMM dd")} tickLine={false} axisLine={false} tickMargin={8}/>
                      <YAxis yAxisId="left" dataKey="revenue" stroke="hsl(var(--chart-1))" tickLine={false} axisLine={false} tickMargin={8}/>
                      <YAxis yAxisId="right" orientation="right" dataKey="orders" stroke="hsl(var(--chart-2))" tickLine={false} axisLine={false} tickMargin={8}/>
                      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={true} />
                      <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={true} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
             <Card>
              <CardHeader><CardTitle>Sales Data Table</CardTitle></CardHeader>
              <CardContent>
                 <Table>
                  <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Revenue</TableHead><TableHead>Orders</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {sampleSalesData.map(d => <TableRow key={d.date}><TableCell>{d.date}</TableCell><TableCell>${d.revenue.toFixed(2)}</TableCell><TableCell>{d.orders}</TableCell></TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case 'product_performance':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Product Performance Report</CardTitle>
              <CardDescription>Key metrics for top performing products.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleProductPerformanceData.map((product) => (
                    <TableRow key={product.productName}>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.unitsSold}</TableCell>
                      <TableCell>${product.revenue.toFixed(2)}</TableCell>
                      <TableCell>{product.conversion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      default:
        return <Card><CardContent><p className="py-10 text-center text-muted-foreground">Report type "{reportTypes.find(rt => rt.value === selectedReportType)?.label}" will be shown here.</p></CardContent></Card>;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 flex-grow">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Generate and view detailed reports for various business aspects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger className="w-full sm:w-[280px]">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                
                <Button onClick={handleGenerateReport} className="w-full sm:w-auto">
                  <FilterIcon className="mr-2 h-4 w-4" /> Generate Report
                </Button>
                 <Button variant="outline" onClick={handleExportReport} className="w-full sm:w-auto ml-auto">
                  <DownloadIcon className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              
              <div className="mt-6">
                {renderReportContent()}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;