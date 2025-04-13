import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnhancedTruckMap from "@/components/EnhancedTruckMap";
import ChatBox from "@/components/ChatBox";
import { toast } from "sonner";
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

const TruckTracking = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();
  
  const [orderAccepted, setOrderAccepted] = useState(true);
  const [orderStartTime, setOrderStartTime] = useState<Date>(new Date());
  const [showChat, setShowChat] = useState(false);
  const [canCancel, setCanCancel] = useState(true);
  const [timeLeft, setTimeLeft] = useState(14 * 60); // 14 minutes in seconds
  const [currentStatus, setCurrentStatus] = useState("جاري التحرك نحو موقعك");
  
  // Get stable order number from localStorage or generate a new one if it doesn't exist
  const orderNumber = localStorage.getItem('lastOrderNumber') || 
    "ORD-" + Math.floor(100000 + Math.random() * 900000);
  
  // Mock data
  const orderDetails = {
    orderId: orderNumber,
    driverName: "خالد السائق",
    driverId: driverId || "driver-1",
    driverPhone: "+966 50 123 4567",
    pickupLocation: "الرياض، حي النرجس",
    deliveryLocation: "الرياض، حي الملقا",
    vehicleType: "شاحنة مبردة",
    licensePlate: "FYX 2847",
    estimatedArrival: "10 دقائق",
    rentalDuration: "يوم واحد",
    price: "105 ريال",
  };

  // Mock messages for chat
  const initialMessages = [
    {
      id: "msg-1",
      senderId: "customer-1",
      senderName: "أنا",
      content: "مرحباً، أين أنت الآن؟",
      timestamp: new Date(Date.now() - 3600000 * 0.5),
    },
    {
      id: "msg-2",
      senderId: orderDetails.driverId,
      senderName: orderDetails.driverName,
      senderAvatar: "/placeholder.svg",
      content: "مرحباً، أنا في الطريق إليك. سأصل خلال 10 دقائق تقريباً.",
      timestamp: new Date(Date.now() - 3600000 * 0.3),
    },
  ];

  useEffect(() => {
    // Save the order number to localStorage to keep it stable
    localStorage.setItem('lastOrderNumber', orderNumber);
    
    // Set the order start time to the current time
    setOrderStartTime(new Date());
    
    // Timer to update the cancellation window
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          setCanCancel(false);
          toast.info("انتهى وقت الإلغاء", {
            description: "لم يعد بإمكانك إلغاء الطلب بعد الآن"
          });
          return 0;
        }
        return newTime;
      });
    }, 1000);
    
    // Simulating status updates
    const statusTimer = setTimeout(() => {
      setCurrentStatus("في الطريق إليك");
      
      setTimeout(() => {
        setCurrentStatus("قريب من موقعك");
        
        setTimeout(() => {
          setCurrentStatus("وصل إلى موقعك");
          toast.success("وصل السائق إلى موقعك!", {
            description: "السائق في انتظارك الآن"
          });
        }, 30000); // 30 seconds later
        
      }, 20000); // 20 seconds later
    }, 10000); // 10 seconds later
    
    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer);
    };
  }, []);
  
  const formatTimeLeft = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleCancelOrder = () => {
    if (!canCancel) {
      toast.error("لا يمكن إلغاء الطلب", {
        description: "لقد تجاوزت فترة السماح للإلغاء (14 دقيقة)"
      });
      return;
    }
    
    // In a real app, we'd send a request to the server
    toast.success("تم إلغاء الطلب", {
      description: "سيتم إشعار السائق بإلغاء طلبك"
    });
    
    setTimeout(() => {
      navigate("/find-trucks");
    }, 2000);
  };
  
  const handleCall = () => {
    toast.info("جاري الاتصال بالسائق", {
      description: orderDetails.driverPhone
    });
  };
  
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">تتبع الطلب</h1>
          <p className="text-gray-600">رقم الطلب: {orderDetails.orderId}</p>
        </div>
        
        <div>
          {canCancel && (
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500 mb-1">وقت متبقي للإلغاء:</span>
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
                <h2 className="text-xl font-bold">تفاصيل الطلب</h2>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {currentStatus}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Truck className="text-moprd-blue h-5 w-5 ml-2" />
                    <h3 className="font-medium">معلومات السائق</h3>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src="/placeholder.svg" 
                      alt={orderDetails.driverName} 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{orderDetails.driverName}</p>
                      <p className="text-sm text-gray-500">{orderDetails.vehicleType}</p>
                      <p className="text-xs text-gray-500">لوحة الترخيص: {orderDetails.licensePlate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-gray-500 ml-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">موقع الانطلاق</p>
                      <p>{orderDetails.pickupLocation}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-gray-500 ml-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">الوجهة</p>
                      <p>{orderDetails.deliveryLocation}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 text-gray-500 ml-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">وقت الوصول المتوقع</p>
                      <p>{orderDetails.estimatedArrival}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 text-gray-500 ml-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">مدة الإيجار</p>
                      <p>{orderDetails.rentalDuration}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200">
                  <p className="font-medium mb-1">الإجمالي</p>
                  <p className="text-2xl font-bold text-moprd-blue">{orderDetails.price}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleCall}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    اتصال بالسائق
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={toggleChat}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {showChat ? "إخفاء المحادثة" : "محادثة السائق"}
                  </Button>
                  
                  {canCancel && (
                    <Button 
                      variant="destructive" 
                      className="w-full mt-2"
                      onClick={handleCancelOrder}
                    >
                      <X className="mr-2 h-4 w-4" />
                      إلغاء الطلب
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
