
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
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

const BottomNavbar = () => {
  const { user } = useAuth();
  const { language, changeLanguage } = useLanguage();
  
  if (!user) {
    return null;
  }

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

  const handleLanguageChange = (code: string) => {
    console.log("Changing language to:", code);
    // Ensure we're only accepting valid language codes
    if (languages.some(lang => lang.code === code)) {
      changeLanguage(code as any);
      // No page reload - the context will update the UI
    }
  };

  const current = getCurrentLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <nav className="flex items-center justify-around h-16">
        <Link
          to="/"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal"
        >
          <Home size={20} />
          <span className="text-xs mt-1">{language === "en" ? "Home" : "الرئيسية"}</span>
        </Link>
        
        <Link
          to={user.role === "customer" ? "/find-trucks" : "/dashboard"}
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal"
        >
          <Truck size={20} />
          <span className="text-xs mt-1">{user.role === "customer" ? (language === "en" ? "Trucks" : "شاحنات") : (language === "en" ? "Trips" : "رحلات")}</span>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal">
              <Globe size={20} />
              <span className="text-xs mt-1">{language === "en" ? "Language" : "اللغة"}</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-64">
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-lg font-medium mb-4">{language === "en" ? "Select Language" : "اختر اللغة"}</h3>
              <div className="w-full max-w-xs">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={language === "en" ? "Select language" : "اختر اللغة"} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
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
          <span className="text-xs mt-1">{language === "en" ? "Messages" : "الرسائل"}</span>
        </Link>
        
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-moprd-teal"
        >
          <User size={20} />
          <span className="text-xs mt-1">{language === "en" ? "Profile" : "حسابي"}</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
