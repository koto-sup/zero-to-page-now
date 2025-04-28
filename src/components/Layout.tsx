
import React, { useState, useEffect } from "react";
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  
  // Check if the current page is login or register
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";
    
  // Check if we're on a chat page
  const isChatPage = location.pathname.includes('/chat/');
  
  // Control header visibility based on scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Hide header when scrolling down, show when scrolling up
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      
      // Cleanup
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  
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
        <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${!showHeader ? '-translate-y-full' : ''}`}>
          <AppNavbar />
        </div>
      )}
      
      <main className={`flex-grow ${!isAuthPage ? "pt-20 pb-20" : ""} w-full max-w-7xl mx-auto px-4 sm:px-6 overflow-x-hidden`}>
        {children}
      </main>
      
      {!isAuthPage && user && (
        <BottomNavbar />
      )}
      
      {/* Footer only shows on non-auth pages and non-chat pages */}
      {!isAuthPage && !isChatPage && (
        <footer className={`${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-background border-gray-200'
        } border-t py-6 mt-auto`}>
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
