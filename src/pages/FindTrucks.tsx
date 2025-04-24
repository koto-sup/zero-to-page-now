import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TruckRequestForm from "@/components/TruckRequestForm";
import TruckOffersList from "@/components/TruckOffersList";
import TruckFinderHeader from "@/components/truck-finder/TruckFinderHeader";
import TruckDiscountInfo from "@/components/truck-finder/TruckDiscountInfo";
import { useTruckFinderState, RequestDetails } from "@/hooks/useTruckFinderState";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import { useLanguage } from "@/contexts/LanguageContext";
import TruckMap from "@/components/TruckMap";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showSideMenu, setShowSideMenu] = useState(false);

  // Reset to step 1 when component mounts
  useEffect(() => {
    setCurrentStep(1);
    setRequestSubmitted(false);
  }, [setRequestSubmitted]);

  const handleAcceptOffer = (offerId: string) => {
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
      setRequestSubmitted(false);
      setCurrentStep(2);
    } else {
      navigate('/dashboard');
    }
  };

  const t = (en: string, ar: string) => language === 'en' ? en : ar;

  return (
    <div className="min-h-screen bg-background">
      {currentStep === 2 ? (
        <div className="fixed inset-0 z-50">
          <TruckMap 
            interactive={true} 
            onLocationSelect={(lat, lng) => {
              setSelectedLocation({ lat, lng });
              handleRequestSubmitted({
                startLocation: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
                destination: `Destination (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
                distance: 5,
                estimatedPrice: 100,
                truckType: "refrigerated",
                selectedMapLocation: { lat, lng }
              });
              setCurrentStep(3);
            }}
            fullScreen={true}
          />
        </div>
      ) : (
        <Layout>
          <div className="container mx-auto px-4 py-8 pb-24">
            {!requestSubmitted ? (
              <>
                <TruckFinderHeader 
                  pageTitle={getPageTitle()}
                  description={getTruckTypesDescription()}
                  hasDiscount={hasDiscount}
                  couponApplied={couponApplied}
                  applyCoupon={applyCoupon}
                  requestSubmitted={requestSubmitted}
                  hideLanguageButton={false}
                />
                <div className="mt-6">
                  <TruckRequestForm 
                    onRequestSubmitted={handleRequestSubmitted}
                    discountApplied={couponApplied}
                    initialStep={currentStep}
                    onStepChange={setCurrentStep}
                    onBackButtonClick={handleBackToVehicle}
                  />
                </div>
              </>
            ) : (
              <div className="pt-16">
                <TruckOffersList 
                  offers={offers} 
                  requestDetails={requestDetails!} 
                  onAcceptOffer={handleAcceptOffer} 
                  discountApplied={couponApplied}
                  acceptedOfferId={acceptedOfferId}
                />
              </div>
            )}
            
            {!requestSubmitted && !showSideMenu && (
              <TruckDiscountInfo
                hasDiscount={hasDiscount}
                couponApplied={couponApplied}
                applyCoupon={applyCoupon}
                requestSubmitted={requestSubmitted}
              />
            )}
          </div>
        </Layout>
      )}
    </div>
  );
};

export default FindTrucks;
