
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RefrigeratedOptionsProps {
  onRefrigeratedOptionChange: (value: string) => void;
}

const RefrigeratedOptions: React.FC<RefrigeratedOptionsProps> = ({ onRefrigeratedOptionChange }) => {
  return (
    <div className="border-b pb-4">
      <span className="block mb-2">خيار التبريد:</span>
      <RadioGroup defaultValue="standard" onValueChange={onRefrigeratedOptionChange} className="flex flex-col gap-2">
        <div className="flex items-center">
          <RadioGroupItem value="standard" id="standard" />
          <Label htmlFor="standard" className="mr-2">بدون تبريد (عادي)</Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="refrigerated" id="refrigerated" />
          <Label htmlFor="refrigerated" className="mr-2">مع تبريد (إضافة 48 ريال)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RefrigeratedOptions;
