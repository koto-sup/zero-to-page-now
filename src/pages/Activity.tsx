
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Clock } from "lucide-react";

interface ActivityItem {
  path: string;
  timestamp: string;
}

const Activity = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  
  useEffect(() => {
    if (user) {
      // Get activity from session storage
      const userActivity = JSON.parse(sessionStorage.getItem('userActivity') || '[]');
      setActivities(userActivity);
    }
  }, [user]);
  
  const getTitle = () => {
    switch (language) {
      case "en": return "Recent Activity";
      case "fr": return "Activité Récente";
      case "es": return "Actividad Reciente";
      case "ur": return "حالیہ سرگرمی";
      case "hi": return "हालिया गतिविधि";
      case "zh": return "最近活动";
      case "ar":
      default: return "النشاطات الأخيرة";
    }
  };
  
  const getEmptyMessage = () => {
    switch (language) {
      case "en": return "No recent activity to display";
      case "fr": return "Aucune activité récente à afficher";
      case "es": return "No hay actividad reciente para mostrar";
      case "ur": return "دکھانے کے لیے کوئی حالیہ سرگرمی نہیں ہے";
      case "hi": return "प्रदर्शित करने के लिए कोई हालिया गतिविधि नहीं है";
      case "zh": return "没有最近活动可显示";
      case "ar":
      default: return "لا توجد نشاطات حديثة لعرضها";
    }
  };
  
  const getPageName = (path: string) => {
    // Convert path to readable name based on current language
    const pathMap: Record<string, Record<string, string>> = {
      "/": {
        "en": "Home", 
        "fr": "Accueil", 
        "es": "Inicio",
        "ur": "ہوم",
        "hi": "होम",
        "zh": "主页",
        "ar": "الرئيسية"
      },
      "/find-trucks": {
        "en": "Find Trucks", 
        "fr": "Rechercher des Camions", 
        "es": "Buscar Camiones",
        "ur": "ٹرک تلاش کریں",
        "hi": "ट्रक खोजें",
        "zh": "寻找卡车",
        "ar": "البحث عن شاحنات"
      },
      "/activity": {
        "en": "Activity", 
        "fr": "Activité", 
        "es": "Actividad",
        "ur": "سرگرمی",
        "hi": "गतिविधि",
        "zh": "活动",
        "ar": "النشاطات"
      },
      "/profile": {
        "en": "Profile", 
        "fr": "Profil", 
        "es": "Perfil",
        "ur": "پروفائل",
        "hi": "प्रोफाइल",
        "zh": "个人资料",
        "ar": "الملف الشخصي"
      },
      "/chat": {
        "en": "Messages", 
        "fr": "Messages", 
        "es": "Mensajes",
        "ur": "پیغامات",
        "hi": "संदेश",
        "zh": "消息",
        "ar": "المحادثات"
      }
    };
    
    const pageName = pathMap[path]?.[language] || path;
    return pageName;
  };
  
  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return timestamp;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-3xl font-bold mb-6">{getTitle()}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {getEmptyMessage()}
            </div>
          ) : (
            <div className="space-y-4">
              {activities.slice().reverse().map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{getPageName(activity.path)}</div>
                      <div className="text-sm text-gray-500">{formatTime(activity.timestamp)}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
