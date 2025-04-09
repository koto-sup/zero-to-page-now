
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { IceCard, IceCardHeader, IceCardContent, IceCardFooter, IceCardTitle } from "@/components/ui/ice-card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { DollarSign, Clock, Map, Package, X, Check, AlertTriangle, User, MapPin, SnowflakeIcon } from "lucide-react";

interface PriceQuoteFormProps {
  tripDetails: {
    customerId: string;
    customerName: string;
    pickupLocation: string;
    dropoffLocation: string;
    estimatedDistance: number;
    cargoType: string;
    estimatedPrice: number;
  };
  onSubmit: (price: number) => void;
  onCancel: () => void;
}

const PriceQuoteForm: React.FC<PriceQuoteFormProps> = ({ tripDetails, onSubmit, onCancel }) => {
  const [price, setPrice] = useState(tripDetails.estimatedPrice);
  const [notes, setNotes] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (price < 0.5 * tripDetails.estimatedPrice) {
      toast.error("السعر منخفض جدًا", {
        description: "يجب ألا يقل السعر عن 50% من السعر المقترح"
      });
      return;
    }
    
    if (price > 2 * tripDetails.estimatedPrice) {
      toast.error("السعر مرتفع جدًا", {
        description: "يجب ألا يزيد السعر عن ضعف السعر المقترح"
      });
      return;
    }
    
    onSubmit(price);
    toast.success("تم إرسال عرض السعر بنجاح");
  };

  // Calculate profit based on price and estimated costs
  const estimatedFuelCost = Math.round(tripDetails.estimatedDistance * 0.5);
  const estimatedServiceFee = Math.round(price * 0.07);
  const estimatedProfit = price - estimatedFuelCost - estimatedServiceFee;
  
  const profitPercentage = (estimatedProfit / price) * 100;
  const profitColor = 
    profitPercentage < 20 ? "text-red-500" : 
    profitPercentage < 35 ? "text-amber-500" : 
    "text-green-500";

  return (
    <IceCard className="w-full max-w-2xl mx-auto">
      <IceCardHeader>
        <div className="flex items-center justify-between">
          <IceCardTitle className="text-xl flex items-center">
            <SnowflakeIcon className="mr-2 h-5 w-5 text-cyan-500" />
            <span>تقديم عرض سعر</span>
          </IceCardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </IceCardHeader>
      
      <IceCardContent>
        <div className="mb-6 p-4 bg-cyan-50 rounded-lg border border-cyan-100">
          <h3 className="font-medium mb-3 text-lg">تفاصيل الطلب</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center ml-2">
                  <User className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">العميل</div>
                  <div className="font-medium">{tripDetails.customerName}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center ml-2">
                  <Package className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">نوع البضاعة</div>
                  <div className="font-medium">{tripDetails.cargoType}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center ml-2">
                  <Map className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">المسافة التقديرية</div>
                  <div className="font-medium">{tripDetails.estimatedDistance} كم</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center ml-2">
                  <Clock className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">الوقت التقديري</div>
                  <div className="font-medium">{Math.round(tripDetails.estimatedDistance / 60)} ساعة و {Math.round(tripDetails.estimatedDistance % 60)} دقيقة</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-cyan-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center ml-2">
                <MapPin className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">من</div>
                <div className="font-medium">{tripDetails.pickupLocation}</div>
              </div>
            </div>
            
            <div className="my-2 border-r-2 border-dashed border-cyan-300 h-6 mr-4"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center ml-2">
                <MapPin className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">إلى</div>
                <div className="font-medium">{tripDetails.dropoffLocation}</div>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">السعر المقترح</label>
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <span>{Math.round(0.5 * tripDetails.estimatedPrice)} ر.س</span>
              <span>{tripDetails.estimatedPrice} ر.س</span>
              <span>{Math.round(1.5 * tripDetails.estimatedPrice)} ر.س</span>
            </div>
            <Slider
              value={[price]}
              min={Math.round(0.5 * tripDetails.estimatedPrice)}
              max={Math.round(1.5 * tripDetails.estimatedPrice)}
              step={10}
              className="my-6"
              onValueChange={(value) => setPrice(value[0])}
            />
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-cyan-500 mr-2" />
                <Input 
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-24 text-lg font-bold"
                />
                <span className="mr-2 font-bold">ر.س</span>
              </div>
              
              {price !== tripDetails.estimatedPrice && (
                <div className="text-sm">
                  {price < tripDetails.estimatedPrice ? (
                    <span className="text-green-600">أقل من السعر المقترح بنسبة {Math.round((1 - price / tripDetails.estimatedPrice) * 100)}%</span>
                  ) : (
                    <span className="text-amber-500">أعلى من السعر المقترح بنسبة {Math.round((price / tripDetails.estimatedPrice - 1) * 100)}%</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-white rounded-lg border shadow-sm">
              <div className="text-sm text-gray-500">تكلفة الوقود (تقديرية)</div>
              <div className="text-lg font-semibold">{estimatedFuelCost} ر.س</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border shadow-sm">
              <div className="text-sm text-gray-500">رسوم الخدمة (7%)</div>
              <div className="text-lg font-semibold">{estimatedServiceFee} ر.س</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border shadow-sm">
              <div className="text-sm text-gray-500">صافي الربح (تقديري)</div>
              <div className={`text-lg font-semibold ${profitColor}`}>{estimatedProfit} ر.س</div>
            </div>
          </div>
          
          {estimatedProfit < 50 && (
            <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="text-amber-500 h-5 w-5 ml-2 flex-shrink-0" />
              <p className="text-sm text-amber-800">الربح المتوقع منخفض. يرجى التحقق من السعر المقترح.</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">ملاحظات إضافية (اختياري)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أضف أي تفاصيل إضافية عن العرض..."
              className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
            />
          </div>
        </form>
      </IceCardContent>
      
      <IceCardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <IceButtonV2 onClick={handleSubmit}>
          <Check className="ml-2 h-4 w-4" />
          إرسال العرض
        </IceButtonV2>
      </IceCardFooter>
    </IceCard>
  );
};

export default PriceQuoteForm;
