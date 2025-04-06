
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Star, MapPin } from "lucide-react";

interface TruckCardProps {
  id: string;
  driverName: string;
  truckModel: string;
  refrigerationCapacity: string;
  rating: number;
  distance: number;
  image: string;
  isAvailable: boolean;
  onRequestQuote: () => void;
}

const TruckCard: React.FC<TruckCardProps> = ({
  id,
  driverName,
  truckModel,
  refrigerationCapacity,
  rating,
  distance,
  image,
  isAvailable,
  onRequestQuote,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={`${truckModel} by ${driverName}`}
          className="w-full h-full object-cover"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <Badge className="bg-red-500 text-white text-lg font-semibold px-3 py-1">
              Not Available
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{truckModel}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="text-sm font-medium text-muted-foreground mb-1">
          Driver: {driverName}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center text-sm">
            <Snowflake className="h-4 w-4 text-moprd-light mr-1" />
            <span>{refrigerationCapacity}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-moprd-teal mr-1" />
            <span>{distance} miles away</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/20 pt-2">
        <Button 
          onClick={onRequestQuote} 
          disabled={!isAvailable}
          className="w-full bg-moprd-teal hover:bg-moprd-blue disabled:opacity-60"
        >
          Request Quote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TruckCard;
