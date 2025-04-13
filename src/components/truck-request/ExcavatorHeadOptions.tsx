
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExcavatorHeadOptionsProps {
  onExcavatorHeadChange: (value: string) => void;
}

const ExcavatorHeadOptions: React.FC<ExcavatorHeadOptionsProps> = ({ onExcavatorHeadChange }) => {
  return (
    <div className="border-b pb-4">
      <span className="block mb-2">نوع رأس الحفار:</span>
      <Select onValueChange={onExcavatorHeadChange} defaultValue="buckets">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر نوع الرأس" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="compactor">دكاك</SelectItem>
          <SelectItem value="wood-grab">قابض خشب</SelectItem>
          <SelectItem value="auger">مثقاب</SelectItem>
          <SelectItem value="grapples">كلابات</SelectItem>
          <SelectItem value="buckets">دلاء</SelectItem>
          <SelectItem value="hammers">مطارق</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExcavatorHeadOptions;
