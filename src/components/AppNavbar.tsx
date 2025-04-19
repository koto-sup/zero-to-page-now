import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Custom navigation links based on user role
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
    
    // Only show these links if user is logged in
    if (user) {
      commonLinks.push(
        { 
          name: language === 'en' ? "Messages" : "الرسائل", 
          href: "/chat" 
        }
      );
      
      // Add role-specific links
      if (user.role === "driver") {
        commonLinks.push(
          { 
            name: language === 'en' ? "Dashboard" : "لوحة التحكم", 
            href: "/dashboard" 
          }
        );
      } else if (user.role === "admin") {
        commonLinks.push(
          { 
            name: language === 'en' ? "Admin" : "المشرف", 
            href: "/admin-dashboard" 
          }
        );
      }
    }
    
    return commonLinks;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={`fixed w-full top-0 z-50 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800 text-white' 
        : 'bg-white border-gray-200 text-black'
    } border-b shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
  
          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-moprd-teal">
                {language === 'ar' ? "زكرت" : "Zakart"}
              </span>
            </Link>
          </div>
  
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4 md:space-x-8">
            {getNavigationLinks().map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium ${
                  location.pathname === link.href
                    ? "text-moprd-teal"
                    : `text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal`
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
  
          {/* Right side actions */}
          <div className="flex items-center">
            {/* Theme toggle */}
            <ThemeToggle />
  
            {/* Language selector */}
            <LanguageSelector />
  
            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">{language === 'en' ? "Profile" : "الملف الشخصي"}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">{language === 'en' ? "Settings" : "الإعدادات"}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    {language === 'en' ? "Logout" : "تسجيل الخروج"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm" className="ml-4">
                <Link to="/login">{language === 'en' ? "Login" : "تسجيل الدخول"}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
  
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 ${
            theme === 'dark' 
              ? 'bg-gray-900 text-white' 
              : 'bg-white text-black'
          }`}>
            {getNavigationLinks().map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.href
                    ? "text-moprd-teal"
                    : "text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-moprd-teal dark:text-gray-300 dark:hover:text-moprd-teal"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'en' ? "Login" : "تسجيل الدخول"}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
