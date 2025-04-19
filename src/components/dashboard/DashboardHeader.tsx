
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

interface DashboardHeaderProps {
  userName: string | undefined;
  greeting?: string; // Add this prop to match the usage in Dashboard.tsx
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, greeting }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {greeting && `${greeting}, `}{userName}
        </h1>
        <p className="text-gray-600">مرحبا بك في لوحة تحكم زكرت</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Link to="/find-trucks">
          <Button className="bg-moprd-teal hover:bg-moprd-blue">
            <Truck className="ml-2 h-4 w-4" />
            البحث عن شاحنات
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
