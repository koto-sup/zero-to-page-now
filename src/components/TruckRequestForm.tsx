
import React, { useEffect, useState } from "react";
import LocationInputs from "@/components/truck-request/LocationInputs";
import TruckTypeSelector from "@/components/TruckTypeSelector";
import TripDetails from "@/components/truck-request/TripDetails";
import { useTruckRequestForm } from "@/hooks/useTruckRequestForm";
import { RequestDetails } from "@/hooks/useTruckFinderState";
import { useTruckTypes } from "@/hooks/useTruckTypes";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TruckMap from "@/components/TruckMap";
import { toast } from "sonner";

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
  const [mapSelectingFor, setMapSelectingFor] = useState<'start' | 'destination' | null>(null);

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

  // Handle map location selection
  const handleLocationFromMap = (lat: number, lng: number) => {
    if (mapSelectingFor === 'start') {
      handleStartLocationChange(`${language === 'en' ? 'Location' : 'موقع'} (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      toast.success(language === 'en' ? 'Start location selected!' : 'تم تحديد موقع البداية!');
    } else if (mapSelectingFor === 'destination') {
      handleDestinationChange(`${language === 'en' ? 'Destination' : 'الوجهة'} (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      toast.success(language === 'en' ? 'Destination selected!' : 'تم تحديد الوجهة!');
    }
    setMapSelectingFor(null);
  };

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

  if (mapSelectingFor) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setMapSelectingFor(null)}
            className="text-lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t("Back", "رجوع")}
          </Button>
          <div className="text-lg font-medium">
            {mapSelectingFor === 'start' 
              ? t("Select Start Location", "تحديد موقع البداية")
              : t("Select Destination", "تحديد الوجهة")
            }
          </div>
          <div className="w-10"></div> {/* Empty div for spacing */}
        </div>
        
        {/* Full-screen map */}
        <div className="absolute inset-0 pt-16">
          <TruckMap 
            interactive={true} 
            fullScreen={true}
            onLocationSelect={handleLocationFromMap}
          />
        </div>
      </div>
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">{t("Set Your Locations", "تحديد مواقعك")}</h3>
          
          <div className="space-y-6">
            {/* Start Location Button */}
            <div>
              <div className="text-sm font-medium mb-2">{t("Start Location", "موقع البداية")}</div>
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-3 text-left"
                onClick={() => setMapSelectingFor('start')}
              >
                {formState.startLocation ? (
                  <span>{formState.startLocation}</span>
                ) : (
                  <span className="text-gray-400">{t("Click to select start location on map", "انقر لتحديد موقع البداية على الخريطة")}</span>
                )}
              </Button>
            </div>
            
            {/* Destination Button */}
            <div>
              <div className="text-sm font-medium mb-2">{t("Destination", "الوجهة")}</div>
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-3 text-left"
                onClick={() => setMapSelectingFor('destination')}
              >
                {formState.destination ? (
                  <span>{formState.destination}</span>
                ) : (
                  <span className="text-gray-400">{t("Click to select destination on map", "انقر لتحديد الوجهة على الخريطة")}</span>
                )}
              </Button>
            </div>
          </div>

          {/* Trip Summary (if both locations are selected) */}
          {formState.startLocation && formState.destination && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2">{t("Trip Summary", "ملخص الرحلة")}</h4>
              <div className="flex justify-between">
                <span>{t("Distance", "المسافة")}</span>
                <span className="font-bold">{formState.distance} {t("km", "كم")}</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => setCurrentStep(3)} 
              className="px-8"
              disabled={!formState.startLocation || !formState.destination}
            >
              {t("Continue", "متابعة")}
            </Button>
          </div>
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
