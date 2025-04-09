
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import TruckTypeSelector from "@/components/TruckTypeSelector";

const TruckDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [truckType, setTruckType] = useState("refrigerated");
  const [isAvailable, setIsAvailable] = useState(true);
  const [plateNumber, setPlateNumber] = useState("");
  const [truckModel, setTruckModel] = useState("");
  const [truckDescription, setTruckDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plateNumber || !truckModel) {
      toast.error("الرجاء إدخال جميع البيانات المطلوبة");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("تم تحديث معلومات الشاحنة بنجاح");
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
        <Button 
          className="mt-4 bg-moprd-teal hover:bg-moprd-blue"
          onClick={() => navigate("/login")}
        >
          تسجيل الدخول
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="flex items-center mb-4"
          onClick={handleGoBack}
        >
          <ChevronLeft className="ml-2 h-4 w-4" />
          رجوع
        </Button>
        <h1 className="text-3xl font-bold mb-4">معلومات الشاحنة</h1>
        <p className="text-gray-600">
          أضف أو عدل معلومات شاحنتك لتعرض خدماتك على زكرت
        </p>
      </div>

      <div className="space-y-6">
        <TruckTypeSelector
          selectedTruckType={truckType}
          onTruckTypeChange={setTruckType}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الشاحنة</CardTitle>
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
                    placeholder="أدخل رقم لوحة الشاحنة"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="truckModel">موديل الشاحنة</Label>
                  <Input
                    id="truckModel"
                    value={truckModel}
                    onChange={(e) => setTruckModel(e.target.value)}
                    placeholder="مثال: مرسيدس أكتروس 2023"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="truckDescription">وصف الشاحنة</Label>
                <Textarea
                  id="truckDescription"
                  value={truckDescription}
                  onChange={(e) => setTruckDescription(e.target.value)}
                  placeholder="اكتب وصفًا للشاحنة وخدماتك"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2 justify-end">
                <Label htmlFor="available" className="ml-2">متاح للعمل حاليًا</Label>
                <Switch
                  id="available"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-moprd-teal hover:bg-moprd-blue"
                  disabled={loading}
                >
                  {loading ? "جاري الحفظ..." : "حفظ معلومات الشاحنة"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TruckDetails;
