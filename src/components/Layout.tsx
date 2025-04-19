
import React from "react";
import { useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import BottomNavbar from "./BottomNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Check if the current page is login or register
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/register";
  
  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      {!isAuthPage && (
        <AppNavbar />
      )}
      
      <main className={`flex-grow ${!isAuthPage ? "pt-20 pb-20" : ""}`}>
        {children}
      </main>
      
      {!isAuthPage && (
        <>
          <BottomNavbar />
          <footer className="bg-background border-t py-6">
            <div className="container mx-auto px-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>&copy; 2025 زكرت. جميع الحقوق محفوظة.</p>
                <p className="mt-1">ربط الشاحنات المبردة بالعملاء.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Layout;
