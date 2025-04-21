
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Home, 
  Truck, 
  MessageSquare, 
  Map,
} from "lucide-react";

const BottomNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { language } = useLanguage();
  
  if (!user) {
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Get translations based on current language
  const translations = {
    home: language === 'en' ? "Home" : "الرئيسية",
    trucks: language === 'en' ? "Trucks" : "شاحنات",
    trips: language === 'en' ? "Trips" : "رحلات",
    messages: language === 'en' ? "Messages" : "الرسائل",
    map: language === 'en' ? "Map" : "خريطة"
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 dark:bg-background dark:border-border">
      <nav className="flex items-center justify-around h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/") 
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
          }`}
        >
          <Home size={20} className={isActive("/") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.home}</span>
        </Link>
        
        <Link
          to={user.role === "customer" ? "/find-trucks" : "/dashboard"}
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive(user.role === "customer" ? "/find-trucks" : "/dashboard")
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
          }`}
        >
          <Truck size={20} className={isActive(user.role === "customer" ? "/find-trucks" : "/dashboard") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{user.role === "customer" ? translations.trucks : translations.trips}</span>
        </Link>
        
        <Link
          to="/chat"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.includes("/chat")
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
          }`}
        >
          <MessageSquare size={20} className={location.pathname.includes("/chat") ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.messages}</span>
        </Link>
        
        <Link
          to="/map"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname === "/map"
              ? "text-moprd-teal shadow-[0_-2px_8px_rgba(0,200,200,0.4)] font-bold" 
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
          }`}
        >
          <Map size={20} className={location.pathname === "/map" ? "filter drop-shadow-[0_0_2px_rgba(0,200,200,0.8)]" : ""} />
          <span className="text-xs mt-1">{translations.map}</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
