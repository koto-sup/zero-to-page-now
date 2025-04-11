
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TruckRequestForm from "@/components/TruckRequestForm";
import TruckOffersList from "@/components/TruckOffersList";
import TruckFinderHeader from "@/components/truck-finder/TruckFinderHeader";
import TruckDiscountInfo from "@/components/truck-finder/TruckDiscountInfo";
import { useTruckFinderState, RequestDetails, TruckOffer } from "@/hooks/useTruckFinderState";
import { useLanguageContent } from "@/hooks/useLanguageContent";

const FindTrucks = () => {
  const navigate = useNavigate();
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

  const handleAcceptOffer = (offerId: string, rentalDuration: string = "day") => {
    // In a real app, we would send the offer acceptance to the server
    // and create a conversation with the driver
    
    const selectedOffer = offers.find(offer => offer.id === offerId);
    if (selectedOffer) {
      // Apply discount if eligible and coupon applied
      if (hasDiscount && couponApplied) {
        toast.success("تم تطبيق خصم 15% على طلبك!", {
          description: "شكراً لاستخدامك زكرت"
        });
      }
      
      toast.success("تم قبول العرض!", {
        description: `سيصلك السائق خلال ${selectedOffer.estimatedArrival} تقريباً`
      });
      
      // Redirect to tracking page instead of chat
      navigate(`/truck-tracking/${selectedOffer.driverId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <TruckFinderHeader 
        pageTitle={getPageTitle()}
        description={getTruckTypesDescription()}
        hasDiscount={hasDiscount}
        couponApplied={couponApplied}
        applyCoupon={applyCoupon}
        requestSubmitted={requestSubmitted}
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
