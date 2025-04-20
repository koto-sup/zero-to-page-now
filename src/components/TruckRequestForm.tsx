
import React, { useEffect } from "react";
import LocationInputs from "@/components/truck-request/LocationInputs";
import TruckTypeSelector from "@/components/TruckTypeSelector";
import TripDetails from "@/components/truck-request/TripDetails";
import { useTruckRequestForm } from "@/hooks/useTruckRequestForm";
import { RequestDetails } from "@/hooks/useTruckFinderState";
import { useTruckTypes } from "@/hooks/useTruckTypes";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TruckRequestFormProps {
  onRequestSubmitted: (details: RequestDetails) => void;
  discountApplied?: boolean;
}

const TruckRequestForm: React.FC<TruckRequestFormProps> = ({
  onRequestSubmitted,
  discountApplied = false
}) => {
  const {
    formState,
    handleStartLocationChange,
    handleDestinationChange,
    handleTruckTypeChange,
    handleDaysChange,
    handleTruckSizeChange,
    handleExcavatorHeadChange,
    handleFlatbedDeliveryOptionChange,
    handleRefrigeratedOptionChange,
    handleSubmit,
    setMapSelectionMode
  } = useTruckRequestForm({
    discountApplied,
    onRequestSubmitted
  });

  const { language } = useLanguage();
  const { getTruckTypes } = useTruckTypes();
  const selectedTruckType = getTruckTypes().find(truck => truck.id === formState.truckType);
  const hasKmPricing = selectedTruckType?.hasKmPricing || false;

  // Check if the selected truck type requires map-only selection
  const isMapOnlySelectionType = (truckTypeId: string) => {
    return ["jcp", "water-truck", "wheel-excavator", "crawler-excavator", 
            "loader-lowbed", "jcb-forklift", "asphalt-paving-small", 
            "asphalt-paving-big", "generator-repair", "hydraulic-crane", 
            "basket-winch"].includes(truckTypeId);
  };

  useEffect(() => {
    // Update the map selection mode when truck type changes
    setMapSelectionMode(isMapOnlySelectionType(formState.truckType));
  }, [formState.truckType, setMapSelectionMode]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {!formState.mapSelectionMode ? (
            <LocationInputs 
              startLocation={formState.startLocation}
              destination={formState.destination}
              onStartLocationChange={handleStartLocationChange}
              onDestinationChange={handleDestinationChange}
            />
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center">
              <MapPin className="text-blue-500 mr-3" size={24} />
              <div>
                <h3 className="font-medium">
                  {language === 'en' ? "Map Selection Required" : "اختيار من الخريطة مطلوب"}
                </h3>
                <p className="text-sm text-blue-700">
                  {language === 'en' 
                    ? "Please drop a pin on the map to select your location" 
                    : "الرجاء وضع علامة على الخريطة لتحديد موقعك"
                  }
                </p>
                <Button 
                  variant="outline"
                  className="mt-2 bg-white hover:bg-white"
                  onClick={() => window.alert("Map selection feature would open here")}
                >
                  {language === 'en' ? "Open Map" : "فتح الخريطة"}
                </Button>
              </div>
            </div>
          )}

          <TruckTypeSelector 
            selectedTruckType={formState.truckType}
            onTruckTypeChange={handleTruckTypeChange}
          />
        </div>

        <TripDetails
          distance={formState.distance}
          truckType={formState.truckType}
          estimatedPrice={formState.estimatedPrice}
          discountApplied={discountApplied}
          loading={formState.loading}
          hasKmPricing={hasKmPricing}
          onSubmit={handleSubmit}
          onDaysChange={handleDaysChange}
          onTruckSizeChange={handleTruckSizeChange}
          onExcavatorHeadChange={handleExcavatorHeadChange}
          onFlatbedDeliveryOptionChange={handleFlatbedDeliveryOptionChange}
          onRefrigeratedOptionChange={handleRefrigeratedOptionChange}
        />
      </div>
    </form>
  );
};

export default TruckRequestForm;
