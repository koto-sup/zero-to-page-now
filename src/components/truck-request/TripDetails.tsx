
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TruckSizeOptions from "./TruckSizeOptions";
import ExcavatorHeadOptions from "./ExcavatorHeadOptions";
import FlatbedDeliveryOptions from "./FlatbedDeliveryOptions";
import RentalDaysSelect from "./RentalDaysSelect";
import TripSummary from "./TripSummary";
import RefrigeratedOptions from "./RefrigeratedOptions";

interface TripDetailsProps {
  distance: number;
  truckType: string;
  estimatedPrice: number;
  discountApplied?: boolean;
  loading: boolean;
  onSubmit: (e?: React.FormEvent) => void;
  onDaysChange?: (value: number) => void;
  onTruckSizeChange?: (value: string) => void;
  onExcavatorHeadChange?: (value: string) => void;
  onFlatbedDeliveryOptionChange?: (value: string) => void;
  onRefrigeratedOptionChange?: (value: string) => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({
  distance,
  truckType,
  estimatedPrice,
  discountApplied = false,
  loading,
  onSubmit,
  onDaysChange,
  onTruckSizeChange,
  onExcavatorHeadChange,
  onFlatbedDeliveryOptionChange,
  onRefrigeratedOptionChange
}) => {
  // Determine if this truck type has day-based pricing
  const isDayBasedPricing = ["jcp", "dump-truck", "dump-loader", "water-truck", "crawler-excavator", "wheel-excavator"].includes(truckType);

  // Determine if this truck requires special options
  const needsTruckSizeOptions = truckType === "dump-truck" || truckType === "dump-loader";
  const needsExcavatorHeadOptions = ["crawler-excavator", "wheel-excavator"].includes(truckType);
  const needsFlatbedOptions = truckType === "jcp";
  const needsRefrigeratedOptions = truckType === "refrigerated";

  // Get price label based on truck type
  const getPriceLabel = () => {
    if (truckType === "refrigerated") return "السعر التقديري (لكل كم):";
    if (isDayBasedPricing) return "السعر (لليوم الواحد):";
    return "السعر التقديري:";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">تفاصيل الرحلة</h3>
          
          <TripSummary
            distance={distance}
            truckType={truckType}
            estimatedPrice={estimatedPrice}
            discountApplied={discountApplied}
            getPriceLabel={getPriceLabel}
          />
          
          {needsTruckSizeOptions && onTruckSizeChange && (
            <TruckSizeOptions onTruckSizeChange={onTruckSizeChange} truckType={truckType} />
          )}
          
          {needsExcavatorHeadOptions && onExcavatorHeadChange && (
            <ExcavatorHeadOptions onExcavatorHeadChange={onExcavatorHeadChange} />
          )}
          
          {needsFlatbedOptions && onFlatbedDeliveryOptionChange && (
            <FlatbedDeliveryOptions onFlatbedDeliveryOptionChange={onFlatbedDeliveryOptionChange} />
          )}
          
          {needsRefrigeratedOptions && onRefrigeratedOptionChange && (
            <RefrigeratedOptions onRefrigeratedOptionChange={onRefrigeratedOptionChange} />
          )}
          
          {isDayBasedPricing && onDaysChange && (
            <RentalDaysSelect onDaysChange={onDaysChange} />
          )}
        </CardContent>
      </Card>
      
      <Button 
        type="submit" 
        className="w-full bg-moprd-teal hover:bg-moprd-blue h-12 text-lg"
        disabled={loading}
        onClick={(e) => onSubmit(e)}
      >
        {loading ? "جاري البحث..." : "البحث عن شاحنات"}
      </Button>
    </div>
  );
};

export default TripDetails;
