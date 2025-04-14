
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Settings, 
  HelpCircle, 
  Info, 
  Contact, 
  Activity,
  UserCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Link to="/">
              <Button variant="ghost">الرئيسية</Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/activity" className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    <span>النشاط</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>الإعدادات</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/help" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>المساعدة</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" className="flex items-center">
                    <Info className="mr-2 h-4 w-4" />
                    <span>من نحن</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact" className="flex items-center">
                    <Contact className="mr-2 h-4 w-4" />
                    <span>اتصل بنا</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
