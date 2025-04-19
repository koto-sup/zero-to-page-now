
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Moon, 
  Sun, 
  UserCircle, 
  Bell,
  MapPin,
  Truck,
  Layout,
  Menu
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const AppNavbar = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "طلب جديد" },
    { id: 2, text: "تحديث حالة الشحنة" }
  ]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <header className="fixed top-0 right-0 left-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-foreground">زكرت</div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/find-trucks"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm"
            >
              <Truck className="h-4 w-4" />
              {language === "en" ? "Find Trucks" : "البحث عن شاحنات"}
            </Link>
            <Link
              to="/track"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm"
            >
              <MapPin className="h-4 w-4" />
              {language === "en" ? "Track" : "تتبع"}
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm"
            >
              <Layout className="h-4 w-4" />
              {language === "en" ? "Dashboard" : "لوحة التحكم"}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full bg-background text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user && (
            <Link to="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background text-foreground relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background text-foreground"
                >
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  {language === "en" ? "Profile" : "الملف الشخصي"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  {language === "en" ? "Settings" : "الإعدادات"}
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                    {language === "en" ? "Admin Dashboard" : "لوحة تحكم المسؤول"}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                {language === "en" ? "Login" : "تسجيل الدخول"}
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden bg-background text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
