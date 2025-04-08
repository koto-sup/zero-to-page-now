
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindTrucks from "./pages/FindTrucks";
import TruckDetails from "./pages/TruckDetails";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/find-trucks" element={<FindTrucks />} />
              <Route path="/truck-details" element={<TruckDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:driverId" element={<Chat />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoice-details/:id" element={<InvoiceDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<CustomerDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
