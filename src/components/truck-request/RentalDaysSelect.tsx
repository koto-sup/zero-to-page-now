
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface RentalDaysSelectProps {
  onDaysChange: (value: number) => void;
}

const RentalDaysSelect: React.FC<RentalDaysSelectProps> = ({ onDaysChange }) => {
  const { language } = useLanguage();
  
  // Get localized labels based on language
  const getLabel = (value: number, unit: string): string => {
    if (language === "en") {
      return `${value} ${unit}${value > 1 ? "s" : ""}`;
    } else {
      // Arabic labels
      if (unit === "day") {
        return value === 1 ? "يوم واحد" : `${value} أيام`;
      } else if (unit === "week") {
        return value === 1 ? "أسبوع واحد" : `${value} أسابيع`;
      } else if (unit === "month") {
        return value === 1 ? "شهر واحد" : (value < 11 ? `${value} أشهر` : `${value} شهر`);
      } else if (unit === "year") {
        return value === 1 ? "سنة واحدة" : `${value} سنوات`;
      }
      return `${value} ${unit}`;
    }
  };
  
  return (
    <div className="border-b pb-4">
      <span className="block mb-2">{language === "en" ? "Rental Period:" : "مدة الإيجار:"}</span>
      <Select onValueChange={(val) => onDaysChange(parseInt(val))} defaultValue="1">
        <SelectTrigger className="w-full">
          <SelectValue placeholder={language === "en" ? "Select rental period" : "اختر مدة الإيجار"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">{getLabel(1, "day")}</SelectItem>
          <SelectItem value="2">{getLabel(2, "day")}</SelectItem>
          <SelectItem value="3">{getLabel(3, "day")}</SelectItem>
          <SelectItem value="4">{getLabel(4, "day")}</SelectItem>
          <SelectItem value="5">{getLabel(5, "day")}</SelectItem>
          <SelectItem value="6">{getLabel(6, "day")}</SelectItem>
          <SelectItem value="7">{getLabel(7, "day")}</SelectItem>
          
          <SelectItem value="7">{getLabel(1, "week")}</SelectItem>
          <SelectItem value="14">{getLabel(2, "week")}</SelectItem>
          <SelectItem value="21">{getLabel(3, "week")}</SelectItem>
          
          <SelectItem value="30">{getLabel(1, "month")}</SelectItem>
          <SelectItem value="60">{getLabel(2, "month")}</SelectItem>
          <SelectItem value="90">{getLabel(3, "month")}</SelectItem>
          <SelectItem value="120">{getLabel(4, "month")}</SelectItem>
          <SelectItem value="150">{getLabel(5, "month")}</SelectItem>
          <SelectItem value="180">{getLabel(6, "month")}</SelectItem>
          <SelectItem value="210">{getLabel(7, "month")}</SelectItem>
          <SelectItem value="240">{getLabel(8, "month")}</SelectItem>
          <SelectItem value="270">{getLabel(9, "month")}</SelectItem>
          <SelectItem value="300">{getLabel(10, "month")}</SelectItem>
          <SelectItem value="330">{getLabel(11, "month")}</SelectItem>
          
          <SelectItem value="365">{getLabel(1, "year")}</SelectItem>
          <SelectItem value="730">{getLabel(2, "year")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RentalDaysSelect;
