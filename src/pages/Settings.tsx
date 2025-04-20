
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Trash2, Volume2, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import LanguageSelector from "@/components/LanguageSelector";

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
    const confirmMessage = language === "en"
      ? "Are you sure you want to delete your account? This action cannot be undone."
      : "هل أنت متأكد أنك تريد حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.";
      
    if (window.confirm(confirmMessage)) {
      // Here you would implement the actual account deletion logic
      await logout();
      navigate('/login');
      
      const successMessage = language === "en"
        ? "Account deleted successfully"
        : "تم حذف الحساب بنجاح";
        
      toast.success(successMessage);
    }
  };

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {language === "en" ? "Settings" : "الإعدادات"}
          </h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
              {language === "en" ? "Settings" : "الإعدادات"}
            </h1>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-right">
                  {language === "en" ? "Language" : "اللغة"}
                </h2>
                <div className="space-y-2 grid grid-cols-1 gap-2">
                  {languages.map((lang) => (
                    <div 
                      key={lang.code}
                      className={`p-3 rounded-md border flex items-center justify-between cursor-pointer ${
                        language === lang.code 
                          ? "bg-primary/10 border-primary" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => changeLanguage(lang.code as any)}
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {language === lang.code && (
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-right">
                  {language === "en" ? "Appearance" : "المظهر"}
                </h2>
                <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
                  <div className="flex items-center justify-end">
                    <Label htmlFor="light" className="mr-2">
                      {language === "en" ? "Light" : "فاتح"}
                    </Label>
                    <RadioGroupItem value="light" id="light" />
                  </div>
                  <div className="flex items-center justify-end">
                    <Label htmlFor="dark" className="mr-2">
                      {language === "en" ? "Dark" : "داكن"}
                    </Label>
                    <RadioGroupItem value="dark" id="dark" />
                  </div>
                  <div className="flex items-center justify-end">
                    <Label htmlFor="system" className="mr-2">
                      {language === "en" ? "System" : "حسب النظام"}
                    </Label>
                    <RadioGroupItem value="system" id="system" />
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-right">
                  {language === "en" ? "Font Size" : "حجم الخط"}
                </h2>
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
                <h2 className="text-xl font-semibold mb-4 text-right">
                  {language === "en" ? "Notifications" : "الإشعارات"}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">
                      {language === "en" ? "Enable Notifications" : "تفعيل الإشعارات"}
                    </Label>
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
                    <Label htmlFor="sound">
                      {language === "en" ? "Sounds" : "الأصوات"}
                    </Label>
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
                <h2 className="text-xl font-semibold mb-4 text-right text-destructive">
                  {language === "en" ? "Advanced Settings" : "إعدادات متقدمة"}
                </h2>
                <Button
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="h-4 w-4" />
                  {language === "en" ? "Delete Account" : "حذف الحساب"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
