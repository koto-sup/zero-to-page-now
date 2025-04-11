
import React from "react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";

interface TruckFinderHeaderProps {
  pageTitle: string;
  description: string;
  hasDiscount: boolean;
  couponApplied: boolean;
  applyCoupon: () => void;
  requestSubmitted: boolean;
}

const TruckFinderHeader: React.FC<TruckFinderHeaderProps> = ({
  pageTitle,
  description,
  hasDiscount,
  couponApplied,
  applyCoupon,
  requestSubmitted
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        {hasDiscount && !requestSubmitted && (
          <Button 
            onClick={applyCoupon}
            variant="outline"
            className={`${couponApplied ? 'bg-green-100 border-green-500' : ''} ml-2`}
          >
            {couponApplied ? 'تم تطبيق الخصم (15%)' : 'تطبيق كوبون الخصم'}
          </Button>
        )}
        <LanguageSelector />
      </div>
    </div>
  );
};

export default TruckFinderHeader;
