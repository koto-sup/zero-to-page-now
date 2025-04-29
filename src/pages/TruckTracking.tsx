
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import EnhancedTruckMap from "@/components/EnhancedTruckMap";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ChatBox } from "@/components/ChatBox";
import { Phone, MessageSquare, X, AlertTriangle, MoreVertical, MapPin, Star, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const TruckTracking = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [distance, setDistance] = useState(2.3);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [showPreviousTracks, setShowPreviousTracks] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  
  const previousTracks = [
    { 
      id: "track-1", 
      date: "2023-09-15", 
      from: "الرياض، حي النرجس", 
      to: "الرياض، حي الملقا", 
      price: 145.50,
      status: "completed"
    },
    { 
      id: "track-2", 
      date: "2023-09-10", 
      from: "الرياض، حي اليرموك", 
      to: "الرياض، طريق الملك فهد", 
      price: 89.75,
      status: "completed"
    },
    { 
      id: "track-3", 
      date: "2023-08-27", 
      from: "جدة، حي البوادي", 
      to: "جدة، حي النزهة", 
      price: 205.00,
      status: "canceled"
    },
  ];

  useEffect(() => {
    if (distance <= 0) {
      toast.success(
        language === 'en' ? "Driver has arrived!" : "وصل السائق!",
        { 
          description: language === 'en' ? "The driver is at your location now" : "السائق في موقعك الآن" 
        }
      );
    }
  }, [distance, language]);

  const handleCancel = () => {
    setShowCancelDialog(false);
    
    // Save the cancellation to localStorage
    const cancellations = JSON.parse(localStorage.getItem('cancellations') || '[]');
    cancellations.push({
      id: `cancel-${Date.now()}`,
      driverId,
      date: new Date().toISOString(),
      reason: cancelReason || "User canceled",
      status: "canceled"
    });
    localStorage.setItem('cancellations', JSON.stringify(cancellations));
    
    // Show notification
    toast.info(
      language === 'en' ? "Trip canceled" : "تم إلغاء الرحلة",
      { 
        description: language === 'en' ? "Your trip has been canceled" : "تم إلغاء رحلتك" 
      }
    );
    
    // Navigate to dashboard after a delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const t = (en: string, ar: string) => language === 'en' ? en : ar;

  return (
    <Layout>
      <div className="container mx-auto relative pb-20 px-4 py-6 min-h-screen">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            className="mr-2 p-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold dark:text-white">
            {t("Truck Tracking", "تتبع الشاحنة")}
          </h1>
        </div>
        
        {/* Map and driver info */}
        <div className="relative">
          <div className="h-[40vh] md:h-[60vh] rounded-lg overflow-hidden shadow-lg">
            <EnhancedTruckMap tracking={true} distance={distance} />
          </div>

          {/* Status panel that can be expanded/collapsed */}
          <Card className="mx-auto md:max-w-2xl -mt-6 relative z-10 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div 
              className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md border border-gray-200 dark:border-gray-700"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {t("Driver is on the way", "السائق في الطريق")}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {t(`Arriving in ${Math.max(Math.floor(distance * 5), 1)} minutes`, `الوصول خلال ${Math.max(Math.floor(distance * 5), 1)} دقائق`)}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center bg-white dark:bg-gray-800"
                    onClick={() => navigate(`/chat/${driverId}`)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {t("Chat", "محادثة")}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center bg-white dark:bg-gray-800"
                    onClick={() => {
                      toast.info(t("Calling driver...", "جاري الاتصال بالسائق..."));
                    }}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    {t("Call", "اتصال")}
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {expanded && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex border-b border-gray-100 dark:border-gray-700 py-3">
                    <div className="w-12 h-12 rounded-full bg-moprd-blue/20 flex items-center justify-center mr-3">
                      <Truck className="h-6 w-6 text-moprd-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t("Refrigerated Truck", "شاحنة مبردة")}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("XL Size • License: 1234 ABC", "حجم كبير جداً • رقم اللوحة: 1234 ABC")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-3">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
                        <img 
                          src="/placeholder.svg" 
                          alt={t("Driver", "السائق")}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{t("Ahmed Driver", "أحمد السائق")}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1">4.9</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-moprd-teal"
                        onClick={() => {
                          toast.info(t("Viewing driver profile...", "عرض ملف السائق..."));
                        }}
                      >
                        {t("View Profile", "عرض الملف")}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3 py-3">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t("Pickup Location", "موقع الالتقاء")}</p>
                        <p className="font-medium">{t("Riyadh, Narjes District", "الرياض، حي النرجس")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t("Destination", "الوجهة")}</p>
                        <p className="font-medium">{t("Riyadh, Malqa District", "الرياض، حي الملقا")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">{t("Total", "المجموع")}</p>
                      <p className="font-bold">{t("120.50 SAR", "120.50 ريال")}</p>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-gray-500 dark:text-gray-400">{t("Payment Method", "طريقة الدفع")}</p>
                      <p>{t("Cash", "نقداً")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
            
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => setShowCancelDialog(true)}
              >
                {t("Cancel Trip", "إلغاء الرحلة")}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex justify-between"
                onClick={() => setShowPreviousTracks(!showPreviousTracks)}
              >
                <span>{t("Previous Tracks", "المسارات السابقة")}</span>
                {showPreviousTracks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Previous trips section */}
        {showPreviousTracks && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold dark:text-white">
              {t("Previous Tracks", "المسارات السابقة")}
            </h2>
            
            {previousTracks.map(track => (
              <Card key={track.id} className="dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">
                      {new Date(track.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </CardTitle>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      track.status === 'completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {track.status === 'completed' 
                        ? t("Completed", "مكتمل") 
                        : t("Canceled", "ملغي")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <p className="text-sm">{track.from}</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                      <p className="text-sm">{track.to}</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("Price", "السعر")}</p>
                      <p className="font-medium">{track.price.toFixed(2)} {t("SAR", "ريال")}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      toast.info(
                        t("Viewing trip details", "عرض تفاصيل الرحلة"), 
                        {description: t("Trip ID:", "معرف الرحلة:") + " " + track.id}
                      );
                    }}
                  >
                    {t("View Details", "عرض التفاصيل")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Chat Dialog */}
        <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {t("Chat with Driver", "محادثة مع السائق")}
              </DialogTitle>
            </DialogHeader>
            <div className="h-96">
              {/* ChatBox component */}
            </div>
          </DialogContent>
        </Dialog>

        {/* Cancel Trip Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="flex items-center text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {t("Cancel Trip", "إلغاء الرحلة")}
              </DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                {t("Are you sure you want to cancel this trip? A cancellation fee may apply.", "هل أنت متأكد أنك تريد إلغاء هذه الرحلة؟ قد يتم تطبيق رسوم الإلغاء.")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-1 dark:text-gray-300">
                  {t("Cancellation Reason (Optional)", "سبب الإلغاء (اختياري)")}
                </label>
                <select 
                  id="reason"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                >
                  <option value="">{t("Select a reason", "اختر سبباً")}</option>
                  <option value="wrong-address">{t("Wrong address", "عنوان خاطئ")}</option>
                  <option value="changed-mind">{t("Changed my mind", "غيرت رأيي")}</option>
                  <option value="driver-delay">{t("Driver is taking too long", "السائق يستغرق وقتاً طويلاً")}</option>
                  <option value="other">{t("Other", "سبب آخر")}</option>
                </select>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {t("A cancellation fee of 20 SAR may be charged as the driver is already on their way.", "قد يتم فرض رسوم إلغاء قدرها 20 ريال حيث أن السائق في طريقه بالفعل.")}
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowCancelDialog(false)}
                className="dark:text-white dark:border-gray-600"
              >
                {t("Go Back", "العودة")}
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleCancel}
              >
                {t("Confirm Cancellation", "تأكيد الإلغاء")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TruckTracking;
