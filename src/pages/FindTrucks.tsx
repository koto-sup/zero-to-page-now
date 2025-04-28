
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
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

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
  
  // More menu options
  const handleMoreOptions = () => {
    // Can be extended with more functionality
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {currentStep === 2 ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute top-0 left-0 z-50 p-4">
            <Button
              variant="outline" 
              size="icon"
              className="bg-background/80 backdrop-blur-sm dark:bg-gray-800/80 dark:text-white"
              onClick={() => setCurrentStep(1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          
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
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                className="p-2"
                onClick={handleBackToVehicle}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <h1 className="text-xl font-semibold">
                {getPageTitle()}
              </h1>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:text-white">
                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                    {t("Apply Discount", "تطبيق خصم")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                    {t("Contact Support", "اتصل بالدعم")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                    {t("Settings", "الإعدادات")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {!requestSubmitted ? (
              <>
                <div className="mt-2">
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
              <div className="pt-6">
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
