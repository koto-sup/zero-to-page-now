
import React from "react";
import { useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import BottomNavbar from "./BottomNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { theme } = useTheme();
  
  // Check if the current page is login or register
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";
  
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-black'}`} dir="rtl">
      {!isAuthPage && (
        <AppNavbar />
      )}
      
      <main className={`flex-grow ${!isAuthPage ? "pt-20 pb-20" : ""} w-full max-w-7xl mx-auto px-4 sm:px-6`}>
        {children}
      </main>
      
      {!isAuthPage && user && (
        <BottomNavbar />
      )}
      
      {!isAuthPage && (
        <footer className="bg-background border-t py-6 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2025 زكرت. جميع الحقوق محفوظة.</p>
              <p className="mt-1">ربط الشاحنات المبردة بالعملاء.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
