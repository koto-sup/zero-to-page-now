
import { useLanguage } from "@/contexts/LanguageContext";
import { TruckIcons } from "@/components/truck-selector/TruckIcons";
import { getTruckIcon, TruckType } from "@/utils/truckUtils";

export const useTruckTypes = () => {
  const { language } = useLanguage();

  const getTruckTypes = (): TruckType[] => {
    return [
      { 
        id: "refrigerated", 
        name: language === "en" ? "Refrigerated Truck" : "شاحنة مبردة", 
        icon: TruckIcons.renderRefrigeratedIcon(),
        image: getTruckIcon("refrigerated"),
        price: language === "en" ? "14 SAR/km" : "14 ريال/كم",
        description: language === "en" ? "One-day rental, price based on offers" : "إيجار لمدة يوم واحد، السعر حسب العرض"
      },
      { 
        id: "jcp", 
        name: language === "en" ? "JCP Loader" : "لودر جي سي بي", 
        icon: TruckIcons.renderJCPIcon(),
        image: getTruckIcon("jcp"),
        price: language === "en" ? "578 SAR/day" : "578 ريال/يوم"
      },
      { 
        id: "dump-truck", 
        name: language === "en" ? "Dump Truck" : "شاحنة قلابة", 
        icon: TruckIcons.renderDumpTruckIcon(),
        image: getTruckIcon("dump-truck"),
        price: language === "en" ? "387-487 SAR/day" : "387-487 ريال/يوم",
        description: language === "en" ? "3 tons: 387 SAR, 5 tons: 487 SAR" : "3 طن: 387 ريال، 5 طن: 487 ريال" 
      },
      { 
        id: "dump-loader", 
        name: language === "en" ? "Big Dump Truck" : "قلاب سيكس", 
        icon: TruckIcons.renderDumpLoaderIcon(),
        image: getTruckIcon("dump-loader"),
        price: language === "en" ? "786 SAR/day" : "786 ريال/يوم",
        description: language === "en" ? "20 tons, 18 square meters" : "20 طن، 18 متر مربع" 
      },
      { 
        id: "water-truck", 
        name: language === "en" ? "Water Suction Truck" : "شاحنة شفط المياه", 
        icon: TruckIcons.renderWaterTruckIcon(),
        image: getTruckIcon("water-truck"),
        price: language === "en" ? "148 SAR/day" : "148 ريال/يوم" 
      },
      { 
        id: "crawler-excavator", 
        name: language === "en" ? "Crawler Excavator" : "حفارة زاحفة", 
        icon: TruckIcons.renderExcavatorIcon(),
        image: getTruckIcon("crawler-excavator"),
        price: language === "en" ? "687 SAR/day" : "687 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس" 
      },
      { 
        id: "wheel-excavator", 
        name: language === "en" ? "Wheel Excavator" : "حفارة بعجلات", 
        icon: TruckIcons.renderExcavatorIcon(),
        image: getTruckIcon("wheel-excavator"),
        price: language === "en" ? "1180 SAR/day" : "1180 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس" 
      }
    ];
  };

  return { getTruckTypes };
};
