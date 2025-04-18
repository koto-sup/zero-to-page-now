
import React from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if the current page is login or register
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/register";
  
  // Don't show back button on home page
  const showBackButton = location.pathname !== "/" && !isAuthPage;
  
  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      {!isAuthPage && (
        <div className="sticky top-0 z-50 bg-background border-b">
          <Navbar />
          {showBackButton && (
            <div className="container mx-auto px-4 py-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                رجوع
              </Button>
            </div>
          )}
        </div>
      )}
      
      <main className={isAuthPage ? "flex-grow" : "flex-grow pt-4"}>
        {children}
      </main>
      
      {!isAuthPage && (
        <footer className="bg-white border-t py-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-sm text-gray-600">
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
