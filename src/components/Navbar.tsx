
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  UserCircle, 
  LogOut, 
  MessageSquare, 
  TruckIcon, 
  PackageSearch,
  BarChart3,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white sticky top-0 shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="flex items-center mr-4">
              <TruckIcon
                size={32}
                className="text-moprd-teal mr-2"
                strokeWidth={2.5}
              />
              <span className="font-bold text-2xl text-moprd-blue">زكرت</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "customer" && (
                <Link to="/find-trucks">
                  <Button variant="ghost" className="flex items-center">
                    <PackageSearch className="mr-2 h-4 w-4" />
                    البحث عن شاحنات
                  </Button>
                </Link>
              )}
              
              {user.role === "driver" && (
                <Link to="/dashboard">
                  <Button variant="ghost" className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    لوحة التحكم
                  </Button>
                </Link>
              )}
              
              <Link to="/chat">
                <Button variant="ghost" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  الرسائل
                </Button>
              </Link>
              
              <Link to="/invoices">
                <Button variant="ghost" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  الفواتير
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <UserCircle className="mr-2 h-5 w-5" />
                    {user.name}
                    <ChevronDown className="mr-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "driver" && (
                    <DropdownMenuItem asChild>
                      <Link to="/truck-details" className="cursor-pointer w-full">
                        تفاصيل الشاحنة
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="cursor-pointer w-full">
                      حجوزاتي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                    <LogOut className="ml-2 h-4 w-4" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">تسجيل الدخول</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-moprd-teal hover:bg-moprd-blue">إنشاء حساب</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
