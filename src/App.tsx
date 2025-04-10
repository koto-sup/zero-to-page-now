
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import { ThemeProvider } from 'next-themes';

// Import all pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import FindTrucks from "./pages/FindTrucks";
import TruckDetails from "./pages/TruckDetails";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import Profile from "./pages/Profile";
import CustomerSupport from "./pages/CustomerSupport";
import TruckTracking from "./pages/TruckTracking";

// Import custom navbar
import AppNavbar from "./components/AppNavbar";

// Initialize CSS classes for our icy UI components
import "./styles/icy-theme.css";

const queryClient = new QueryClient();

// Create explicit TooltipProvider
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/find-trucks" element={<FindTrucks />} />
                  <Route path="/truck-details" element={<TruckDetails />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/chat/:driverId" element={<Chat />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/invoice-details/:id" element={<InvoiceDetail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/bookings" element={<CustomerDashboard />} />
                  <Route path="/support" element={<CustomerSupport />} />
                  <Route path="/truck-tracking" element={<TruckTracking />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
