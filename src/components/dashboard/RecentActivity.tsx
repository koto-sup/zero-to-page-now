
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Clock className="ml-2 h-5 w-5 text-moprd-teal" />
          آخر النشاطات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-r-2 border-moprd-teal pr-4 relative">
            <div className="absolute top-0 right-[-9px] w-4 h-4 rounded-full bg-moprd-teal"></div>
            <p className="text-sm text-gray-500">منذ 2 ساعة</p>
            <p>تم البحث عن شاحنات قريبة</p>
          </div>
          <div className="border-r-2 border-moprd-blue pr-4 relative">
            <div className="absolute top-0 right-[-9px] w-4 h-4 rounded-full bg-moprd-blue"></div>
            <p className="text-sm text-gray-500">منذ يوم واحد</p>
            <p>تم طلب عرض سعر من خالد السائق</p>
          </div>
          <div className="border-r-2 border-gray-300 pr-4 relative">
            <div className="absolute top-0 right-[-9px] w-4 h-4 rounded-full bg-gray-300"></div>
            <p className="text-sm text-gray-500">منذ 3 أيام</p>
            <p>اكتمال تسجيل الحساب</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
