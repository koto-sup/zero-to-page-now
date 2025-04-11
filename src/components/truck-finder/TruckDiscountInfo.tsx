
import React from "react";
import { Button } from "@/components/ui/button";

interface TruckDiscountInfoProps {
  hasDiscount: boolean;
  couponApplied: boolean;
  applyCoupon: () => void;
  requestSubmitted: boolean;
}

const TruckDiscountInfo: React.FC<TruckDiscountInfoProps> = ({
  hasDiscount,
  couponApplied,
  applyCoupon,
  requestSubmitted
}) => {
  if (requestSubmitted) return null;
  
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg text-blue-700 text-sm border border-blue-200">
      <h3 className="font-semibold mb-2">معلومات الخصم:</h3>
      <p>بعد إتمام طلبين، يمكنك الحصول على خصم 15% على طلبك التالي عند استخدام كوبون الخصم.</p>
      {hasDiscount && (
        <p className="mt-2 font-medium">
          أنت مؤهل للحصول على خصم! يمكنك استخدام كوبون الخصم الآن.
        </p>
      )}
      
      {hasDiscount && !requestSubmitted && (
        <Button 
          onClick={applyCoupon}
          variant="outline"
          className={`${couponApplied ? 'bg-green-100 border-green-500' : ''} mt-2`}
        >
          {couponApplied ? 'تم تطبيق الخصم (15%)' : 'تطبيق كوبون الخصم'}
        </Button>
      )}
    </div>
  );
};

export default TruckDiscountInfo;
