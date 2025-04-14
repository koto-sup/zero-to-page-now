
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TruckType } from "@/utils/truckUtils";

interface TruckTypeItemProps {
  type: TruckType;
  isSelected: boolean;
  discountText: string;
}

export const TruckTypeItem: React.FC<TruckTypeItemProps> = ({ type, isSelected, discountText }) => {
  return (
    <div className="flex items-center">
      <RadioGroupItem value={type.id} id={`truck-type-${type.id}`} />
      <Label 
        htmlFor={`truck-type-${type.id}`} 
        className="flex items-center mr-2 p-2 cursor-pointer w-full hover:bg-muted/20 rounded-md transition-colors"
      >
        <div className="ml-3 p-1 rounded-full bg-blue-50 flex items-center justify-center" style={{ width: "48px", height: "48px" }}>
          {type.image ? (
            <img 
              src={type.image} 
              alt={type.name} 
              className="max-w-full max-h-full" 
            />
          ) : (
            type.icon
          )}
        </div>
        <div>
          <div className="font-medium">{type.name}</div>
          <div className="text-sm text-gray-500">
            {type.price}
            {type.description && (
              <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
            )}
            {isSelected && !type.description && (
              <span className="mr-2 text-green-600">
                {discountText}
              </span>
            )}
          </div>
        </div>
      </Label>
    </div>
  );
};
