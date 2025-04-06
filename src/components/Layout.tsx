
import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

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
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? "flex-grow" : "flex-grow pt-4"}>
        {children}
      </main>
      {!isAuthPage && (
        <footer className="bg-white border-t py-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-sm text-gray-600">
              <p>&copy; 2025 MOPRD App. All rights reserved.</p>
              <p className="mt-1">Connecting refrigerated trucks with customers.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
