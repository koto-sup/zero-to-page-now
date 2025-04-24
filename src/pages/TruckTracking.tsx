
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnhancedTruckMap from "@/components/EnhancedTruckMap";
import ChatBox from "@/components/ChatBox";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Clock, 
  MapPin, 
  Truck, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  X,
  MessageCircle,
  ArrowLeft,
  MoreVertical
} from "lucide-react";
import SaveTrackingMessages from '@/components/chat/SaveTrackingMessages';
import { motion, AnimatePresence } from "framer-motion";

const TruckTracking = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [orderAccepted, setOrderAccepted] = useState(true);
  const [orderStartTime, setOrderStartTime] = useState<Date>(new Date());
  const [showChat, setShowChat] = useState(false);
  const [canCancel, setCanCancel] = useState(true);
  const [timeLeft, setTimeLeft] = useState(14 * 60); // 14 minutes in seconds
  const [currentStatus, setCurrentStatus] = useState(language === 'en' ? "Moving to your location" : "جاري التحرك نحو موقعك");
  const [showDetails, setShowDetails] = useState(false);
  const [fullScreen, setFullScreen] = useState(true);
  
  const orderNumber = localStorage.getItem('lastOrderNumber') || 
    "ORD-" + Math.floor(100000 + Math.random() * 900000);
  
  const orderDetails = {
    orderId: orderNumber,
    driverName: language === 'en' ? "Khalid Driver" : "خالد السائق",
    driverId: driverId || "driver-1",
    driverPhone: "+966 50 123 4567",
    pickupLocation: language === 'en' ? "Riyadh, Narjis District" : "الرياض، حي النرجس",
    deliveryLocation: language === 'en' ? "Riyadh, Malqa District" : "الرياض، حي الملقا",
    vehicleType: language === 'en' ? "Refrigerated Truck" : "شاحنة مبردة",
    licensePlate: "FYX 2847",
    estimatedArrival: language === 'en' ? "10 minutes" : "10 دقائق",
    rentalDuration: language === 'en' ? "One day" : "يوم واحد",
    price: language === 'en' ? "105 SAR" : "105 ريال",
  };

  const initialMessages = [
    {
      id: "msg-1",
      senderId: "customer-1",
      senderName: language === 'en' ? "Me" : "أنا",
      content: language === 'en' ? "Hello, where are you now?" : "مرحباً، أين أنت الآن؟",
      timestamp: new Date(Date.now() - 3600000 * 0.5),
    },
    {
      id: "msg-2",
      senderId: orderDetails.driverId,
      senderName: orderDetails.driverName,
      senderAvatar: "/placeholder.svg",
      content: language === 'en' 
        ? "Hello, I'm on my way to you. I'll arrive in about 10 minutes." 
        : "مرحباً، أنا في الطريق إليك. سأصل خلال 10 دقائق تقريباً.",
      timestamp: new Date(Date.now() - 3600000 * 0.3),
    },
  ];

  useEffect(() => {
    // Start with full screen map
    setFullScreen(true);
    
    // After 2 seconds, show the minimized info bar
    setTimeout(() => {
      setFullScreen(false);
    }, 3000);
    
    localStorage.setItem('lastOrderNumber', orderNumber);
    setOrderStartTime(new Date());
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          setCanCancel(false);
          toast(
            language === 'en' ? "Cancellation window ended" : "انتهى وقت الإلغاء", 
            {
              description: language === 'en' 
                ? "You can no longer cancel this order" 
                : "لم يعد بإمكانك إلغاء الطلب بعد الآن",
              dismissible: true,
              position: "top-right"
            }
          );
          return 0;
        }
        return newTime;
      });
    }, 1000);
    
    const statusTimer = setTimeout(() => {
      setCurrentStatus(language === 'en' ? "On the way to you" : "في الطريق إليك");
      
      setTimeout(() => {
        setCurrentStatus(language === 'en' ? "Near your location" : "قريب من موقعك");
        
        setTimeout(() => {
          setCurrentStatus(language === 'en' ? "Arrived at your location" : "وصل إلى موقعك");
          toast(
            language === 'en' ? "Driver arrived at your location!" : "وصل السائق إلى موقعك!", 
            {
              description: language === 'en' 
                ? "The driver is waiting for you now" 
                : "السائق في انتظارك الآن",
              dismissible: true,
              position: "top-right"
            }
          );
        }, 30000); // 30 seconds later
        
      }, 20000); // 20 seconds later
    }, 10000); // 10 seconds later
    
    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer);
    };
  }, [language]);
  
  const formatTimeLeft = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleCancelOrder = () => {
    if (!canCancel) {
      toast(
        language === 'en' ? "Cannot cancel order" : "لا يمكن إلغاء الطلب", 
        {
          description: language === 'en'
            ? "You've exceeded the cancellation period (14 minutes)"
            : "لقد تجاوزت فترة السماح للإلغاء (14 دقيقة)",
          dismissible: true,
          position: "top-right"
        }
      );
      return;
    }
    
    toast(
      language === 'en' ? "Order cancelled" : "تم إلغاء الطلب", 
      {
        description: language === 'en'
          ? "The driver will be notified of your cancellation"
          : "سيتم إشعار السائق بإلغاء طلبك",
        dismissible: true,
        position: "top-right"
      }
    );
    
    setTimeout(() => {
      navigate("/find-trucks");
    }, 2000);
  };
  
  const handleCall = () => {
    toast(
      language === 'en' ? "Calling driver" : "جاري الاتصال بالسائق", 
      {
        description: orderDetails.driverPhone,
        dismissible: true,
        position: "top-right"
      }
    );
  };
  
  const handleChatWithDriver = () => {
    if (driverId) {
      navigate(`/chat/${driverId}`);
    } else {
      navigate(`/chat/driver-1`);
    }
  };
  
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <SaveTrackingMessages messages={initialMessages} />
      
      {/* Full-screen map */}
      <div className="absolute inset-0 z-0">
        <EnhancedTruckMap tracking={true} distance={2.3} />
      </div>
      
      {/* Top navigation bar - always visible */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-white/80 backdrop-blur-sm shadow-md h-10 w-10 rounded-full"
          onClick={handleBackButton}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center justify-center bg-white/80 backdrop-blur-sm py-1 px-3 rounded-full shadow-md">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm font-medium">{currentStatus}</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          className="bg-white/80 backdrop-blur-sm shadow-md h-10 w-10 rounded-full"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Bottom drawer - minimized state */}
      <AnimatePresence>
        {!showDetails && !fullScreen && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg z-20 rounded-t-3xl shadow-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="p-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
              
              <div 
                className="flex justify-between items-center" 
                onClick={() => setShowDetails(true)}
              >
                <div className="flex items-center">
                  <img 
                    src="/placeholder.svg" 
                    alt={orderDetails.driverName} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold">{orderDetails.driverName}</h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-xs text-muted-foreground">{currentStatus}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <Button variant="ghost" size="sm" className="mr-2 text-moprd-blue" onClick={handleCall}>
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-moprd-blue" onClick={handleChatWithDriver}>
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(true)}>
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom drawer - expanded state */}
      <AnimatePresence>
        {showDetails && !fullScreen && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-white z-20 rounded-t-3xl shadow-lg overflow-hidden"
            initial={{ height: 80 }}
            animate={{ height: "75%" }}
            exit={{ height: 80 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="h-full overflow-auto">
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{language === 'en' ? 'Track Order' : 'تتبع الطلب'}</h2>
                    <p className="text-gray-600">{language === 'en' ? 'Order ID:' : 'رقم الطلب:'} {orderDetails.orderId}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>
                {canCancel && (
                  <div className="mt-2 p-2 bg-amber-50 rounded-md text-amber-800 text-sm">
                    {language === 'en' ? 'Time remaining for cancellation:' : 'وقت متبقي للإلغاء:'} {formatTimeLeft(timeLeft)}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">{language === 'en' ? 'Driver Information' : 'معلومات السائق'}</h3>
                      <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {currentStatus}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <img 
                        src="/placeholder.svg" 
                        alt={orderDetails.driverName} 
                        className="w-16 h-16 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{orderDetails.driverName}</p>
                        <p className="text-sm text-gray-500">{orderDetails.vehicleType}</p>
                        <p className="text-xs text-gray-500">
                          {language === 'en' ? 'License Plate:' : 'لوحة الترخيص:'} {orderDetails.licensePlate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={handleCall}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Call' : 'اتصال'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={handleChatWithDriver}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Chat' : 'محادثة'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">{language === 'en' ? 'Trip Details' : 'تفاصيل الرحلة'}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-300 ml-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {language === 'en' ? 'Pickup Location' : 'موقع الانطلاق'}
                          </p>
                          <p>{orderDetails.pickupLocation}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-300 ml-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {language === 'en' ? 'Destination' : 'الوجهة'}
                          </p>
                          <p>{orderDetails.deliveryLocation}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-300 ml-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {language === 'en' ? 'Estimated Arrival Time' : 'وقت الوصول المتوقع'}
                          </p>
                          <p>{orderDetails.estimatedArrival}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-300 ml-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {language === 'en' ? 'Rental Duration' : 'مدة الإيجار'}
                          </p>
                          <p>{orderDetails.rentalDuration}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{language === 'en' ? 'Payment' : 'الدفع'}</h3>
                      <p className="text-xl font-bold text-moprd-blue">{orderDetails.price}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {canCancel && (
                  <Button 
                    variant="destructive" 
                    className="w-full mt-2"
                    onClick={handleCancelOrder}
                  >
                    <X className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Cancel Order' : 'إلغاء الطلب'}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TruckTracking;
