
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TripDetailsProps {
  distance: number;
  truckType: string;
  estimatedPrice: number;
  discountApplied?: boolean;
  loading: boolean;
  onSubmit: () => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({
  distance,
  truckType,
  estimatedPrice,
  discountApplied = false,
  loading,
  onSubmit
}) => {
  // Map truck type IDs to Arabic names
  const getTruckTypeName = (type: string): string => {
    const truckTypeNames: Record<string, string> = {
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
    
    return truckTypeNames[type] || type;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">تفاصيل الرحلة</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>المسافة التقديرية:</span>
              <span className="font-medium">{distance} كم</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span>نوع الشاحنة:</span>
              <span className="font-medium">
                {getTruckTypeName(truckType)}
              </span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span>وقت الوصول التقديري:</span>
              <span className="font-medium">{Math.round(distance * 5)} دقيقة</span>
            </div>
            
            <div className="flex justify-between text-lg font-semibold">
              <span>السعر التقديري:</span>
              <span className="text-green-600">
                {estimatedPrice} ريال
                {discountApplied && (
                  <span className="mr-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    خصم 15%
                  </span>
                )}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              الأسعار تقديرية وقد تتغير حسب العرض والطلب والمسافة الفعلية
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        type="submit" 
        className="w-full bg-moprd-teal hover:bg-moprd-blue h-12 text-lg"
        disabled={loading}
        onClick={onSubmit}
      >
        {loading ? "جاري البحث..." : "البحث عن شاحنات"}
      </Button>
    </div>
  );
};

export default TripDetails;
