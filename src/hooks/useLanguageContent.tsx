
import { useLanguage } from "@/contexts/LanguageContext";

export const useLanguageContent = () => {
  const { language } = useLanguage();
  
  const getTruckTypesDescription = () => {
    switch (language) {
      case 'en':
        return "Choose your departure and destination to get offers from various truck types available";
      case 'ar':
      default:
        return "اختر موقع الانطلاق والوجهة للحصول على عروض من مختلف أنواع الشاحنات المتاحة";
    }
  };

  const getPageTitle = () => {
    switch (language) {
      case 'en':
        return "Find Trucks";
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
