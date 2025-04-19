
import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/contexts/AuthContext";
import { Truck, User, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UserTypeSelectionProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  showAdmin?: boolean;
}

export const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ 
  role, 
  onRoleChange,
  showAdmin = false
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-3">
      <Label className="block dark:text-foreground">
        {language === "en" ? "Account Type" : "نوع الحساب"}
      </Label>
      <RadioGroup
        value={role}
        onValueChange={(value) => onRoleChange(value as UserRole)}
        className="flex flex-col space-y-2"
      >
        <div 
          className={`p-3 border rounded-lg cursor-pointer flex items-center transition-colors ${
            role === "customer" ? "bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
          }`}
          onClick={() => onRoleChange("customer")}
        >
          <div className="ml-4 p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="mr-4">
            <div className="font-medium dark:text-gray-100">
              {language === "en" ? "Customer" : "عميل"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {language === "en" ? "Looking for refrigerated trucks" : "أبحث عن شاحنات مبردة"}
            </div>
          </div>
        </div>
        
        <div 
          className={`p-3 border rounded-lg cursor-pointer flex items-center transition-colors ${
            role === "driver" ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
          }`}
          onClick={() => onRoleChange("driver")}
        >
          <div className="ml-4 p-2 bg-green-100 rounded-full dark:bg-green-900/30">
            <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="mr-4">
            <div className="font-medium dark:text-gray-100">
              {language === "en" ? "Driver" : "سائق"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {language === "en" ? "I own/operate refrigerated trucks" : "أملك/أدير شاحنات مبردة"}
            </div>
          </div>
        </div>

        {showAdmin && (
          <div 
            className={`p-3 border rounded-lg cursor-pointer flex items-center transition-colors ${
              role === "admin" ? "bg-purple-100 border-purple-500 dark:bg-purple-900/30 dark:border-purple-500" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
            }`}
            onClick={() => onRoleChange("admin")}
          >
            <div className="ml-4 p-2 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="mr-4">
              <div className="font-medium dark:text-gray-100">
                {language === "en" ? "Administrator" : "مسؤول"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {language === "en" ? "Manage the platform and users" : "إدارة المنصة والمستخدمين"}
              </div>
            </div>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};
