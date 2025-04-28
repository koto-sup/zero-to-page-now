
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
  onBackButtonClick?: () => void;
}

const TruckRequestForm: React.FC<TruckRequestFormProps> = ({
  onRequestSubmitted,
  discountApplied = false,
  initialStep = 1,
  onStepChange,
  onBackButtonClick
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
    
    // Auto-advance to map selection when truck type is selected
    if (formState.truckType !== "" && currentStep === 1) {
      // Small delay for better UX
      setTimeout(() => setCurrentStep(2), 300);
    }
  }, [formState.truckType, setMapSelectionMode, currentStep]);

  // Translation helper
  const t = (en: string, ar: string) => language === 'en' ? en : ar;

  if (currentStep === 1) {
    return (
      <form className="space-y-6">
        {/* Step 1: Vehicle Type Selection */}
        <TruckTypeSelector 
          selectedTruckType={formState.truckType}
          onTruckTypeChange={handleTruckTypeChange}
        />
      </form>
    );
  }

  if (currentStep === 2) {
    // Map selection step - moved directly to main component
    return null;
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
        </div>
      </form>
    );
  }

  // Fallback (shouldn't happen)
  return (
    <div className="text-center p-4 dark:text-white">
      <p>{t("Loading...", "جاري التحميل...")}</p>
      <Button onClick={() => setCurrentStep(1)} className="mt-4">
        {t("Start Over", "البدء من جديد")}
      </Button>
    </div>
  );
};

export default TruckRequestForm;
