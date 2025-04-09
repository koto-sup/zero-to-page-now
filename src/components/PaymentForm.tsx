
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IceCardHeader, IceCardTitle, IceCardDescription } from "@/components/ui/ice-card";
import { toast } from "sonner";
import { Loader2, CreditCard, Check } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onPaymentSuccess, onPaymentCancel }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error("يرجى تعبئة جميع حقول بطاقة الائتمان");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <IceCardHeader>
        <IceCardTitle>معلومات الدفع</IceCardTitle>
        <IceCardDescription>
          يرجى إدخال بيانات بطاقتك الائتمانية لإتمام الدفع
        </IceCardDescription>
      </IceCardHeader>
      
      <div className="p-6">
        {!isComplete ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">رقم البطاقة</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="pl-10 ice-input"
                  dir="ltr"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardName">اسم حامل البطاقة</Label>
              <Input
                id="cardName"
                placeholder="الاسم كما يظهر على البطاقة"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="ice-input"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                  dir="ltr"
                  className="ice-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={3}
                  dir="ltr"
                  className="ice-input"
                />
              </div>
            </div>
            
            <div className="pt-2 text-lg font-medium text-center">
              المبلغ الإجمالي: {amount} ريال
            </div>
            
            <div className="flex gap-4 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={onPaymentCancel}
                disabled={isProcessing}
              >
                إلغاء
              </Button>
              <IceButtonV2 
                className="flex-1"
                disabled={isProcessing}
                onClick={handleSubmit}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  "إتمام الدفع"
                )}
              </IceButtonV2>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">تم الدفع بنجاح!</h3>
            <p className="text-gray-500 mb-4">شكراً لك. تمت معالجة الدفع بنجاح.</p>
            <p className="text-gray-500 mb-4">جاري الانتقال إلى صفحة تتبع السائق...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentForm;
