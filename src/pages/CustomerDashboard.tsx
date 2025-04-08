
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MapPin, Bell, Truck, Clock, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TruckMap from "@/components/TruckMap";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate loading AI notifications
    const timer = setTimeout(() => {
      setNotifications([
        "شاحنة مبردة متاحة على بعد 1.2 كم من موقعك!",
        "نلاحظ أنك تبحث عن شاحنات بسعة تبريد عالية، هناك 3 شاحنات متاحة الآن",
        "تحذير: هناك اختناق مروري في الطريق المفضل لديك، يرجى التخطيط وفقًا لذلك"
      ]);
      
      // Show the first notification as a toast
      toast.success("شاحنة مبردة متاحة بالقرب منك!", {
        description: "شاحنة على بعد 1.2 كم من موقعك، اضغط للتفاصيل",
        action: {
          label: "عرض",
          onClick: () => window.location.href = "/find-trucks"
        }
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const nearbyTrucks = [
    {
      id: "truck-1",
      driverName: "خالد السائق",
      truckModel: "شاحنة مبردة XL",
      distance: 1.2,
      available: true
    },
    {
      id: "truck-2",
      driverName: "محمد السائق",
      truckModel: "ناقل بارد برو",
      distance: 2.4,
      available: true
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">مرحبا، {user?.name}</h1>
          <p className="text-gray-600">مرحبا بك في لوحة تحكم زكرت</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/find-trucks">
            <Button className="bg-moprd-teal hover:bg-moprd-blue">
              <Truck className="ml-2 h-4 w-4" />
              البحث عن شاحنات
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Map Section */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl">
            <MapPin className="ml-2 h-5 w-5 text-moprd-teal" />
            شاحنات قريبة منك
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full relative rounded-md overflow-hidden mb-4">
            <TruckMap />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {nearbyTrucks.map((truck) => (
              <div key={truck.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div>
                  <div className="font-medium">{truck.driverName}</div>
                  <div className="text-sm text-gray-500">{truck.truckModel} • {truck.distance} كم</div>
                </div>
                <Badge className={truck.available ? "bg-green-500" : "bg-red-500"}>
                  {truck.available ? "متاح" : "غير متاح"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <Bell className="ml-2 h-5 w-5 text-moprd-teal" />
              توصيات ذكية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start bg-blue-50 p-4 rounded-md">
                  {index === 2 ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500 ml-3 flex-shrink-0 mt-0.5" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-moprd-teal ml-3 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={index === 2 ? "text-amber-700" : "text-moprd-blue"}>
                      {notification}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
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
      </div>
      
      {/* Upcoming Deliveries */}
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl">
            <Calendar className="ml-2 h-5 w-5 text-moprd-teal" />
            الشحنات المرتقبة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">ليس لديك أية شحنات قادمة حاليا</p>
              <Link to="/find-trucks">
                <Button variant="outline">البحث عن شاحنة</Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">يرجى تسجيل الدخول لعرض الشحنات المرتقبة</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
