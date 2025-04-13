
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface RequestDetails {
  startLocation: string;
  destination: string;
  distance: number;
  estimatedPrice: number;
  truckType?: string;
  daysSelected?: number;
  truckSize?: string;
  excavatorHeadType?: string;
  flatbedDeliveryOption?: string;
}

export interface TruckOffer {
  id: string;
  driverId: string;
  driverName: string;
  distance: number;
  rating: number;
  price: number;
  estimatedArrival: string;
  truckType: string;
}

export const useTruckFinderState = () => {
  const { user } = useAuth();

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
        let mockOffers: TruckOffer[] = [];
        
        const validTruckTypes = ["refrigerated", "jcp", "dump-truck", "water-truck", "crawler-excavator", "wheel-excavator"];
        const truckType = validTruckTypes.includes(requestDetails.truckType || '') 
          ? requestDetails.truckType 
          : 'refrigerated';
        
        mockOffers = [
          {
            id: "offer-1",
            driverId: "driver-1",
            driverName: "خالد السائق",
            distance: 1.2,
            rating: 4.8,
            price: requestDetails.estimatedPrice - 10,
            estimatedArrival: "10 دقائق",
            truckType: truckType || "refrigerated"
          },
          {
            id: "offer-2",
            driverId: "driver-2",
            driverName: "محمد السائق",
            distance: 2.4,
            rating: 4.5,
            price: requestDetails.estimatedPrice - 5,
            estimatedArrival: "15 دقيقة",
            truckType: truckType || "refrigerated"
          },
          {
            id: "offer-3",
            driverId: "driver-3",
            driverName: "أحمد السائق",
            distance: 3.7,
            rating: 4.9,
            price: requestDetails.estimatedPrice + 15,
            estimatedArrival: "5 دقائق",
            truckType: truckType || "refrigerated"
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

  return {
    requestSubmitted,
    requestDetails,
    offers,
    hasDiscount,
    couponApplied,
    handleRequestSubmitted,
    applyCoupon,
    setRequestSubmitted
  };
};
