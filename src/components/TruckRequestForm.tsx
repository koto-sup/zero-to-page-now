
import React, { useEffect, useState } from "react";
import LocationInputs from "@/components/truck-request/LocationInputs";
import TruckTypeSelector from "@/components/TruckTypeSelector";
import TripDetails from "@/components/truck-request/TripDetails";
import { useTruckRequestForm } from "@/hooks/useTruckRequestForm";
import { RequestDetails } from "@/hooks/useTruckFinderState";
import { useTruckTypes } from "@/hooks/useTruckTypes";
import { Button } from "@/components/ui/button";
import { MapPin, Check, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TruckMap from "@/components/TruckMap";

interface TruckRequestFormProps {
  onRequestSubmitted: (details: RequestDetails) => void;
  discountApplied?: boolean;
  initialStep?: number;
  onStepChange?: (step: number) => void;
}

const TruckRequestForm: React.FC<TruckRequestFormProps> = ({
  onRequestSubmitted,
  discountApplied = false,
  initialStep = 1,
  onStepChange
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
    handleMapLocationSelect,
    setMapSelectionMode
  } = useTruckRequestForm({
    discountApplied,
    onRequestSubmitted
  });

  const { language } = useLanguage();
  const { getTruckTypes } = useTruckTypes();
  const selectedTruckType = getTruckTypes().find(truck => truck.id === formState.truckType);
  const hasKmPricing = selectedTruckType?.hasKmPricing || false;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [showLocationMap, setShowLocationMap] = useState(false);

  // Pass step changes to parent if callback provided
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

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

  // Determine if current section is complete
  const isTruckTypeSelected = formState.truckType !== "";
  const isLocationComplete = formState.mapSelectionMode 
    ? formState.selectedMapLocation !== undefined 
    : (formState.startLocation && formState.destination);

  // Progress to next step
  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go back to previous step
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // For auto-progress when vehicle type is selected
  useEffect(() => {
    if (currentStep === 1 && isTruckTypeSelected) {
      // Small delay for better UX if they tap a radio directly
      setTimeout(() => setCurrentStep(2), 300);
    }
    // eslint-disable-next-line
  }, [formState.truckType]);

  // Handle map location selection
  const onMapLocationSelect = (lat: number, lng: number) => {
    handleMapLocationSelect(lat, lng);
    setShowLocationMap(false);
  };

  // Improved: allow both manual entry and map selection for destination
  const [destinationByMap, setDestinationByMap] = useState<{ lat: number; lng: number } | null>(null);
  const [showDestinationMap, setShowDestinationMap] = useState(false);

  // Handle destination map pick
  const handleDestinationMapSelect = (lat: number, lng: number) => {
    setDestinationByMap({ lat, lng });
    handleDestinationChange(`Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    setShowDestinationMap(false);
  };

  // Translation helper
  const t = (en: string, ar: string) => language === 'en' ? en : ar;

  if (currentStep === 1) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
        {/* Step 1: Vehicle Type Selection */}
        <div className="space-y-6">
          <TruckTypeSelector 
            selectedTruckType={formState.truckType}
            onTruckTypeChange={(value) => {
              handleTruckTypeChange(value);
              // Auto-advance to next step managed by useEffect
            }}
          />
        </div>
      </form>
    );
  }

  if (currentStep === 3) {
    return (
      <form onSubmit={handleSubmit}>
        {/* Step 3: Trip Details */}
        <div className="space-y-6">
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
          
          <div className="flex justify-start">
            <Button 
              type="button" 
              onClick={goToPrevStep}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("Back", "رجوع")}
            </Button>
          </div>
        </div>
      </form>
    );
  }

  return null; // Step 2 is handled by the parent component with full map view
};

export default TruckRequestForm;
