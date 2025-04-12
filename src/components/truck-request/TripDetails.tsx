
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TripDetailsProps {
  distance: number;
  truckType: string;
  estimatedPrice: number;
  discountApplied?: boolean;
  loading: boolean;
  onSubmit: (e?: React.FormEvent) => void;
  onDaysChange?: (value: number) => void;
  onTruckSizeChange?: (value: string) => void;
  onExcavatorHeadChange?: (value: string) => void;
  onFlatbedDeliveryOptionChange?: (value: string) => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({
  distance,
  truckType,
  estimatedPrice,
  discountApplied = false,
  loading,
  onSubmit,
  onDaysChange,
  onTruckSizeChange,
  onExcavatorHeadChange,
  onFlatbedDeliveryOptionChange
}) => {
  // Map truck type IDs to Arabic names
  const getTruckTypeName = (type: string): string => {
    const truckTypeNames: Record<string, string> = {
      refrigerated: "شاحنة مبردة",
      transport: "شاحنة نقل",
      store: "شاحنة متجر",
      crane: "شاحنة رافعة",
      wood: "شاحنة نقل الأخشاب",
      tractor: "جرار زراعي",
      "loading-crane": "رافعة تحميل",
      bulldozer: "جرافة",
      "dump-truck": "شاحنة قلابة",
      "skid-steer": "لودر انزلاقي",
      flatbed: "شاحنة مسطحة",
      backhoe: "حفارة خلفية",
      "front-loader": "لودر أمامي",
      jcp: "شاحنة JCP",
      "water-truck": "شاحنة شفط المياه",
      "crawler-excavator": "حفارة زاحفة",
      "wheel-excavator": "حفارة بعجلات"
    };
    
    return truckTypeNames[type] || type;
  };

  // Determine if this truck type has day-based pricing
  const isDayBasedPricing = ["jcp", "dump-truck", "water-truck", "crawler-excavator", "wheel-excavator"].includes(truckType);

  // Determine if this truck requires special options
  const needsTruckSizeOptions = truckType === "dump-truck";
  const needsExcavatorHeadOptions = ["crawler-excavator", "wheel-excavator"].includes(truckType);
  const needsFlatbedOptions = truckType === "jcp";

  // Get price label based on truck type
  const getPriceLabel = () => {
    if (truckType === "refrigerated") return "السعر التقديري (لكل كم):";
    if (isDayBasedPricing) return "السعر (لليوم الواحد):";
    return "السعر التقديري:";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">تفاصيل الرحلة</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>المسافة التقديرية:</span>
              <span className="font-medium">{distance} كم</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span>نوع الشاحنة:</span>
              <span className="font-medium">
                {getTruckTypeName(truckType)}
              </span>
            </div>
            
            {truckType === "refrigerated" && (
              <div className="flex justify-between border-b pb-2">
                <span>وقت الوصول التقديري:</span>
                <span className="font-medium">{Math.round(distance * 5)} دقيقة</span>
              </div>
            )}
            
            {needsTruckSizeOptions && onTruckSizeChange && (
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
            )}
            
            {needsExcavatorHeadOptions && onExcavatorHeadChange && (
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
            )}
            
            {needsFlatbedOptions && onFlatbedDeliveryOptionChange && (
              <div className="border-b pb-4">
                <span className="block mb-2">خيار النقل:</span>
                <RadioGroup defaultValue="none" onValueChange={onFlatbedDeliveryOptionChange} className="space-y-2">
                  <div className="flex items-center">
                    <RadioGroupItem value="none" id="no-delivery" />
                    <Label htmlFor="no-delivery" className="mr-2">بدون توصيل (أملك وسيلة نقل)</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="mr-2">توصيل فقط (238 ريال)</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="roundtrip" id="roundtrip" />
                    <Label htmlFor="roundtrip" className="mr-2">توصيل وإرجاع (488 ريال)</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {isDayBasedPricing && onDaysChange && (
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
            )}
            
            <div className="flex justify-between text-lg font-semibold">
              <span>{getPriceLabel()}</span>
              <span className="text-green-600">
                {estimatedPrice} ريال
                {discountApplied && (
                  <span className="mr-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    خصم 15%
                  </span>
                )}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              {truckType === "refrigerated" ? 
                "السعر النهائي سيتم تحديده من قبل السائق بناءً على طلبك" : 
                "الأسعار تقديرية وقد تتغير حسب العرض والطلب والمسافة الفعلية"}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        type="submit" 
        className="w-full bg-moprd-teal hover:bg-moprd-blue h-12 text-lg"
        disabled={loading}
        onClick={(e) => onSubmit(e)}
      >
        {loading ? "جاري البحث..." : "البحث عن شاحنات"}
      </Button>
    </div>
  );
};

export default TripDetails;
