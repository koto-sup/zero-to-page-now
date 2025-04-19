
import React from "react";
import { useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import BottomNavbar from "./BottomNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Check if the current page is login or register
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";
  
  // Get translations based on current language
  const translations = {
    copyright: language === 'en' 
      ? "© 2025 Zakart. All rights reserved." 
      : "© 2025 زكرت. جميع الحقوق محفوظة.",
    tagline: language === 'en'
      ? "Connecting refrigerated trucks with customers."
      : "ربط الشاحنات المبردة بالعملاء."
  };
  
  return (
    <div 
      className={`flex flex-col min-h-screen ${
        theme === 'dark' 
          ? 'bg-gray-950 text-gray-100' 
          : 'bg-white text-black'
      }`} 
      dir={language === 'en' ? "ltr" : "rtl"}
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
              <p>{translations.copyright}</p>
              <p className="mt-1">{translations.tagline}</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
