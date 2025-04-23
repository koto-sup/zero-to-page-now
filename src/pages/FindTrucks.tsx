
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
import Layout from "@/components/Layout";

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
    applyCoupon,
    setRequestSubmitted 
  } = useTruckFinderState();
  
  const { getPageTitle, getTruckTypesDescription } = useLanguageContent();
  const [acceptedOfferId, setAcceptedOfferId] = useState<string | undefined>();
  const [currentStep, setCurrentStep] = useState(1); // Always start from step 1
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);

  // Reset to step 1 when component mounts
  useEffect(() => {
    setCurrentStep(1);
    setRequestSubmitted(false);
  }, []);

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
            dismissible: true,
            position: "top-right"
          }
        );
      }
      
      toast.success(
        language === 'en' ? "Offer accepted!" : "تم قبول العرض!", 
        {
          description: language === 'en'
            ? `The driver will arrive in approximately ${selectedOffer.estimatedArrival}`
            : `سيصلك السائق خلال ${selectedOffer.estimatedArrival} تقريباً`,
          dismissible: true,
          position: "top-right"
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

  // Going back to the vehicle selection or previous screen
  const handleBackToVehicle = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (requestSubmitted) {
      // If offers are showing, go back to location selection
      setRequestSubmitted(false);
      setCurrentStep(2);
    } else {
      // If no state to go back to, navigate to dashboard
      navigate('/dashboard');
    }
  };

  // Handle location selection from map
  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({lat, lng});
    
    // Toast notification for feedback - positioned in top-right by default
    toast.success(
      language === 'en' ? "Location selected!" : "تم تحديد الموقع!",
      { 
        position: "top-right",
        dismissible: true 
      }
    );
  };

  // Handle the "Find Trucks" action
  const handleFindTrucks = () => {
    if (selectedLocation) {
      // Create request details
      const locationDetails: RequestDetails = {
        startLocation: `Location (${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)})`,
        destination: `Destination (${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)})`,
        distance: 5,  // Mock distance
        estimatedPrice: 100, // Will be calculated in handler
        truckType: "refrigerated", // Default
        selectedMapLocation: selectedLocation
      };
      
      // Submit the request
      handleRequestSubmitted(locationDetails);
      // Move to next step (showing offers)
      setCurrentStep(3);
    } else {
      toast.error(
        language === 'en' ? "Please select a location" : "الرجاء اختيار موقع",
        { 
          position: "top-right",
          dismissible: true 
        }
      );
    }
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
    findTrucks: language === 'en' ? "Find Trucks" : "البحث عن شاحنات",
    searchForDestination: language === 'en' ? "Search for a destination" : "البحث عن وجهة",
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Fixed header with step indicator */}
        <div className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 z-30 shadow-md">
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
            ) : requestSubmitted ? (
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="mr-2 p-2"
                  onClick={handleBackToVehicle}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-medium">
                  {language === 'en' ? "Available Trucks" : "الشاحنات المتاحة"}
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
              <div className="relative h-[70vh] z-10">
                <div className="h-full w-full">
                  <TruckMap 
                    interactive={true} 
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
                {/* Semi-transparent overlay at bottom with action button */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pt-32 pb-6 px-4">
                  <Button 
                    className="w-full bg-moprd-teal hover:bg-moprd-teal/90 text-white"
                    onClick={handleFindTrucks}
                    disabled={!selectedLocation}
                  >
                    {translations.findTrucks}
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
                onBackButtonClick={handleBackToVehicle}
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
    </Layout>
  );
};

export default FindTrucks;
