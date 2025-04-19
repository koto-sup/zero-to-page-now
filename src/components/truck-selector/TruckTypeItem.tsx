
import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TruckType } from "@/utils/truckUtils";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface TruckTypeItemProps {
  type: TruckType;
  isSelected: boolean;
  discountText: string;
  onImageChange?: (typeId: string, file: File) => void;
}

export const TruckTypeItem: React.FC<TruckTypeItemProps> = ({ 
  type, 
  isSelected, 
  discountText,
  onImageChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  // Since UserRole is only "customer" | "driver", we need to add a check for admin privileges
  // This could be determined by a special flag or property instead of role
  const isAdmin = user?.id === "driver-1"; // Temporary solution: checking if it's our mock admin user

  const handleImageClick = () => {
    if (isAdmin && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(type.id, file);
    }
  };

  return (
    <div className="flex items-center">
      <RadioGroupItem value={type.id} id={`truck-type-${type.id}`} />
      <Label 
        htmlFor={`truck-type-${type.id}`} 
        className="flex items-center mr-2 p-4 cursor-pointer w-full hover:bg-muted/20 rounded-lg transition-colors"
      >
        <div 
          className="relative ml-4 p-3 rounded-xl bg-blue-50 flex items-center justify-center" 
          style={{ width: "140px", height: "140px" }}
        >
          {type.image ? (
            <img 
              src={type.image} 
              alt={type.name} 
              className="max-w-full max-h-full object-contain" 
              onClick={handleImageClick}
            />
          ) : (
            <div className="scale-150" onClick={handleImageClick}>
              {type.icon}
            </div>
          )}
          {isAdmin && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-2 right-2 bg-background/80 hover:bg-background"
                onClick={handleImageClick}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <div className="ml-4">
          <div className="font-medium text-xl mb-1">{type.name}</div>
          <div className="text-sm text-muted-foreground">
            {type.price}
            {type.description && (
              <div className="text-sm text-muted-foreground mt-2">{type.description}</div>
            )}
            {isSelected && !type.description && (
              <span className="mr-2 text-green-600 font-semibold">
                {discountText}
              </span>
            )}
          </div>
        </div>
      </Label>
    </div>
  );
};
