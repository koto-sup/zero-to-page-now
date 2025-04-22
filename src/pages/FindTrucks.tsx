
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TruckRequestForm from "@/components/TruckRequestForm";
import TruckOffersList from "@/components/TruckOffersList";
import TruckFinderHeader from "@/components/truck-finder/TruckFinderHeader";
import TruckDiscountInfo from "@/components/truck-finder/TruckDiscountInfo";
import { useTruckFinderState, RequestDetails, TruckOffer } from "@/hooks/useTruckFinderState";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import { useLanguage } from "@/contexts/LanguageContext";
import TruckMap from "@/components/TruckMap";
import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const FindTrucks = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { 
    requestSubmitted, 
    requestDetails, 
    offers, 
    hasDiscount, 
    couponApplied, 
    handleRequestSubmitted, 
    applyCoupon 
  } = useTruckFinderState();
  
  const { getPageTitle, getTruckTypesDescription } = useLanguageContent();
  const [acceptedOfferId, setAcceptedOfferId] = useState<string | undefined>();
  const [mapSelectionMode, setMapSelectionMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleAcceptOffer = (offerId: string, rentalDuration: string = "day") => {
    // In a real app, we would send the offer acceptance to the server
    // and create a conversation with the driver
    
    const selectedOffer = offers.find(offer => offer.id === offerId);
    if (selectedOffer) {
      // Set the accepted offer
      setAcceptedOfferId(offerId);
      
      // Apply discount if eligible and coupon applied
      if (hasDiscount && couponApplied) {
        toast.success(
          language === 'en' ? "18% discount applied to your order!" : "تم تطبيق خصم 18% على طلبك!", 
          {
            description: language === 'en'
              ? "Thank you for using Zakart"
              : "شكراً لاستخدامك زكرت",
            dismissible: true
          }
        );
      }
      
      toast.success(
        language === 'en' ? "Offer accepted!" : "تم قبول العرض!", 
        {
          description: language === 'en'
            ? `The driver will arrive in approximately ${selectedOffer.estimatedArrival}`
            : `سيصلك السائق خلال ${selectedOffer.estimatedArrival} تقريباً`,
          dismissible: true
        }
      );
      
      // Generate a stable order number
      const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      localStorage.setItem('lastOrderNumber', orderNumber);
      
      // Redirect to tracking page instead of chat with delay to show toast
      setTimeout(() => {
        navigate(`/truck-tracking/${selectedOffer.driverId}`);
      }, 1500);
    }
  };

  // Going back to the vehicle selection
  const handleBackToVehicle = () => {
    setCurrentStep(1);
  };

  // Hide language selector in this page
  const hideLanguageButton = requestSubmitted;

  const translations = {
    pageTitle: language === 'en' ? "Find Available Trucks" : getPageTitle(),
    description: language === 'en' 
      ? "Find refrigerated trucks, flatbeds, and other specialized vehicles." 
      : getTruckTypesDescription(),
    selectOnMap: language === 'en' ? "Select Location on Map" : "اختر الموقع من الخريطة",
    back: language === 'en' ? "Back" : "رجوع",
    vehicleSelection: language === 'en' ? "Vehicle Selection" : "اختيار المركبة",
    locationSelection: language === 'en' ? "Location Selection" : "تحديد الموقع",
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      {/* Fixed header with step indicator */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-30 shadow-md">
        <div className="container mx-auto px-4 py-3">
          {currentStep === 2 ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="mr-2 p-2"
                onClick={handleBackToVehicle}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-medium">
                {translations.locationSelection}
              </h1>
            </div>
          ) : (
            <TruckFinderHeader 
              pageTitle={translations.pageTitle}
              description={translations.description}
              hasDiscount={hasDiscount}
              couponApplied={couponApplied}
              applyCoupon={applyCoupon}
              requestSubmitted={requestSubmitted}
              hideLanguageButton={hideLanguageButton}
            />
          )}
        </div>
      </div>

      {/* Main content with margin top to accommodate fixed header */}
      <div className="mt-24">
        {!requestSubmitted ? (
          currentStep === 2 ? (
            /* Full map view in step 2 (Location selection) */
            <div className="fixed inset-0 z-20 pt-16 pb-16">
              <div className="h-full w-full">
                <TruckMap 
                  interactive={true} 
                  onLocationSelect={(lat, lng) => {
                    // Here we would handle location selection
                    toast.success(
                      language === 'en' ? "Location selected!" : "تم اختيار الموقع!"
                    );
                    setCurrentStep(3); // Move to next step after selection
                  }}
                />
              </div>
              {/* Semi-transparent overlay at bottom with action button */}
              <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pt-32 pb-6 px-4">
                <Button 
                  className="w-full bg-moprd-teal hover:bg-moprd-teal/90 text-white"
                  onClick={() => setCurrentStep(3)}
                >
                  {language === 'en' ? "Continue" : "متابعة"}
                </Button>
              </div>
            </div>
          ) : (
            /* Step 1 or 3: TruckRequestForm */
            <TruckRequestForm 
              onRequestSubmitted={handleRequestSubmitted}
              discountApplied={couponApplied}
              initialStep={currentStep}
              onStepChange={setCurrentStep}
            />
          )
        ) : (
          /* Show offers after request is submitted */
          <TruckOffersList 
            offers={offers} 
            requestDetails={requestDetails!} 
            onAcceptOffer={handleAcceptOffer} 
            discountApplied={couponApplied}
            acceptedOfferId={acceptedOfferId}
          />
        )}
      </div>
      
      {/* Only show discount info when not in the map view */}
      {currentStep !== 2 && (
        <TruckDiscountInfo
          hasDiscount={hasDiscount}
          couponApplied={couponApplied}
          applyCoupon={applyCoupon}
          requestSubmitted={requestSubmitted}
        />
      )}
    </div>
  );
};

export default FindTrucks;
