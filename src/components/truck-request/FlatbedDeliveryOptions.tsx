
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FlatbedDeliveryOptionsProps {
  onFlatbedDeliveryOptionChange: (value: string) => void;
}

const FlatbedDeliveryOptions: React.FC<FlatbedDeliveryOptionsProps> = ({ onFlatbedDeliveryOptionChange }) => {
  return (
    <div className="border-b pb-4">
      <span className="block mb-2">خيار النقل:</span>
      <RadioGroup defaultValue="none" onValueChange={onFlatbedDeliveryOptionChange} className="space-y-2">
        <div className="flex items-center">
          <RadioGroupItem value="none" id="no-delivery" />
          <Label htmlFor="no-delivery" className="mr-2">بدون توصيل (أملك وسيلة نقل)</Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="delivery" id="delivery" />
          <Label htmlFor="delivery" className="mr-2">توصيل فقط (238 ريال)</Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="roundtrip" id="roundtrip" />
          <Label htmlFor="roundtrip" className="mr-2">توصيل وإرجاع (488 ريال)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default FlatbedDeliveryOptions;
