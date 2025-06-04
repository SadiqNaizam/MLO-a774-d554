import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DataGridToolbar from '@/components/DataGridToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, XAxis, YAxis, Bar, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  salesVolume: number;
  views: number;
  conversionRate: number;
  stock: number;
  imageUrl?: string;
}

const sampleProducts: Product[] = [
  { id: 'PROD001', name: 'Eco-Friendly Water Bottle', category: 'Accessories', salesVolume: 1500, views: 5000, conversionRate: 30, stock: 120, imageUrl: 'https://via.placeholder.com/40' },
  { id: 'PROD002', name: 'Organic Cotton T-Shirt', category: 'Apparel', salesVolume: 800, views: 3200, conversionRate: 25, stock: 80, imageUrl: 'https://via.placeholder.com/40' },
  { id: 'PROD003', name: 'Smart Fitness Tracker', category: 'Electronics', salesVolume: 2200, views: 7500, conversionRate: 29, stock: 50, imageUrl: 'https://via.placeholder.com/40' },
  { id: 'PROD004', name: 'Reusable Shopping Bag Set', category: 'Home Goods', salesVolume: 500, views: 1800, conversionRate: 28, stock: 200, imageUrl: 'https://via.placeholder.com/40' },
  { id: 'PROD005', name: 'Natural Soap Bar', category: 'Beauty', salesVolume: 1200, views: 4000, conversionRate: 30, stock: 0, imageUrl: 'https://via.placeholder.com/40' },
];

const chartConfig = {
  salesVolume: { label: "Sales Volume", color: "hsl(var(--chart-1))" },
  views: { label: "Views", color: "hsl(var(--chart-2))" },
};

const ProductsAnalyticsPage = () => {
  console.log('ProductsAnalyticsPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailDialogOpen(true);
  };
  
  const getStockBadgeVariant = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 20) return 'secondary'; // Using secondary for low stock (like warning)
    return 'default';
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 flex-grow">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 grid auto-rows-max items-start gap-4 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Products Analytics</CardTitle>
              <CardDescription>Analyze product performance, sales, and stock levels.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataGridToolbar
                onSearch={setSearchTerm}
                searchPlaceholder="Search by Product Name or Category..."
                showAddNewButton={false} // No "Add New" for analytics page
                showExportButton={true}
                onExport={() => console.log("Exporting products analytics...")}
                 filterOptions={[
                    {label: "In Stock", value: "in_stock", checked: true},
                    {label: "Low Stock", value: "low_stock", checked: false},
                    {label: "Out of Stock", value: "out_of_stock", checked: false},
                ]}
                onFilterChange={(value, checked) => console.log("Filter change:", value, checked)}
                showFilterButton={true}
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Sales Volume</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Conversion %</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="40"
                          src={product.imageUrl || `https://via.placeholder.com/40?text=${product.name.substring(0,2)}`}
                          width="40"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.salesVolume}</TableCell>
                      <TableCell>{product.views}</TableCell>
                      <TableCell>{product.conversionRate}%</TableCell>
                      <TableCell>
                        <Badge variant={getStockBadgeVariant(product.stock)}>{product.stock > 0 ? product.stock : 'Out of Stock'}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleViewDetails(product)} title="View Details">
                          <PackageSearch className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                   {paginatedProducts.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center h-24">No products found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            {totalPages > 1 && (
                <CardFooter className="flex justify-end">
                     <Pagination>
                        <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(e) => {e.preventDefault(); setCurrentPage(p => Math.max(1, p-1))}} isActive={currentPage > 1} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                            <PaginationLink href="#" onClick={(e) => {e.preventDefault(); setCurrentPage(i+1)}} isActive={currentPage === i+1}>
                                {i + 1}
                            </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext href="#" onClick={(e) => {e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p+1))}} isActive={currentPage < totalPages} />
                        </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products (Sales Volume)</CardTitle>
              <CardDescription>Visual representation of product sales.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={sampleProducts.slice(0, 5)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickFormatter={(value) => value.substring(0,15) + (value.length > 15 ? "..." : "")} tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis dataKey="salesVolume" stroke="hsl(var(--chart-1))" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="salesVolume" fill="hsl(var(--chart-1))" radius={4} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Product Detail Dialog (Placeholder) */}
      {selectedProduct && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Product Details: {selectedProduct.name}</DialogTitle>
              <DialogDescription>
                Category: {selectedProduct.category} | Stock: {selectedProduct.stock}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p><strong>ID:</strong> {selectedProduct.id}</p>
              <p><strong>Sales Volume:</strong> {selectedProduct.salesVolume}</p>
              <p><strong>Views:</strong> {selectedProduct.views}</p>
              <p><strong>Conversion Rate:</strong> {selectedProduct.conversionRate}%</p>
              <p className="text-sm text-muted-foreground mt-2">
                This is a placeholder for more detailed product analytics.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductsAnalyticsPage;