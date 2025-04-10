
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin, Truck } from "lucide-react";

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

interface TruckOffersListProps {
  offers: TruckOffer[];
  requestDetails: RequestDetails;
  onAcceptOffer: (offerId: string) => void;
  discountApplied?: boolean;
}

const TruckOffersList: React.FC<TruckOffersListProps> = ({
  offers,
  requestDetails,
  onAcceptOffer,
  discountApplied = false
}) => {
  const getTruckTypeLabel = (type: string): string => {
    const truckTypes: Record<string, string> = {
      refrigerated: "شاحنة مبردة",
      transport: "شاحنة نقل",
      store: "شاحنة متجر",
      crane: "شاحنة رافعة",
      wood: "شاحنة نقل الأخشاب",
      tractor: "جرار زراعي",
      "loading-crane": "رافعة تحميل",
      bulldozer: "جرافة",
      "dump-truck": "شاحنة قلابة",
      "skid-steer": "لودر انزلاقي",
      flatbed: "شاحنة مسطحة",
      backhoe: "حفارة خلفية",
      "front-loader": "لودر أمامي"
    };
    
    return truckTypes[type] || type;
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  const getOfferPrice = (originalPrice: number) => {
    return discountApplied ? Math.round(originalPrice * 0.85) : originalPrice;
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">تفاصيل الطلب</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 ml-2" />
            <div>
              <div className="text-sm text-gray-500">موقع الانطلاق</div>
              <div>{requestDetails.startLocation}</div>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 ml-2" />
            <div>
              <div className="text-sm text-gray-500">الوجهة</div>
              <div>{requestDetails.destination}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 ml-2" />
            <div>
              <div className="text-sm text-gray-500">السعر التقديري</div>
              <div className="flex items-center">
                {requestDetails.estimatedPrice} ريال
                {discountApplied && (
                  <span className="mr-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    خصم 15%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">العروض المتاحة ({offers.length})</h2>

      {offers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Truck className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">لا توجد عروض متاحة حاليًا</h3>
          <p className="text-gray-500 mt-2">يرجى الانتظار أو تعديل طلبك للحصول على المزيد من العروض</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden">
              <div className="h-2 bg-moprd-teal"></div>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{offer.driverName}</h3>
                    <div className="flex mt-1">
                      {renderStars(offer.rating)}
                      <span className="text-sm text-gray-500 mr-1">
                        ({offer.rating})
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-moprd-blue" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">نوع الشاحنة</span>
                    <span className="font-medium">{getTruckTypeLabel(offer.truckType)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">المسافة</span>
                    <span className="font-medium">{offer.distance} كم</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">وقت الوصول المقدر</span>
                    <span className="font-medium">{offer.estimatedArrival}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold mt-4">
                    <span>السعر</span>
                    <div>
                      <span className="text-green-600">{getOfferPrice(offer.price)} ريال</span>
                      {discountApplied && (
                        <div className="text-xs text-gray-500 line-through text-left">
                          {offer.price} ريال
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-2 bg-moprd-teal hover:bg-moprd-blue"
                    onClick={() => onAcceptOffer(offer.id)}
                  >
                    قبول العرض
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TruckOffersList;
