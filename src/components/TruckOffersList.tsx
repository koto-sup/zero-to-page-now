
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Star, Clock, CheckCircle, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TruckOffer {
  id: string;
  driverId: string;
  driverName: string;
  distance: number;
  rating: number;
  price: number;
  estimatedArrival: string;
}

interface TruckOffersListProps {
  offers: TruckOffer[];
  requestDetails: {
    startLocation: string;
    destination: string;
    distance: number;
    estimatedPrice: number;
  };
  onAcceptOffer: (offerId: string) => void;
}

const TruckOffersList: React.FC<TruckOffersListProps> = ({
  offers,
  requestDetails,
  onAcceptOffer
}) => {
  const navigate = useNavigate();

  const handleAcceptOffer = (offerId: string, driverId: string) => {
    toast.success("تم قبول العرض بنجاح", {
      description: "سوف يتم تحويلك إلى صفحة الدفع",
      action: {
        label: "إلغاء",
        onClick: () => console.log("Canceled payment")
      }
    });
    
    // Navigate to invoice details page to handle payment
    navigate(`/invoice-details/${Date.now()}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack}
            className="ml-2"
          >
            <ChevronLeft className="h-4 w-4 ml-1" />
            رجوع
          </Button>
          <CardTitle className="text-xl">العروض المقدمة</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-moprd-teal/10 rounded-md">
          <h3 className="font-semibold mb-2">تفاصيل طلبك:</h3>
          <p className="text-sm">من: {requestDetails.startLocation}</p>
          <p className="text-sm">إلى: {requestDetails.destination}</p>
          <p className="text-sm">المسافة: {requestDetails.distance} كم</p>
          <p className="text-sm">السعر التقديري: {requestDetails.estimatedPrice.toFixed(2)} ريال</p>
        </div>
        
        {offers.length === 0 ? (
          <div className="text-center p-8">
            <Truck className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-lg font-medium">بانتظار العروض...</p>
            <p className="text-sm text-gray-500 mt-1">سيتم إخطارك عندما تتلقى عروضاً من السائقين</p>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div 
                key={offer.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center mb-3 md:mb-0">
                  <div className="bg-moprd-light/20 p-2 rounded-full ml-3">
                    <Truck className="h-8 w-8 text-moprd-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{offer.driverName}</h3>
                    <div className="flex items-center space-x-3 ml-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="ml-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{offer.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center ml-3">
                        <Clock className="ml-1 h-4 w-4 text-moprd-teal" />
                        <span>{offer.estimatedArrival}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 md:mr-3">
                  <Badge 
                    className={`px-3 py-1 text-lg ${
                      offer.price <= requestDetails.estimatedPrice 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {offer.price.toFixed(2)} ريال
                  </Badge>
                  
                  <Button 
                    className="bg-moprd-teal hover:bg-moprd-blue w-full md:w-auto mr-2"
                    onClick={() => handleAcceptOffer(offer.id, offer.driverId)}
                  >
                    <CheckCircle className="ml-2 h-4 w-4" />
                    قبول العرض
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TruckOffersList;
