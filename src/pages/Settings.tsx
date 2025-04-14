
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "next-themes";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = React.useState(16);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">الإعدادات</h1>
          
          <div className="space-y-6">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
