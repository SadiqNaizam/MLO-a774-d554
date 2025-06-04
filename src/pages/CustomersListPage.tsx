import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DataGridToolbar from '@/components/DataGridToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EyeIcon, UserPlus } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  registrationDate: string;
  avatarUrl?: string;
}

const sampleCustomers: Customer[] = [
  { id: 'CUST001', name: 'Alice Johnson', email: 'alice.j@example.com', totalOrders: 5, totalSpent: 350.00, registrationDate: '2023-01-15', avatarUrl: 'https://i.pravatar.cc/40?u=alice' },
  { id: 'CUST002', name: 'Robert Smith', email: 'robert.s@example.com', totalOrders: 12, totalSpent: 1250.75, registrationDate: '2022-11-20', avatarUrl: 'https://i.pravatar.cc/40?u=robert' },
  { id: 'CUST003', name: 'Maria Garcia', email: 'maria.g@example.com', totalOrders: 2, totalSpent: 99.50, registrationDate: '2024-03-10', avatarUrl: 'https://i.pravatar.cc/40?u=maria' },
  { id: 'CUST004', name: 'David Miller', email: 'david.m@example.com', totalOrders: 8, totalSpent: 670.20, registrationDate: '2023-05-01' }, // No avatar
  { id: 'CUST005', name: 'Linda Brown', email: 'linda.b@example.com', totalOrders: 1, totalSpent: 25.00, registrationDate: '2024-06-25', avatarUrl: 'https://i.pravatar.cc/40?u=linda' },
];

const CustomersListPage = () => {
  console.log('CustomersListPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCustomers = sampleCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailDialogOpen(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsFormDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 flex-grow">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Customers List</CardTitle>
              <CardDescription>View and manage customer information.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataGridToolbar
                onSearch={setSearchTerm}
                searchPlaceholder="Search by Name or Email..."
                onAddNew={handleAddCustomer}
                showExportButton={true}
                onExport={() => console.log("Exporting customers...")}
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{customer.registrationDate}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleViewDetails(customer)} title="View Details">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                   {paginatedCustomers.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center h-24">No customers found.</TableCell>
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
        </main>
      </div>

      {/* Customer Detail Dialog */}
      {selectedCustomer && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Customer Details: {selectedCustomer.name}</DialogTitle>
              <DialogDescription>
                Email: {selectedCustomer.email} | Registered: {selectedCustomer.registrationDate}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p><strong>ID:</strong> {selectedCustomer.id}</p>
              <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
              <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent.toFixed(2)}</p>
              {/* Add more details or order history preview here */}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Customer Form Dialog (Placeholder) */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter the details for the new customer.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This is a placeholder for the customer creation form. In a real application, this would include input fields for name, email, etc.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { console.log("Saving customer..."); setIsFormDialogOpen(false); }}>Save Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersListPage;