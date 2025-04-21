
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Map } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  theme: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle, theme }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const location = useLocation();

  const getNavigationLinks = () => {
    const commonLinks = [
      { 
        name: language === 'en' ? "Home" : "الرئيسية", 
        href: "/" 
      },
      { 
        name: language === 'en' ? "Find Trucks" : "البحث عن شاحنات", 
        href: "/find-trucks" 
      },
      { 
        name: language === 'en' ? "Track" : "تتبع", 
        href: user ? "/truck-tracking/driver-1" : "/login" 
      },
      {
        name: language === 'en' ? "Map" : "خريطة",
        href: "/map",
        icon: Map
      }
    ];
    
    if (user) {
      commonLinks.push({ 
        name: language === 'en' ? "Messages" : "الرسائل", 
        href: "/chat" 
      });
      
      if (user.role === "driver") {
        commonLinks.push({ 
          name: language === 'en' ? "Dashboard" : "لوحة التحكم", 
          href: "/dashboard" 
        });
      } else if (user.role === "admin") {
        commonLinks.push({ 
          name: language === 'en' ? "Admin" : "المشرف", 
          href: "/admin-dashboard" 
        });
      }
    }
    
    return commonLinks;
  };

  return (
    <>
      <div className="flex md:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onToggle}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-50">
          <div className={`px-2 pt-2 pb-3 space-y-1 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-900 text-white' 
              : 'bg-white text-black'
          }`}>
            {getNavigationLinks().map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "text-moprd-teal relative shadow-glow-sm"
                      : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
                  }`}
                  onClick={onToggle}
                >
                  {link.icon && <link.icon className="inline mr-2 h-4 w-4" />}
                  {link.name}
                </Link>
              );
            })}
            {!user && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
                onClick={onToggle}
              >
                {language === 'en' ? "Login" : "تسجيل الدخول"}
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
