
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

  // Update the map selection mode when truck type changes
  useEffect(() => {
    if (formState.truckType !== "") {
      setMapSelectionMode(isMapOnlySelectionType(formState.truckType));
    }
  }, [formState.truckType, setMapSelectionMode]);

  // Translation helper
  const t = (en: string, ar: string) => language === 'en' ? en : ar;

  if (currentStep === 1) {
    return (
      <form className="space-y-6">
        {/* Step 1: Vehicle Type Selection */}
        <TruckTypeSelector 
          selectedTruckType={formState.truckType}
          onTruckTypeChange={(value) => {
            handleTruckTypeChange(value);
            setCurrentStep(2);  // Automatically move to step 2 after selection
          }}
        />
      </form>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          className="mb-4" 
          onClick={() => setCurrentStep(1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("Back to truck selection", "العودة إلى اختيار الشاحنة")}
        </Button>
        
        <LocationInputs 
          startLocation={formState.startLocation}
          destination={formState.destination}
          onStartLocationChange={handleStartLocationChange}
          onDestinationChange={handleDestinationChange}
        />

        <div className="flex justify-center mt-6">
          <Button 
            onClick={() => setCurrentStep(3)} 
            className="px-8"
            disabled={!formState.startLocation || !formState.destination}
          >
            {t("Continue", "متابعة")}
          </Button>
        </div>

        {/* Map visualization (smaller size, not interactive) */}
        <div className="mt-6 h-48 rounded-lg overflow-hidden">
          <TruckMap interactive={false} />
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <form onSubmit={handleSubmit}>
        <Button 
          type="button"
          variant="outline" 
          className="mb-4" 
          onClick={() => setCurrentStep(2)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("Back to location selection", "العودة إلى اختيار الموقع")}
        </Button>

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
