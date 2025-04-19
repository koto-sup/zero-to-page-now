
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Home, 
  Truck, 
  MessageSquare, 
  User,
} from "lucide-react";

const BottomNavbar = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 dark:bg-background dark:border-border">
      <nav className="flex items-center justify-around h-16">
        <Link
          to="/"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
        >
          <Home size={20} />
          <span className="text-xs mt-1">الرئيسية</span>
        </Link>
        
        <Link
          to={user.role === "customer" ? "/find-trucks" : "/dashboard"}
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
        >
          <Truck size={20} />
          <span className="text-xs mt-1">{user.role === "customer" ? "شاحنات" : "رحلات"}</span>
        </Link>
        
        <Link
          to="/chat"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
        >
          <MessageSquare size={20} />
          <span className="text-xs mt-1">الرسائل</span>
        </Link>
        
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
        >
          <User size={20} />
          <span className="text-xs mt-1">حسابي</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
