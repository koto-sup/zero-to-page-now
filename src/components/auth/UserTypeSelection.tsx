
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, User } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";

interface UserTypeSelectionProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ 
  role, 
  onRoleChange 
}) => {
  return (
    <div className="space-y-2">
      <Label>أقوم بالتسجيل كـ:</Label>
      <RadioGroup value={role} onValueChange={(value) => onRoleChange(value as UserRole)}>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="customer" id="customer" />
            <Label htmlFor="customer" className="flex items-center cursor-pointer mr-2">
              <User className="h-4 w-4 ml-2" />
              عميل (أبحث عن شاحنات مبردة)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="driver" id="driver" />
            <Label htmlFor="driver" className="flex items-center cursor-pointer mr-2">
              <Truck className="h-4 w-4 ml-2" />
              سائق شاحنة (أقدم خدمات نقل مبردة)
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
