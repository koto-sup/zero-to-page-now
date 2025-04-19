
import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TruckType } from "@/utils/truckUtils";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { user, isAdmin } = useAuth();
  const { language } = useLanguage();
  
  // Check if the current user has admin privileges
  const hasAdminPrivileges = user && (user.role === "admin" || isAdmin(user.id));

  const handleImageClick = () => {
    if (hasAdminPrivileges && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(type.id, file);
      toast.success(
        language === "en" 
          ? "Truck image updated successfully" 
          : "تم تحديث صورة الشاحنة بنجاح"
      );
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
          className="relative ml-4 p-3 rounded-xl bg-blue-50 flex items-center justify-center dark:bg-blue-950/30" 
          style={{ width: "160px", height: "160px" }}
        >
          {type.image ? (
            <img 
              src={type.image} 
              alt={type.name} 
              className="max-w-full max-h-full object-contain" 
              onClick={handleImageClick}
            />
          ) : (
            <div className="scale-[1.8]" onClick={handleImageClick}>
              {type.icon}
            </div>
          )}
          {hasAdminPrivileges && (
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
