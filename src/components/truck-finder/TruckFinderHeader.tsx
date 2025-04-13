
import React from "react";
import { ArrowLeft, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";

interface TruckFinderHeaderProps {
  pageTitle: string;
  description: string;
  hasDiscount: boolean;
  couponApplied: boolean;
  applyCoupon: () => void;
  requestSubmitted: boolean;
  hideLanguageButton?: boolean;
}

const TruckFinderHeader: React.FC<TruckFinderHeaderProps> = ({
  pageTitle,
  description,
  hasDiscount,
  couponApplied,
  applyCoupon,
  requestSubmitted,
  hideLanguageButton = false
}) => {
  return (
    <div className="mb-6 flex justify-between items-start">
      <div>
        <div className="flex items-center mb-2">
          <Link to="/customer-dashboard" className="text-muted-foreground hover:text-primary mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          {!hideLanguageButton && (
            <div className="mr-2">
              <LanguageSelector />
            </div>
          )}
        </div>
        <p className="text-muted-foreground mb-4 max-w-2xl">{description}</p>
        
        {!requestSubmitted && hasDiscount && !couponApplied && (
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
            onClick={applyCoupon}
          >
            <Gift className="h-4 w-4 mr-2" />
            تطبيق خصم 18% (عملاء زكرت المميزين)
          </Button>
        )}
      </div>
    </div>
  );
};

export default TruckFinderHeader;
