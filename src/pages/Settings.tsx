import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Volume2, Bell, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = React.useState(16);
  const [notifications, setNotifications] = React.useState(true);
  const [sound, setSound] = React.useState(true);
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.")) {
      // Here you would implement the actual account deletion logic
      await logout();
      navigate('/login');
      toast.success("تم حذف الحساب بنجاح");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          رجوع
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">الإعدادات</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-right">اللغة</h2>
              <RadioGroup value={language} onValueChange={changeLanguage} className="space-y-2">
                <div className="flex items-center justify-end">
                  <Label htmlFor="ar" className="mr-2">العربية</Label>
                  <RadioGroupItem value="ar" id="ar" />
                </div>
                <div className="flex items-center justify-end">
                  <Label htmlFor="en" className="mr-2">English</Label>
                  <RadioGroupItem value="en" id="en" />
                </div>
              </RadioGroup>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-right">المظهر</h2>
              <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
                <div className="flex items-center justify-end">
                  <Label htmlFor="light" className="mr-2">فاتح</Label>
                  <RadioGroupItem value="light" id="light" />
                </div>
                <div className="flex items-center justify-end">
                  <Label htmlFor="dark" className="mr-2">داكن</Label>
                  <RadioGroupItem value="dark" id="dark" />
                </div>
                <div className="flex items-center justify-end">
                  <Label htmlFor="system" className="mr-2">حسب النظام</Label>
                  <RadioGroupItem value="system" id="system" />
                </div>
              </RadioGroup>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-right">حجم الخط</h2>
              <div className="space-y-2">
                <Slider
                  value={[fontSize]}
                  onValueChange={handleFontSizeChange}
                  min={12}
                  max={24}
                  step={1}
                />
                <div className="text-center">{fontSize}px</div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-right">الإشعارات</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">تفعيل الإشعارات</Label>
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sound">الأصوات</Label>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Switch
                      id="sound"
                      checked={sound}
                      onCheckedChange={setSound}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4 text-right text-destructive">إعدادات متقدمة</h2>
              <Button
                variant="destructive"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="h-4 w-4" />
                حذف الحساب
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
