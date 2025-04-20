
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminSettingsProps {
  onSaved?: () => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ onSaved }) => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    platformFee: "18",
    driverVerification: true,
    autoApproveDrivers: false,
    minBookingTime: "2",
    maxCancellationTime: "24",
    cancellationFee: "10",
    systemNotice: "",
    defaultDriverRating: "4.5",
    paymentGateway: "stripe"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleToggle = (name: string, value: boolean) => {
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to save settings
    setTimeout(() => {
      setIsLoading(false);
      toast.success(language === 'en' ? "Settings saved successfully" : "تم حفظ الإعدادات بنجاح");
      if (onSaved) onSaved();
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{language === 'en' ? "Platform Settings" : "إعدادات المنصة"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platformFee">{language === 'en' ? "Platform Fee (%)" : "رسوم المنصة (%)"}</Label>
              <Input
                id="platformFee"
                name="platformFee"
                type="number"
                value={settings.platformFee}
                onChange={handleChange}
                className="ice-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minBookingTime">
                {language === 'en' ? "Minimum Booking Time (hours)" : "الحد الأدنى لوقت الحجز (ساعات)"}
              </Label>
              <Input
                id="minBookingTime"
                name="minBookingTime"
                type="number"
                value={settings.minBookingTime}
                onChange={handleChange}
                className="ice-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxCancellationTime">
                {language === 'en' ? "Maximum Cancellation Time (hours)" : "الحد الأقصى لوقت الإلغاء (ساعات)"}
              </Label>
              <Input
                id="maxCancellationTime"
                name="maxCancellationTime"
                type="number"
                value={settings.maxCancellationTime}
                onChange={handleChange}
                className="ice-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cancellationFee">
                {language === 'en' ? "Cancellation Fee (%)" : "رسوم الإلغاء (%)"}
              </Label>
              <Input
                id="cancellationFee"
                name="cancellationFee"
                type="number"
                value={settings.cancellationFee}
                onChange={handleChange}
                className="ice-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultDriverRating">
                {language === 'en' ? "Default Driver Rating" : "التقييم الافتراضي للسائق"}
              </Label>
              <Input
                id="defaultDriverRating"
                name="defaultDriverRating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={settings.defaultDriverRating}
                onChange={handleChange}
                className="ice-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentGateway">
                {language === 'en' ? "Payment Gateway" : "بوابة الدفع"}
              </Label>
              <Select 
                value={settings.paymentGateway}
                onValueChange={(value) => handleSelectChange("paymentGateway", value)}
              >
                <SelectTrigger id="paymentGateway">
                  <SelectValue placeholder={language === 'en' ? "Select payment gateway" : "اختر بوابة الدفع"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stcpay">STC Pay</SelectItem>
                  <SelectItem value="mada">Mada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 py-2">
            <Label htmlFor="driverVerification" className="flex-grow">
              {language === 'en' ? "Require Driver Verification" : "التحقق من السائق مطلوب"}
            </Label>
            <Switch
              id="driverVerification"
              checked={settings.driverVerification}
              onCheckedChange={(checked) => handleToggle("driverVerification", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between gap-4 py-2">
            <Label htmlFor="autoApproveDrivers" className="flex-grow">
              {language === 'en' ? "Auto-approve New Drivers" : "الموافقة التلقائية على السائقين الجدد"}
            </Label>
            <Switch
              id="autoApproveDrivers"
              checked={settings.autoApproveDrivers}
              onCheckedChange={(checked) => handleToggle("autoApproveDrivers", checked)}
            />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="systemNotice">
              {language === 'en' ? "System Notice (displayed to all users)" : "إشعار النظام (يظهر لجميع المستخدمين)"}
            </Label>
            <Textarea
              id="systemNotice"
              name="systemNotice"
              value={settings.systemNotice}
              onChange={handleChange}
              rows={3}
              placeholder={language === 'en' ? "Enter announcement or system notice" : "أدخل إعلان أو إشعار نظام"}
              className="ice-input"
            />
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (language === 'en' ? "Saving..." : "جاري الحفظ...") : (language === 'en' ? "Save Settings" : "حفظ الإعدادات")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
