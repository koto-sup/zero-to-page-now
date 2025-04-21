
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import FindTrucks from "./pages/FindTrucks";
import TruckTracking from "./pages/TruckTracking";
import TruckDetails from "./pages/TruckDetails";
import Activity from "./pages/Activity";
import Help from "./pages/Help";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";
import CustomerSupport from "./pages/CustomerSupport";
import Chat from "./pages/Chat";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import EditProfile from "./pages/EditProfile";
import { ChatMessagesProvider } from "./components/chat/SaveTrackingMessages";
import Map from "./pages/Map"; // We'll create this page

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <BrowserRouter>
            <ChatMessagesProvider>
              <LayoutWrapper>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/find-trucks" element={<FindTrucks />} />
                  <Route path="/truck-tracking/:driverId" element={<TruckTracking />} />
                  <Route path="/truck-details" element={<TruckDetails />} />
                  <Route path="/activity" element={<Activity />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/customer-support" element={<CustomerSupport />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/chat/:driverId" element={<Chat />} />
                  <Route path="/notifications" element={<Activity />} /> {/* Redirect notifications to Activity page */}
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/invoice/:id" element={<InvoiceDetail />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </LayoutWrapper>
            </ChatMessagesProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
