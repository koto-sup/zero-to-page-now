
import React from "react";
import { 
  Snowflake,
  Droplets,
  Shovel,
  Construction,
  Truck,
  Forklift
} from "lucide-react";

interface IconProps {
  className?: string;
}

export const TruckIcons = {
  renderRefrigeratedIcon: () => (
    <div className="p-2 rounded-full bg-blue-100 flex items-center justify-center">
      <Snowflake className="h-6 w-6 text-blue-500" />
    </div>
  ),
  
  renderJCPIcon: () => (
    <div className="p-2 rounded-full bg-yellow-100 flex items-center justify-center">
      <Construction className="h-6 w-6 text-yellow-600" />
    </div>
  ),
  
  renderDumpTruckIcon: () => (
    <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center">
      <Truck className="h-6 w-6 text-gray-700" />
    </div>
  ),
  
  renderWaterTruckIcon: () => (
    <div className="p-2 rounded-full bg-cyan-100 flex items-center justify-center">
      <Droplets className="h-6 w-6 text-cyan-600" />
    </div>
  ),
  
  renderExcavatorIcon: () => (
    <div className="p-2 rounded-full bg-orange-100 flex items-center justify-center">
      <Shovel className="h-6 w-6 text-orange-600" />
    </div>
  ),
  
  renderDumpLoaderIcon: () => (
    <div className="p-2 rounded-full bg-amber-100 flex items-center justify-center">
      <Forklift className="h-6 w-6 text-amber-600" />
    </div>
  )
};
