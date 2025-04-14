
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TruckSizeOptionsProps {
  onTruckSizeChange: (value: string) => void;
  truckType: string;
}

const TruckSizeOptions: React.FC<TruckSizeOptionsProps> = ({ onTruckSizeChange, truckType }) => {
  if (truckType === "dump-loader") {
    return (
      <div className="border-b pb-4">
        <span className="block mb-2">حجم الشاحنة:</span>
        <RadioGroup defaultValue="20ton" onValueChange={onTruckSizeChange}>
          <div className="flex items-center">
            <RadioGroupItem value="20ton" id="20ton" />
            <Label htmlFor="20ton" className="mr-2">20 طن (18 متر مكعب) (786 ريال)</Label>
          </div>
        </RadioGroup>
      </div>
    );
  }
  
  return (
    <div className="border-b pb-4">
      <span className="block mb-2">حجم الشاحنة:</span>
      <RadioGroup defaultValue="3ton" onValueChange={onTruckSizeChange} className="flex gap-4">
        <div className="flex items-center">
          <RadioGroupItem value="3ton" id="3ton" />
          <Label htmlFor="3ton" className="mr-2">3 طن (387 ريال)</Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="5ton" id="5ton" />
          <Label htmlFor="5ton" className="mr-2">5 طن (487 ريال)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TruckSizeOptions;
