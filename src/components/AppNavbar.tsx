import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import NavigationLinks from "@/components/navigation/NavigationLinks";
import UserMenu from "@/components/navigation/UserMenu";
import MobileMenu from "@/components/navigation/MobileMenu";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppNavbarProps {
  className?: string;
}

const AppNavbar: React.FC<AppNavbarProps> = ({ className }) => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <header className={`fixed w-full top-0 z-50 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800 text-white' 
        : 'bg-white border-gray-200 text-black'
    } border-b shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <MobileMenu 
            isOpen={isMenuOpen} 
            onToggle={() => setIsMenuOpen(!isMenuOpen)} 
            theme={theme || 'light'} 
          />
  
          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-moprd-teal">
                {language === 'ar' ? "زكرت" : "Zakart"}
              </span>
            </Link>
          </div>
  
          <NavigationLinks />
  
          {/* Right side actions */}
          <div className="flex items-center">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
