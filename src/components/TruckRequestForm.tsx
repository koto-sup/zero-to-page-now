
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Truck, Loader2, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TruckMap from "@/components/TruckMap";

interface TruckRequestFormProps {
  onRequestSubmitted: (requestData: {
    startLocation: string;
    destination: string;
    distance: number;
    estimatedPrice: number;
  }) => void;
}

const TruckRequestForm: React.FC<TruckRequestFormProps> = ({ onRequestSubmitted }) => {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);

  const calculateDistance = (start: string, dest: string): number => {
    // في التطبيق الحقيقي، سنستخدم خدمة خرائط لحساب المسافة
    // هذه مجرد محاكاة بسيطة للعرض التوضيحي
    return parseFloat((Math.random() * 10 + 5).toFixed(1));
  };

  const handleCalculateDistance = () => {
    if (!startLocation || !destination) {
      toast.error("الرجاء إدخال نقطة البداية والوجهة");
      return;
    }

    const calculatedDistance = calculateDistance(startLocation, destination);
    setDistance(calculatedDistance);
    toast.success("تم حساب المسافة بنجاح");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startLocation || !destination) {
      toast.error("الرجاء إدخال نقطة البداية والوجهة");
      return;
    }
    
    if (!distance) {
      handleCalculateDistance();
      return;
    }
    
    setIsSubmitting(true);
    
    // حساب السعر التقديري (13.5 ريال لكل كيلومتر)
    const estimatedPrice = parseFloat((distance * 13.5).toFixed(2));
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      onRequestSubmitted({
        startLocation,
        destination,
        distance,
        estimatedPrice
      });
      
      toast.success("تم إرسال طلبك إلى السائقين القريبين");
    }, 1500);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
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
          <CardTitle className="text-xl">طلب شاحنة مبردة</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative rounded-md overflow-hidden mb-6">
          <TruckMap />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startLocation">نقطة الانطلاق</Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="startLocation"
                  placeholder="أدخل موقع الانطلاق"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">الوجهة</Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="destination"
                  placeholder="أدخل وجهة التوصيل"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCalculateDistance}
              className="flex items-center"
            >
              <Clock className="ml-2 h-4 w-4" />
              حساب المسافة والسعر
            </Button>
            
            {distance && (
              <div className="text-left">
                <p className="text-sm text-gray-500">المسافة التقديرية: <span className="font-bold text-black">{distance} كم</span></p>
                <p className="text-sm text-gray-500">السعر التقديري: <span className="font-bold text-black">{(distance * 13.5).toFixed(2)} ريال</span></p>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="bg-moprd-teal hover:bg-moprd-blue w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري إرسال الطلب...
              </>
            ) : (
              <>
                <Truck className="ml-2 h-4 w-4" />
                طلب عروض من السائقين
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TruckRequestForm;
