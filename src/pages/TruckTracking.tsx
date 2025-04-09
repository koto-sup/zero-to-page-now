
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Phone, MessageSquare, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import EnhancedTruckMap from "@/components/EnhancedTruckMap";

const TruckTracking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [estimatedTime, setEstimatedTime] = useState("15 دقيقة");
  const [distance, setDistance] = useState(2.3);
  const [driverInfo, setDriverInfo] = useState({
    name: "خالد السائق",
    phone: "+966 50 123 4567",
    rating: 4.8,
    plateNumber: "ل و د 1234",
    status: "في الطريق"
  });

  useEffect(() => {
    // Simulate driver movement with decreasing distance
    const interval = setInterval(() => {
      setDistance(prevDistance => {
        const newDistance = Math.max(prevDistance - 0.1, 0).toFixed(1);
        
        // Update estimated time as well
        const newTime = Math.max(Math.floor(Number(newDistance) * 5), 1);
        setEstimatedTime(`${newTime} دقيقة`);
        
        // Show notification when driver is close
        if (Number(newDistance) <= 0.5 && Number(prevDistance) > 0.5) {
          toast.info("السائق قريب منك!", {
            description: "السائق على بعد أقل من 500 متر",
            duration: 5000
          });
        }
        
        return Number(newDistance);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCallDriver = () => {
    // In a real app, this would initiate a phone call
    toast.info("جاري الاتصال بالسائق", {
      description: driverInfo.phone,
      duration: 3000
    });
  };

  const handleChat = () => {
    navigate("/chat/driver-1");
  };

  const handleCancel = () => {
    // Show confirmation dialog
    if (window.confirm("هل أنت متأكد من إلغاء هذه الرحلة؟ قد تخضع لرسوم الإلغاء.")) {
      toast.error("تم إلغاء الرحلة", {
        description: "سيتم إعادتك إلى الصفحة الرئيسية",
        duration: 3000
      });
      navigate("/customer-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Map container takes most of the screen */}
      <div className="w-full h-[70vh] relative">
        <EnhancedTruckMap tracking={true} distance={distance} />
        
        {/* Estimated arrival time overlay */}
        <div className="absolute top-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-moprd-teal/30">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">الوصول خلال</h2>
              <div className="text-3xl font-bold text-moprd-blue">{estimatedTime}</div>
            </div>
            <div className="text-right">
              <Badge className="bg-moprd-teal text-white">{driverInfo.status}</Badge>
              <p className="mt-1">المسافة: {distance} كم</p>
            </div>
          </div>
        </div>
      </div>

      {/* Driver info card */}
      <div className="mx-4 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-moprd-teal/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-moprd-teal/20 rounded-full flex items-center justify-center mr-3">
                <img 
                  src="https://api.dicebear.com/7.x/micah/svg?seed=driver123" 
                  alt="Driver avatar" 
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{driverInfo.name}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{driverInfo.rating}</span>
                  <span className="mx-2">•</span>
                  <span>{driverInfo.plateNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleCallDriver}
                className="w-12 h-12 bg-moprd-teal/10 hover:bg-moprd-teal/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Phone className="text-moprd-teal" />
              </button>
              <button 
                onClick={handleChat}
                className="w-12 h-12 bg-moprd-teal/10 hover:bg-moprd-teal/20 rounded-full flex items-center justify-center transition-colors"
              >
                <MessageSquare className="text-moprd-teal" />
              </button>
              <button 
                onClick={handleCancel}
                className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="text-red-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button 
              variant="outline" 
              className="border-moprd-teal text-moprd-teal hover:bg-moprd-teal/10"
              onClick={() => navigate("/invoice-details/latest")}
            >
              عرض تفاصيل الفاتورة
            </Button>
            <Button 
              className="bg-moprd-teal hover:bg-moprd-blue"
              onClick={() => toast.info("تم إرسال رسالة للسائق بموقعك الدقيق", { duration: 3000 })}
            >
              مشاركة موقعي الحالي
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckTracking;
