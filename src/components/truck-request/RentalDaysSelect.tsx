
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RentalDaysSelectProps {
  onDaysChange: (value: number) => void;
}

const RentalDaysSelect: React.FC<RentalDaysSelectProps> = ({ onDaysChange }) => {
  return (
    <div className="border-b pb-4">
      <span className="block mb-2">عدد أيام الإيجار:</span>
      <Select onValueChange={(val) => onDaysChange(parseInt(val))} defaultValue="1">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر عدد الأيام" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 يوم</SelectItem>
          <SelectItem value="2">2 يوم</SelectItem>
          <SelectItem value="3">3 أيام</SelectItem>
          <SelectItem value="7">أسبوع</SelectItem>
          <SelectItem value="30">شهر</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RentalDaysSelect;
