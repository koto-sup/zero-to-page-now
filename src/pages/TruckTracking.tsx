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
  MessageCircle
} from "lucide-react";
import SaveTrackingMessages from '@/components/chat/SaveTrackingMessages';

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
    localStorage.setItem('lastOrderNumber', orderNumber);
    setOrderStartTime(new Date());
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          setCanCancel(false);
          toast.info(
            language === 'en' ? "Cancellation window ended" : "انتهى وقت الإلغاء", 
            {
              description: language === 'en' 
                ? "You can no longer cancel this order" 
                : "لم يعد ��إمكانك إلغاء الطلب بعد الآن",
              dismissible: true
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
          toast.success(
            language === 'en' ? "Driver arrived at your location!" : "وصل السائق إلى موقعك!", 
            {
              description: language === 'en' 
                ? "The driver is waiting for you now" 
                : "السائق في انتظارك الآن",
              dismissible: true
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
      toast.error(
        language === 'en' ? "Cannot cancel order" : "لا يمكن إلغاء الطلب", 
        {
          description: language === 'en'
            ? "You've exceeded the cancellation period (14 minutes)"
            : "لقد تجاوزت فترة السماح للإلغاء (14 دقيقة)",
          dismissible: true
        }
      );
      return;
    }
    
    toast.success(
      language === 'en' ? "Order cancelled" : "تم إلغاء الطلب", 
      {
        description: language === 'en'
          ? "The driver will be notified of your cancellation"
          : "سيتم إشعار السائق بإلغاء طلبك",
        dismissible: true
      }
    );
    
    setTimeout(() => {
      navigate("/find-trucks");
    }, 2000);
  };
  
  const handleCall = () => {
    toast.info(
      language === 'en' ? "Calling driver" : "جاري الاتصال بالسائق", 
      {
        description: orderDetails.driverPhone,
        dismissible: true
      }
    );
  };
  
  const handleChatWithDriver = () => {
    navigate(`/chat/${orderDetails.driverId}`);
  };
  
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SaveTrackingMessages messages={initialMessages} />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{language === 'en' ? 'Track Order' : 'تتبع الطلب'}</h1>
          <p className="text-gray-600">{language === 'en' ? 'Order ID:' : 'رقم الطلب:'} {orderDetails.orderId}</p>
        </div>
        
        <div>
          {canCancel && (
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500 mb-1">
                {language === 'en' ? 'Time remaining for cancellation:' : 'وقت متبقي للإلغاء:'}
              </span>
              <span className="text-lg font-medium">{formatTimeLeft(timeLeft)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{language === 'en' ? 'Order Details' : 'تفاصيل الطلب'}</h2>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {currentStatus}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                  <div className="flex items-center mb-3">
                    <Truck className="text-moprd-blue h-5 w-5 ml-2" />
                    <h3 className="font-medium">{language === 'en' ? 'Driver Information' : 'معلومات السائق'}</h3>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src="/placeholder.svg" 
                      alt={orderDetails.driverName} 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{orderDetails.driverName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{orderDetails.vehicleType}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {language === 'en' ? 'License Plate:' : 'لوحة الترخيص:'} {orderDetails.licensePlate}
                      </p>
                    </div>
                  </div>
                </div>
                
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

                <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-600">
                  <p className="font-medium mb-1">{language === 'en' ? 'Total' : 'الإجمالي'}</p>
                  <p className="text-2xl font-bold text-moprd-blue">{orderDetails.price}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleCall}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Call Driver' : 'اتصال بالسائق'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleChatWithDriver}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Chat with Driver' : 'محادثة السائق'}
                  </Button>
                  
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
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className={`grid grid-cols-1 gap-4 ${showChat ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
            <div className={showChat ? 'h-[500px]' : 'h-[500px]'}>
              <Card className="h-full overflow-hidden">
                <CardContent className="p-0 h-full">
                  <EnhancedTruckMap tracking={true} distance={2.3} />
                </CardContent>
              </Card>
            </div>
            
            {showChat && (
              <div className="h-[500px] overflow-auto">
                <Card className="h-full">
                  <CardContent className="p-0 h-full">
                    <ChatBox 
                      chatId="tracking-chat" 
                      recipientId={orderDetails.driverId} 
                      recipientName={orderDetails.driverName}
                      recipientAvatar="/placeholder.svg"
                      initialMessages={initialMessages}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckTracking;
