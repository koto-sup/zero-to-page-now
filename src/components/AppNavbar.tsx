
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Moon, Sun, UserCircle, LogOut, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import LanguageSelector from "@/components/LanguageSelector";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-moprd-teal dark:text-cyan-400">زكرت</div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/find-trucks"
              className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors text-sm"
            >
              البحث عن شاحنات
            </Link>
            {user?.role === "driver" ? (
              <Link
                to="/dashboard"
                className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors text-sm"
              >
                لوحة التحكم
              </Link>
            ) : (
              <Link
                to="/customer-dashboard"
                className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors text-sm"
              >
                لوحة التحكم
              </Link>
            )}
            <Link
              to="/invoices"
              className="text-moprd-blue hover:text-moprd-teal dark:text-gray-300 dark:hover:text-white transition-colors text-sm"
            >
              الفواتير
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                className="rounded-full"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                تسجيل الدخول
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
