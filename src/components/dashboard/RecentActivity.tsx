
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const RecentActivity: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl">
            <Clock className="ml-2 h-5 w-5 text-moprd-teal" />
            {language === 'en' ? "Recent Activities" : "آخر النشاطات"}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {language === 'en' ? "Back" : "رجوع"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-r-2 border-moprd-teal pr-4 relative">
            <div className="absolute top-0 right-[-9px] w-4 h-4 rounded-full bg-moprd-teal"></div>
            <p className="text-sm text-gray-500">{language === 'en' ? "2 hours ago" : "منذ 2 ساعة"}</p>
            <p>{language === 'en' ? "Searched for nearby trucks" : "تم البحث عن شاحنات قريبة"}</p>
          </div>
          <div className="border-r-2 border-moprd-blue pr-4 relative">
            <div className="absolute top-0 right-[-9px] w-4 h-4 rounded-full bg-moprd-blue"></div>
            <p className="text-sm text-gray-500">{language === 'en' ? "1 day ago" : "منذ يوم واحد"}</p>
            <p>{language === 'en' ? "Requested a quote from Khalid the driver" : "تم طلب عرض سعر من خالد السائق"}</p>
          </div>
          <div className="border-r-2 border-gray-300 pr-4 relative">
            <div className="absolute top-0 right-[-9px] w-4 h-4 rounded-full bg-gray-300"></div>
            <p className="text-sm text-gray-500">{language === 'en' ? "3 days ago" : "منذ 3 أيام"}</p>
            <p>{language === 'en' ? "Account registration completed" : "اكتمال تسجيل الحساب"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
