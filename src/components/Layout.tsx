
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
    <div 
      className={`flex flex-col min-h-screen ${
        theme === 'dark' 
          ? 'bg-gray-950 text-gray-100' 
          : 'bg-white text-black'
      }`} 
      dir="rtl"
    >
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
        <footer className={`${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-background border-gray-200'
        } border-t py-6`}>
          <div className="container mx-auto px-4">
            <div className={`text-center text-sm ${
              theme === 'dark' 
                ? 'text-gray-400' 
                : 'text-muted-foreground'
            }`}>
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
