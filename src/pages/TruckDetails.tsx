
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ChevronLeft, CircleDollarSign, Info, Snowflake } from "lucide-react";
import TruckTypeSelector from "@/components/TruckTypeSelector";

const TruckDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [truckType, setTruckType] = useState("refrigerated");
  const [isAvailable, setIsAvailable] = useState(true);
  const [plateNumber, setPlateNumber] = useState("");
  const [truckModel, setTruckModel] = useState("");
  const [truckDescription, setTruckDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("110");
  const [loading, setLoading] = useState(false);

  // Calculate discounted price (15% off)
  const discountedPrice = Math.round(Number(hourlyRate) * 0.85);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plateNumber || !truckModel || !hourlyRate) {
      toast.error("الرجاء إدخال جميع البيانات المطلوبة");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("تم تحديث معلومات المركبة بنجاح");
      navigate("/dashboard");
    }, 1000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!user || user.role !== "driver") {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>غير مصرح بالوصول. يجب عليك تسجيل الدخول كسائق.</p>
        <IceButtonV2 
          className="mt-4"
          onClick={() => navigate("/login")}
        >
          تسجيل الدخول
        </IceButtonV2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <IceButtonV2 
          variant="ghost" 
          className="flex items-center mb-4"
          onClick={handleGoBack}
          iceDrips={false}
          iceGlow={false}
        >
          <ChevronLeft className="ml-2 h-4 w-4" />
          رجوع
        </IceButtonV2>
        <h1 className="text-3xl font-bold mb-4">معلومات المركبة</h1>
        <p className="text-gray-600">
          أضف أو عدل معلومات مركبتك لتعرض خدماتك على زكرت
        </p>
      </div>

      <div className="space-y-6">
        <TruckTypeSelector
          selectedTruckType={truckType}
          onTruckTypeChange={setTruckType}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>تفاصيل المركبة</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plateNumber">رقم اللوحة</Label>
                  <Input
                    id="plateNumber"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    placeholder="أدخل رقم لوحة المركبة"
                    className="ice-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="truckModel">موديل المركبة</Label>
                  <Input
                    id="truckModel"
                    value={truckModel}
                    onChange={(e) => setTruckModel(e.target.value)}
                    placeholder="مثال: كاتربيلر 2023"
                    className="ice-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="flex items-center">
                  السعر بالساعة (ريال)
                  <div className="relative group ml-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <div className="absolute bottom-full mb-2 p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity w-48 pointer-events-none">
                      سيتم خصم 15% كرسوم من هذا المبلغ عند التعاقد
                    </div>
                  </div>
                </Label>
                <div className="relative">
                  <CircleDollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="hourlyRate"
                    type="number"
                    min="50"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="pr-10 ice-input"
                  />
                </div>
                <div className="text-sm text-muted-foreground flex items-center justify-between">
                  <div>السعر الذي يراه العميل: <span className="text-green-600 font-medium">{discountedPrice} ريال/ساعة</span></div>
                  <div>الرسوم: <span className="text-red-500">{Math.round(Number(hourlyRate) * 0.15)} ريال/ساعة</span></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="truckDescription">وصف المركبة</Label>
                <Textarea
                  id="truckDescription"
                  value={truckDescription}
                  onChange={(e) => setTruckDescription(e.target.value)}
                  placeholder="اكتب وصفًا للمركبة وخدماتك"
                  rows={4}
                  className="ice-input"
                />
              </div>
              
              <div className="flex items-center space-x-2 justify-end">
                <div className="flex items-center gap-2">
                  <Snowflake className={`h-5 w-5 ${isAvailable ? "text-cyan-600" : "text-gray-400"}`} />
                  <Label htmlFor="available" className="ml-2">متاح للعمل حاليًا</Label>
                  <Switch
                    id="available"
                    checked={isAvailable}
                    onCheckedChange={setIsAvailable}
                    className="ice-switch"
                  >
                    <div className="ice-switch-thumb" />
                  </Switch>
                </div>
              </div>
              
              <div className="pt-4">
                <IceButtonV2 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                  sparkle={true}
                >
                  {loading ? "جاري الحفظ..." : "حفظ معلومات المركبة"}
                </IceButtonV2>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TruckDetails;
