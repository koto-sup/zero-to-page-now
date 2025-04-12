
import { useLanguage } from "@/contexts/LanguageContext";

export const useLanguageContent = () => {
  const { language } = useLanguage();
  
  const getTruckTypesDescription = () => {
    switch (language) {
      case 'en':
        return "Choose your departure and destination to get offers from various truck types available";
      case 'fr':
        return "Choisissez votre point de départ et votre destination pour obtenir des offres de différents types de camions disponibles";
      case 'es':
        return "Elija su punto de partida y destino para recibir ofertas de varios tipos de camiones disponibles";
      case 'ur':
        return "دستیاب مختلف قسم کے ٹرکوں سے پیشکشیں حاصل کرنے کے لیے اپنی روانگی اور منزل کا انتخاب کریں۔";
      case 'hi':
        return "उपलब्ध विभिन्न प्रकार के ट्रकों से ऑफर प्राप्त करने के लिए अपने प्रस्थान और गंतव्य का चयन करें";
      case 'zh':
        return "选择您的出发地和目的地，以获得各种可用卡车类型的报价";
      case 'ar':
      default:
        return "اختر موقع الانطلاق والوجهة للحصول على عروض من مختلف أنواع الشاحنات المتاحة";
    }
  };

  const getPageTitle = () => {
    switch (language) {
      case 'en':
        return "Find Trucks";
      case 'fr':
        return "Rechercher des Camions";
      case 'es':
        return "Buscar Camiones";
      case 'ur':
        return "ٹرک تلاش کریں";
      case 'hi':
        return "ट्रक खोजें";
      case 'zh':
        return "寻找卡车";
      case 'ar':
      default:
        return "البحث عن شاحنات";
    }
  };
  
  return {
    getTruckTypesDescription,
    getPageTitle
  };
};
