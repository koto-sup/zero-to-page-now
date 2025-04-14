
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          <div className="flex space-x-4">
            <Link to="/about">
              <Button variant="ghost">من نحن</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">اتصل بنا</Button>
            </Link>
            <Link to="/help">
              <Button variant="ghost">المساعدة</Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost">الإعدادات</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
