
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TruckRequestForm from "@/components/TruckRequestForm";
import TruckOffersList from "@/components/TruckOffersList";
import TruckFinderHeader from "@/components/truck-finder/TruckFinderHeader";
import TruckDiscountInfo from "@/components/truck-finder/TruckDiscountInfo";
import { useTruckFinderState, RequestDetails, TruckOffer } from "@/hooks/useTruckFinderState";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import { useLanguage } from "@/contexts/LanguageContext";

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

  // Hide language selector in this page
  const hideLanguageButton = requestSubmitted;

  const translations = {
    pageTitle: language === 'en' ? "Find Available Trucks" : getPageTitle(),
    description: language === 'en' 
      ? "Find refrigerated trucks, flatbeds, and other specialized vehicles." 
      : getTruckTypesDescription()
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <TruckFinderHeader 
        pageTitle={translations.pageTitle}
        description={translations.description}
        hasDiscount={hasDiscount}
        couponApplied={couponApplied}
        applyCoupon={applyCoupon}
        requestSubmitted={requestSubmitted}
        hideLanguageButton={hideLanguageButton}
      />

      {!requestSubmitted ? (
        <TruckRequestForm 
          onRequestSubmitted={handleRequestSubmitted} 
          discountApplied={couponApplied} 
        />
      ) : (
        <TruckOffersList 
          offers={offers} 
          requestDetails={requestDetails!} 
          onAcceptOffer={handleAcceptOffer} 
          discountApplied={couponApplied}
          acceptedOfferId={acceptedOfferId}
        />
      )}
      
      <TruckDiscountInfo
        hasDiscount={hasDiscount}
        couponApplied={couponApplied}
        applyCoupon={applyCoupon}
        requestSubmitted={requestSubmitted}
      />
    </div>
  );
};

export default FindTrucks;
