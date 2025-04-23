
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, UserIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UserTypeSelectionProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  showAdmin?: boolean;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  selectedRole,
  onRoleChange,
  showAdmin = false,
}) => {
  const { language } = useLanguage();

  const roles: { value: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: "customer",
      label: language === 'en' ? "Customer" : "عميل",
      icon: <UserIcon className="h-8 w-8 text-blue-500" />,
      description: language === 'en' 
        ? "I want to hire refrigerated trucks" 
        : "أرغب في استئجار شاحنات مبردة"
    },
    {
      value: "driver",
      label: language === 'en' ? "Driver" : "سائق",
      icon: <Truck className="h-8 w-8 text-green-500" />,
      description: language === 'en' 
        ? "I have a refrigerated truck and want to offer services"
        : "لدي شاحنة مبردة وأرغب في تقديم الخدمات"
    },
    // Only show admin role if explicitly enabled
    ...(showAdmin ? [{
      value: "admin" as UserRole,
      label: language === 'en' ? "Admin" : "مدير",
      icon: <UserIcon className="h-8 w-8 text-red-500" />,
      description: language === 'en' 
        ? "I want to manage the platform" 
        : "أرغب في إدارة المنصة"
    }] : [])
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">
          {language === 'en' ? "Account Type" : "نوع الحساب"}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {language === 'en' 
            ? "Select your account type to get started" 
            : "حدد نوع حسابك للبدء"
          }
        </p>
      </div>
      
      <RadioGroup
        value={selectedRole}
        onValueChange={(value) => onRoleChange(value as UserRole)}
        className="grid gap-4"
      >
        {roles.map((role) => (
          <div key={role.value}>
            <RadioGroupItem
              value={role.value}
              id={role.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={role.value}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-moprd-teal [&:has([data-state=checked])]:border-moprd-teal"
            >
              <Card className="w-full">
                <CardContent className="flex items-center p-4">
                  <div className="mr-4">
                    {role.icon}
                  </div>
                  <div>
                    <p className="font-medium">{role.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default UserTypeSelection;
