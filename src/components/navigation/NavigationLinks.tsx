import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavigationLinksProps, NavigationLink } from "@/types/navigation";

const NavigationLinks: React.FC<NavigationLinksProps> = ({ className }) => {
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
    <nav className={`hidden md:flex space-x-4 md:space-x-8 ${className}`}>
      {getNavigationLinks().map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={`px-3 py-2 text-sm font-medium ${
            location.pathname === link.href
              ? "text-moprd-teal"
              : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationLinks;
