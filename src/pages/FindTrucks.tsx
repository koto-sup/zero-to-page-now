
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import TruckRequestForm from "@/components/TruckRequestForm";
import TruckOffersList from "@/components/TruckOffersList";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";

interface RequestDetails {
  startLocation: string;
  destination: string;
  distance: number;
  estimatedPrice: number;
}

interface TruckOffer {
  id: string;
  driverId: string;
  driverName: string;
  distance: number;
  rating: number;
  price: number;
  estimatedArrival: string;
  truckType: string;
}

const FindTrucks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(null);
  const [offers, setOffers] = useState<TruckOffer[]>([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    // Check if user has made at least 2 orders for discount eligibility
    if (user) {
      // In a real app, this would be fetched from the backend
      const previousOrders = 2; // Simulated previous orders count
      setHasDiscount(previousOrders >= 2);
    }
  }, [user]);

  useEffect(() => {
    if (requestSubmitted && requestDetails) {
      // محاكاة استلام عروض من السائقين
      const timer = setTimeout(() => {
        const mockOffers: TruckOffer[] = [
          {
            id: "offer-1",
            driverId: "driver-1",
            driverName: "خالد السائق",
            distance: 1.2,
            rating: 4.8,
            price: requestDetails.estimatedPrice - 10,
            estimatedArrival: "10 دقائق",
            truckType: "refrigerated"
          },
          {
            id: "offer-2",
            driverId: "driver-2",
            driverName: "محمد السائق",
            distance: 2.4,
            rating: 4.5,
            price: requestDetails.estimatedPrice - 5,
            estimatedArrival: "15 دقيقة",
            truckType: "transport"
          },
          {
            id: "offer-3",
            driverId: "driver-3",
            driverName: "أحمد السائق",
            distance: 3.7,
            rating: 4.9,
            price: requestDetails.estimatedPrice + 15,
            estimatedArrival: "5 دقائق",
            truckType: "crane"
          }
        ];
        
        setOffers(mockOffers);
        
        toast.success("لديك عروض جديدة!", {
          description: "تم استلام 3 عروض من السائقين القريبين"
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [requestSubmitted, requestDetails]);

  const handleRequestSubmitted = (details: RequestDetails) => {
    setRequestDetails(details);
    setRequestSubmitted(true);
  };

  const handleAcceptOffer = (offerId: string, rentalDuration: string = "day") => {
    // في تطبيق حقيقي، سنقوم بإرسال قبول العرض إلى الخادم
    // وإنشاء محادثة مع السائق

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
  
  const applyCoupon = () => {
    if (hasDiscount && !couponApplied) {
      setCouponApplied(true);
      toast.success("تم تطبيق الكوبون بنجاح!", {
        description: "ستحصل على خصم 15% عند إتمام الطلب"
      });
    } else if (!hasDiscount) {
      toast.error("ليس لديك خصم متاح", {
        description: "يمكنك الحصول على خصم 15% بعد إتمام طلبين"
      });
    } else {
      toast.info("تم تطبيق الكوبون بالفعل");
    }
  };

  const getTruckTypesDescription = () => {
    switch (language) {
      case 'en':
        return "Choose your departure and destination to get offers from various truck types available";
      case 'ar':
      default:
        return "اختر موقع الانطلاق والوجهة للحصول على عروض من مختلف أنواع الشاحنات المتاحة";
    }
  };

  const getPageTitle = () => {
    switch (language) {
      case 'en':
        return "Find Trucks";
      case 'ar':
      default:
        return "البحث عن شاحنات";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{getPageTitle()}</h1>
          <p className="text-gray-600">
            {getTruckTypesDescription()}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasDiscount && !requestSubmitted && (
            <Button 
              onClick={applyCoupon}
              variant="outline"
              className={`${couponApplied ? 'bg-green-100 border-green-500' : ''} ml-2`}
            >
              {couponApplied ? 'تم تطبيق الخصم (15%)' : 'تطبيق كوبون الخصم'}
            </Button>
          )}
          <LanguageSelector />
        </div>
      </div>

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
      
      {!requestSubmitted && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-blue-700 text-sm border border-blue-200">
          <h3 className="font-semibold mb-2">معلومات الخصم:</h3>
          <p>بعد إتمام طلبين، يمكنك الحصول على خصم 15% على طلبك التالي عند استخدام كوبون الخصم.</p>
          {hasDiscount && (
            <p className="mt-2 font-medium">
              أنت مؤهل للحصول على خصم! يمكنك استخدام كوبون الخصم الآن.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindTrucks;
