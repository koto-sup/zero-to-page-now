
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";

interface LocationInputsProps {
  startLocation: string;
  destination: string;
  onStartLocationChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

const LocationInputs: React.FC<LocationInputsProps> = ({
  startLocation,
  destination,
  onStartLocationChange,
  onDestinationChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="startLocation">موقع الانطلاق</Label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="startLocation"
                className="pr-10"
                placeholder="أدخل موقع الانطلاق"
                value={startLocation}
                onChange={(e) => onStartLocationChange(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="destination">الوجهة</Label>
            <div className="relative">
              <Navigation className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="destination"
                className="pr-10"
                placeholder="أدخل الوجهة"
                value={destination}
                onChange={(e) => onDestinationChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationInputs;
