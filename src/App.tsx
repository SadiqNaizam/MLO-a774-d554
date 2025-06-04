import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import ProductsAnalyticsPage from "./pages/ProductsAnalyticsPage";
import CustomersListPage from "./pages/CustomersListPage";
import AnalyticsReportsPage from "./pages/AnalyticsReportsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/orders" element={<OrdersManagementPage />} />
          <Route path="/products" element={<ProductsAnalyticsPage />} />
          <Route path="/customers" element={<CustomersListPage />} />
          <Route path="/analytics" element={<AnalyticsReportsPage />} />
          
          {/* Placeholder for other routes like settings, login, etc. */}
          {/* <Route path="/settings" element={<div>Settings Page</div>} /> */}
          {/* <Route path="/login" element={<div>Login Page</div>} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;