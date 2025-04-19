import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NearbyTrucksSection from "@/components/dashboard/NearbyTrucksSection";
// Fix imports to use default imports
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingDeliveries from "@/components/dashboard/UpcomingDeliveries";
import AiRecommendations from "@/components/dashboard/AiRecommendations";

const Dashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    switch (language) {
      case "en":
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
      case "fr":
        if (hour < 12) return "Bonjour";
        if (hour < 18) return "Bon après-midi";
        return "Bonsoir";
      case "es":
        if (hour < 12) return "Buenos días";
        if (hour < 18) return "Buenas tardes";
        return "Buenas noches";
      case "ur":
        if (hour < 12) return "صبح بخیر";
        if (hour < 18) return "دوپہر بخیر";
        return "شب بخیر";
      case "hi":
        if (hour < 12) return "शुभ प्रभात";
        if (hour < 18) return "शुभ दोपहर";
        return "शुभ संध्या";
      case "zh":
        if (hour < 12) return "早上好";
        if (hour < 18) return "下午好";
        return "晚上好";
      case "ar":
      default:
        if (hour < 12) return "صباح الخير";
        if (hour < 18) return "مساء الخير";
        return "مساء الخير";
    }
  };

  const handleAddTruck = () => {
    navigate("/truck-details");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader greeting={getGreeting()} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {language === "ar" ? "الرصيد الحالي" : "Current Balance"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {language === "ar" ? "5,200 ر.س" : "5,200 SAR"}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === "ar"
                ? "تم التحديث منذ دقيقة"
                : "Updated 1 minute ago"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {language === "ar" ? "الطلبات المكتملة" : "Completed Orders"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">34</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === "ar"
                ? "الشهر الحالي"
                : "Current month"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {language === "ar" ? "تقييم السائق" : "Driver Rating"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">4.7</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === "ar" ? "من 5 نجوم" : "Out of 5 stars"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {language === "ar" ? "إدارة المركبات" : "Vehicle Management"}
        </h2>
        {user?.role === "driver" && (
          <IceButtonV2 onClick={handleAddTruck}>
            {language === "ar" ? "إضافة / تعديل معلومات المركبة" : "Add / Edit Vehicle Info"}
          </IceButtonV2>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {language === "ar" ? "النشاط الأخير" : "Recent Activity"}
          </h2>
          <RecentActivity />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {language === "ar" ? "التسليمات القادمة" : "Upcoming Deliveries"}
          </h2>
          <UpcomingDeliveries />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {language === "ar" ? "توصيات الذكاء الاصطناعي" : "AI Recommendations"}
        </h2>
        <AiRecommendations />
      </div>

      <NearbyTrucksSection />
    </div>
  );
};

export default Dashboard;
