
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Activity = () => {
  const { language } = useLanguage();
  
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

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-3xl font-bold mb-6">{getTitle()}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-gray-500">
            {getEmptyMessage()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
