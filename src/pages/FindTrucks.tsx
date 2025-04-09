
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import TruckRequestForm from "@/components/TruckRequestForm";
import TruckOffersList from "@/components/TruckOffersList";

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
}

const FindTrucks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(null);
  const [offers, setOffers] = useState<TruckOffer[]>([]);

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
            estimatedArrival: "10 دقائق"
          },
          {
            id: "offer-2",
            driverId: "driver-2",
            driverName: "محمد السائق",
            distance: 2.4,
            rating: 4.5,
            price: requestDetails.estimatedPrice - 5,
            estimatedArrival: "15 دقيقة"
          },
          {
            id: "offer-3",
            driverId: "driver-3",
            driverName: "أحمد السائق",
            distance: 3.7,
            rating: 4.9,
            price: requestDetails.estimatedPrice + 15,
            estimatedArrival: "5 دقائق"
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

  const handleAcceptOffer = (offerId: string) => {
    // في تطبيق حقيقي، سنقوم بإرسال قبول العرض إلى الخادم
    // وإنشاء محادثة مع السائق

    const selectedOffer = offers.find(offer => offer.id === offerId);
    if (selectedOffer) {
      navigate(`/chat/${selectedOffer.driverId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">البحث عن شاحنات مبردة</h1>
        <p className="text-gray-600">
          اختر موقع الانطلاق والوجهة للحصول على عروض من الشاحنات المبردة المتاحة
        </p>
      </div>

      {!requestSubmitted ? (
        <TruckRequestForm onRequestSubmitted={handleRequestSubmitted} />
      ) : (
        <TruckOffersList 
          offers={offers} 
          requestDetails={requestDetails!} 
          onAcceptOffer={handleAcceptOffer} 
        />
      )}
    </div>
  );
};

export default FindTrucks;
