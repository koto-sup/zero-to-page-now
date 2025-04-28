
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Home, 
  Truck, 
  MessageSquare, 
  LayoutDashboard,
} from "lucide-react";

const BottomNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { language } = useLanguage();
  
  if (!user) {
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  // Get translations based on current language
  const translations = {
    home: language === 'en' ? "Home" : "الرئيسية",
    trucks: language === 'en' ? "Trucks" : "شاحنات",
    dashboard: language === 'en' ? "Dashboard" : "لوحة التحكم",
    messages: language === 'en' ? "Messages" : "الرسائل",
    track: language === 'en' ? "Track" : "تتبع"
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 dark:bg-gray-900 dark:border-gray-800">
      <nav className="flex items-center justify-around h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/") 
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold dark:text-accent" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-accent"
          }`}
        >
          <Home size={20} className={isActive("/") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.home}</span>
        </Link>
        
        <Link
          to="/find-trucks"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/find-trucks")
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold dark:text-accent" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-accent"
          }`}
        >
          <Truck size={20} className={isActive("/find-trucks") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.trucks}</span>
        </Link>
        
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/dashboard")
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold dark:text-accent" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-accent"
          }`}
        >
          <LayoutDashboard size={20} className={isActive("/dashboard") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.dashboard}</span>
        </Link>
        
        <Link
          to="/truck-tracking/driver-1"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.includes("/truck-tracking")
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold dark:text-accent" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-accent"
          }`}
        >
          <Truck size={20} className={location.pathname.includes("/truck-tracking") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.track}</span>
        </Link>
        
        <Link
          to="/chat"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.includes("/chat")
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold dark:text-accent" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-accent"
          }`}
        >
          <MessageSquare size={20} className={location.pathname.includes("/chat") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.messages}</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
