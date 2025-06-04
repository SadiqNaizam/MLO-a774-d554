import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DataGridToolbar from '@/components/DataGridToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilePenIcon, Trash2Icon, EyeIcon } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: { itemName: string; quantity: number; price: number }[];
}

const sampleOrders: Order[] = [
  { id: 'ORD001', customerName: 'Alice Wonderland', date: '2024-07-20', status: 'Delivered', total: 120.50, items: [{ itemName: 'Wireless Mouse', quantity: 1, price: 25.00 }, { itemName: 'Keyboard', quantity: 1, price: 75.50 }] },
  { id: 'ORD002', customerName: 'Bob The Builder', date: '2024-07-21', status: 'Processing', total: 85.00, items: [{ itemName: 'USB Hub', quantity: 1, price: 30.00 }, { itemName: 'Cable Ties (100pcs)', quantity: 1, price: 10.00 }] },
  { id: 'ORD003', customerName: 'Charlie Brown', date: '2024-07-21', status: 'Pending', total: 45.99, items: [{ itemName: 'Desk Lamp', quantity: 1, price: 45.99 }] },
  { id: 'ORD004', customerName: 'Diana Prince', date: '2024-07-22', status: 'Shipped', total: 250.00, items: [{ itemName: 'Monitor 27"', quantity: 1, price: 250.00 }] },
  { id: 'ORD005', customerName: 'Edward Scissorhands', date: '2024-07-22', status: 'Cancelled', total: 60.75, items: [{ itemName: 'Gaming Mousepad', quantity: 1, price: 20.25 }] },
];

const OrdersManagementPage = () => {
  console.log('OrdersManagementPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10; // Example, adjust as needed

  const filteredOrders = sampleOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    // For a real app, you'd populate a form here
    setIsFormDialogOpen(true);
     console.log("Edit order:", order.id);
  };

  const handleDeleteOrder = (orderId: string) => {
    // For a real app, show confirmation and call API
    console.log("Delete order:", orderId);
    alert(`Order ${orderId} would be deleted.`);
  };
  
  const handleAddNewOrder = () => {
    setSelectedOrder(null); // Clear selection for new order
    setIsFormDialogOpen(true);
  };

  const getBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'default'; // 'success' variant is not standard in shadcn/ui Badge
      case 'Processing': return 'secondary'; // 'warning' variant is not standard
      case 'Pending': return 'outline';
      case 'Shipped': return 'default'; // Using default for shipped as well
      case 'Cancelled': return 'destructive';
      default: return 'default';
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
              <CardTitle>Orders Management</CardTitle>
              <CardDescription>View, search, and manage customer orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataGridToolbar
                onSearch={setSearchTerm}
                searchPlaceholder="Search by Order ID or Customer..."
                onAddNew={handleAddNewOrder}
                showExportButton={true}
                onExport={() => console.log("Exporting orders...")}
                filterOptions={[
                    {label: "Pending", value: "pending", checked: false},
                    {label: "Processing", value: "processing", checked: false},
                    {label: "Shipped", value: "shipped", checked: false},
                    {label: "Delivered", value: "delivered", checked: true},
                ]}
                onFilterChange={(value, checked) => console.log("Filter change:", value, checked)}
                showFilterButton={true}
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell><Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge></TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleViewDetails(order)} title="View Details">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditOrder(order)} title="Edit Order">
                          <FilePenIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteOrder(order.id)} title="Delete Order">
                          <Trash2Icon className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {paginatedOrders.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">No orders found.</TableCell>
                </TableRow>
              )}
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
        </main>
      </div>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Customer: {selectedOrder.customerName} | Date: {selectedOrder.date} | Status: <Badge variant={getBadgeVariant(selectedOrder.status)}>{selectedOrder.status}</Badge>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h4 className="font-semibold mb-2">Items:</h4>
              <ul>
                {selectedOrder.items.map(item => (
                  <li key={item.itemName} className="flex justify-between">
                    <span>{item.itemName} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add/Edit Order Form Dialog (Placeholder) */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedOrder ? 'Edit Order' : 'Add New Order'}</DialogTitle>
            <DialogDescription>
              {selectedOrder ? `Modify details for order ${selectedOrder.id}.` : 'Enter details for the new order.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This is a placeholder for the order form. In a real application, this would contain input fields for order details.
            </p>
            {selectedOrder && <p>Editing Order: {selectedOrder.id}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { console.log("Saving order..."); setIsFormDialogOpen(false); }}>Save Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersManagementPage;