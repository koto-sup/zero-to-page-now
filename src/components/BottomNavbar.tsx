
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Truck, 
  MessageSquare, 
  FileText, 
  User,
  Globe,
  ChevronUp
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BottomNavbarProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ onLanguageChange, currentLanguage }) => {
  const { user } = useAuth();
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  
  if (!user) {
    return null;
  }

  const languages = [
    { value: "ar", label: "العربية" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "es", label: "Español" },
    { value: "ur", label: "اردو" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <nav className="flex items-center justify-around h-16">
        <Link
          to="/"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal"
        >
          <Home size={20} />
          <span className="text-xs mt-1">الرئيسية</span>
        </Link>
        
        <Link
          to={user.role === "customer" ? "/find-trucks" : "/dashboard"}
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal"
        >
          <Truck size={20} />
          <span className="text-xs mt-1">{user.role === "customer" ? "شاحنات" : "رحلات"}</span>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal">
              <Globe size={20} />
              <span className="text-xs mt-1">اللغة</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-64">
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-lg font-medium mb-4">اختر اللغة</h3>
              <div className="w-full max-w-xs">
                <Select value={currentLanguage} onValueChange={onLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <Link
          to="/chat"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal"
        >
          <MessageSquare size={20} />
          <span className="text-xs mt-1">الرسائل</span>
        </Link>
        
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal"
        >
          <User size={20} />
          <span className="text-xs mt-1">حسابي</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
