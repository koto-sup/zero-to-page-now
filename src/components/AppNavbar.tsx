
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Moon, 
  Sun, 
  UserCircle, 
  LogOut, 
  Menu, 
  Bell,
  MapPin,
  Truck 
} from "lucide-react";
import { useTheme } from "next-themes";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [notifications] = React.useState([
    { id: 1, text: "طلب جديد" },
    { id: 2, text: "تحديث حالة الشحنة" }
  ]);

  return (
    <header className="fixed top-0 right-0 left-0 bg-background border-b border-border z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">زكرت</div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/find-trucks"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm"
            >
              <Truck className="h-4 w-4" />
              البحث عن شاحنات
            </Link>
            <Link
              to="/truck-tracking"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm"
            >
              <MapPin className="h-4 w-4" />
              تتبع الشحنة
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
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

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

          {user ? (
            <>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background text-foreground"
                >
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                className="rounded-full bg-background text-foreground"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                تسجيل الدخول
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/find-trucks"
                className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                البحث عن شاحنات
              </Link>
              {user?.role === "driver" ? (
                <Link
                  to="/dashboard"
                  className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  لوحة التحكم
                </Link>
              ) : (
                <Link
                  to="/customer-dashboard"
                  className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  لوحة التحكم
                </Link>
              )}
              <Link
                to="/invoices"
                className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الفواتير
              </Link>
              {!user && (
                <Link
                  to="/login"
                  className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
