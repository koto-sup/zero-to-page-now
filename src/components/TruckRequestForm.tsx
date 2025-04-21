import React, { useEffect, useState } from "react";
import LocationInputs from "@/components/truck-request/LocationInputs";
import TruckTypeSelector from "@/components/TruckTypeSelector";
import TripDetails from "@/components/truck-request/TripDetails";
import { useTruckRequestForm } from "@/hooks/useTruckRequestForm";
import { RequestDetails } from "@/hooks/useTruckFinderState";
import { useTruckTypes } from "@/hooks/useTruckTypes";
import { Button } from "@/components/ui/button";
import { MapPin, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TruckMap from "@/components/TruckMap";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [showLocationMap, setShowLocationMap] = useState(false);

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

  // Handle map location selection
  const onMapLocationSelect = (lat: number, lng: number) => {
    handleMapLocationSelect(lat, lng);
    setShowLocationMap(false);
  };

  // Translation helper
  const t = (en: string, ar: string) => language === 'en' ? en : ar;

  // For auto-progress when vehicle type is selected
  useEffect(() => {
    if (currentStep === 1 && isTruckTypeSelected) {
      // Small delay for better UX if they tap a radio directly
      setTimeout(() => setCurrentStep(2), 300);
    }
    // eslint-disable-next-line
  }, [formState.truckType]);

  // Improved: allow both manual entry and map selection for destination
  const [destinationByMap, setDestinationByMap] = useState<{ lat: number; lng: number } | null>(null);
  const [showDestinationMap, setShowDestinationMap] = useState(false);

  // Handle destination map pick
  const handleDestinationMapSelect = (lat: number, lng: number) => {
    setDestinationByMap({ lat, lng });
    handleDestinationChange(`Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    setShowDestinationMap(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Progress Steps Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div 
            className={`flex flex-col items-center ${currentStep >= 1 ? 'text-moprd-teal' : 'text-gray-400'}`}
            onClick={() => setCurrentStep(1)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-moprd-teal text-white shadow-[0_0_10px_rgba(0,200,200,0.5)]' : 'bg-gray-200 text-gray-600'
            }`}>
              {isTruckTypeSelected ? <Check size={20} /> : 1}
            </div>
            <span className="mt-2 text-sm">{t("Vehicle", "المركبة")}</span>
          </div>
          
          <div className={`flex-grow h-0.5 mx-2 ${currentStep >= 2 ? 'bg-moprd-teal' : 'bg-gray-200'}`}></div>
          
          <div 
            className={`flex flex-col items-center ${currentStep >= 2 ? 'text-moprd-teal' : 'text-gray-400'}`}
            onClick={() => isTruckTypeSelected && setCurrentStep(2)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-moprd-teal text-white shadow-[0_0_10px_rgba(0,200,200,0.5)]' : 'bg-gray-200 text-gray-600'
            }`}>
              {isLocationComplete && currentStep > 2 ? <Check size={20} /> : 2}
            </div>
            <span className="mt-2 text-sm">{t("Location", "الموقع")}</span>
          </div>
          
          <div className={`flex-grow h-0.5 mx-2 ${currentStep >= 3 ? 'bg-moprd-teal' : 'bg-gray-200'}`}></div>
          
          <div 
            className={`flex flex-col items-center ${currentStep >= 3 ? 'text-moprd-teal' : 'text-gray-400'}`}
            onClick={() => isLocationComplete && setCurrentStep(3)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? 'bg-moprd-teal text-white shadow-[0_0_10px_rgba(0,200,200,0.5)]' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
            <span className="mt-2 text-sm">{t("Details", "التفاصيل")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Step 1: Vehicle Type Selection */}
          <div className={currentStep === 1 ? 'block' : 'hidden'}>
            <TruckTypeSelector 
              selectedTruckType={formState.truckType}
              onTruckTypeChange={(value) => {
                handleTruckTypeChange(value);
              }}
            />
            
            {/* Removed Continue button here (auto step) */}
          </div>
          
          {/* Step 2: Location Selection */}
          <div className={currentStep === 2 ? 'block' : 'hidden'}>
            {/* Enhanced: allow manual entry or picking destination from map */}
            <div className="bg-gradient-to-br from-moprd-teal/10 via-white to-blue-50/60 p-4 rounded-lg border flex flex-col gap-4">
              <h3 className="font-semibold mb-2">{t("Destination", "الوجهة")}</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  variant={destinationByMap ? "default" : "outline"}
                  className="w-full md:w-auto flex-1"
                  onClick={e => { e.preventDefault(); setShowDestinationMap(val => !val); }}
                  type="button"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {destinationByMap
                    ? t("Change on Map", "تغيير من الخريطة")
                    : t("Pick on Map", "اختر من الخريطة")}
                </Button>
                <div className="flex-1">
                  <input
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-moprd-teal"
                    placeholder={t("Type destination or address", "اكتب الوجهة أو العنوان")}
                    value={formState.destination}
                    onChange={e => {
                      setDestinationByMap(null);
                      handleDestinationChange(e.target.value)
                    }}
                  />
                </div>
              </div>
              {showDestinationMap && (
                <div className="mt-2 rounded overflow-hidden border bg-white">
                  <TruckMap interactive onLocationSelect={handleDestinationMapSelect} />
                  <Button 
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => setShowDestinationMap(false)}
                    type="button"
                  >
                    {t("Close Map", "إغلاق الخريطة")}
                  </Button>
                </div>
              )}
              {destinationByMap && (
                <div className="mt-2 bg-white p-2 rounded shadow-sm text-sm text-moprd-teal">
                  {t("Selected: ", "المحدد: ")} {formState.destination}
                </div>
              )}
              <div className="flex flex-col md:flex-row justify-between gap-2 mt-4">
                <Button 
                  type="button" 
                  onClick={goToPrevStep}
                  variant="outline"
                >← {t("Back", "رجوع")}</Button>
                <Button 
                  type="button"
                  onClick={goToNextStep}
                  disabled={!formState.destination && !destinationByMap}
                  className="bg-moprd-teal hover:bg-moprd-blue"
                >
                  {t("Continue", "استمرار")} →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Trip Details - Always visible on desktop, only visible on step 3 on mobile */}
        <div className={`space-y-6 ${currentStep === 3 ? 'block' : 'hidden md:block'}`}>
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
          
          {currentStep === 3 && (
            <div className="md:hidden mt-6 flex justify-start">
              <Button 
                type="button" 
                onClick={goToPrevStep}
                variant="outline"
              >
                ← {t("Back", "رجوع")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default TruckRequestForm;
