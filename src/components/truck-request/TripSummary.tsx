
import React from "react";

interface TripSummaryProps {
  distance: number;
  truckType: string;
  estimatedPrice: number;
  discountApplied?: boolean;
  getPriceLabel: () => string;
}

const TripSummary: React.FC<TripSummaryProps> = ({ 
  distance, 
  truckType, 
  estimatedPrice, 
  discountApplied = false,
  getPriceLabel
}) => {
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
      "front-loader": "لودر أمامي",
      jcp: "شاحنة JCP",
      "water-truck": "شاحنة شفط المياه",
      "crawler-excavator": "حفارة زاحفة",
      "wheel-excavator": "حفارة بعجلات"
    };
    
    return truckTypeNames[type] || type;
  };

  return (
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
      
      {truckType === "refrigerated" && (
        <div className="flex justify-between border-b pb-2">
          <span>وقت الوصول التقديري:</span>
          <span className="font-medium">{Math.round(distance * 5)} دقيقة</span>
        </div>
      )}
      
      <div className="flex justify-between text-lg font-semibold">
        <span>{getPriceLabel()}</span>
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
        {truckType === "refrigerated" ? 
          "السعر النهائي سيتم تحديده من قبل السائق بناءً على طلبك" : 
          "الأسعار تقديرية وقد تتغير حسب العرض والطلب والمسافة الفعلية"}
      </div>
    </div>
  );
};

export default TripSummary;
