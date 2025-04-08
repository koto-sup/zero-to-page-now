
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import TruckMap from "@/components/TruckMap";

interface Truck {
  id: string;
  driverName: string;
  truckModel: string;
  distance: number;
  available: boolean;
}

interface NearbyTrucksSectionProps {
  nearbyTrucks: Truck[];
}

const NearbyTrucksSection: React.FC<NearbyTrucksSectionProps> = ({ nearbyTrucks }) => {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <MapPin className="ml-2 h-5 w-5 text-moprd-teal" />
          شاحنات قريبة منك
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full relative rounded-md overflow-hidden mb-4">
          <TruckMap />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {nearbyTrucks.map((truck) => (
            <div key={truck.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div>
                <div className="font-medium">{truck.driverName}</div>
                <div className="text-sm text-gray-500">{truck.truckModel} • {truck.distance} كم</div>
              </div>
              <Badge className={truck.available ? "bg-green-500" : "bg-red-500"}>
                {truck.available ? "متاح" : "غير متاح"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyTrucksSection;
