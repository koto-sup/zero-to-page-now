
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
        description: language === "en" ? "One-day rental, price based on offers" : "إيجار لمدة يوم واحد، السعر حسب العرض",
        priceType: "km",
        hasKmPricing: true
      },
      { 
        id: "jcp", 
        name: language === "en" ? "JCP Loader" : "لودر جي سي بي", 
        icon: TruckIcons.renderJCPIcon(),
        image: getTruckIcon("jcp"),
        price: language === "en" ? "578 SAR/day" : "578 ريال/يوم",
        priceType: "day"
      },
      { 
        id: "dump-truck", 
        name: language === "en" ? "Dump Truck" : "دينه قلاب صغير", 
        icon: TruckIcons.renderDumpTruckIcon(),
        image: getTruckIcon("dump-truck"),
        price: language === "en" ? "387-487 SAR/day" : "387-487 ريال/يوم",
        description: language === "en" ? "3 tons: 387 SAR, 5 tons: 487 SAR" : "3 طن: 387 ريال، 5 طن: 487 ريال",
        priceType: "day"
      },
      { 
        id: "dump-loader", 
        name: language === "en" ? "Big Dump Truck" : "قلاب سيكس", 
        icon: TruckIcons.renderDumpLoaderIcon(),
        image: getTruckIcon("dump-loader"),
        price: language === "en" ? "786 SAR/day" : "786 ريال/يوم",
        description: language === "en" ? "20 tons, 18 square meters" : "20 طن، 18 متر مربع",
        priceType: "day"
      },
      { 
        id: "water-truck", 
        name: language === "en" ? "Water Suction Truck" : "شاحنة شفط المياه", 
        icon: TruckIcons.renderWaterTruckIcon(),
        image: getTruckIcon("water-truck"),
        price: language === "en" ? "148 SAR/day" : "148 ريال/يوم",
        priceType: "day"
      },
      { 
        id: "wheel-excavator", 
        name: language === "en" ? "Wheel Excavator" : "حفارة بعجلات", 
        icon: TruckIcons.renderExcavatorIcon(),
        image: getTruckIcon("wheel-excavator"),
        price: language === "en" ? "1180 SAR/day" : "1180 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس",
        priceType: "day"
      },
      { 
        id: "crawler-excavator", 
        name: language === "en" ? "Crawler Excavator" : "حفارة زاحفة", 
        icon: TruckIcons.renderExcavatorIcon(),
        image: getTruckIcon("crawler-excavator"),
        price: language === "en" ? "687 SAR/day" : "687 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس",
        priceType: "day"
      },
      { 
        id: "crane-loader", 
        name: language === "en" ? "Crane Loader 20 Ton" : "رافعة تحميل ٢٠ طن", 
        icon: TruckIcons.renderCraneIcon(),
        image: getTruckIcon("crane-loader"),
        price: language === "en" ? "987 SAR/day" : "987 ريال/يوم",
        priceType: "day"
      },
      { 
        id: "loader-lowbed", 
        name: language === "en" ? "Big Loader Lowbed Truck" : "شاحنة سطحة كبيرة", 
        icon: TruckIcons.renderLowbedIcon(),
        image: getTruckIcon("loader-lowbed"),
        price: language === "en" ? "364 SAR/shipment" : "364 ريال/شحنة",
        description: language === "en" ? "For trips <27km. +15 SAR/km over 27km" : "للرحلات <27 كم. +15 ريال/كم فوق 27 كم",
        priceType: "trip",
        hasKmPricing: true
      },
      { 
        id: "jcb-forklift", 
        name: language === "en" ? "JCB Forklift Telescope" : "رافعة تلسكوبية جي سي بي", 
        icon: TruckIcons.renderForkliftIcon(),
        image: getTruckIcon("jcb-forklift"),
        price: language === "en" ? "787 SAR/day" : "787 ريال/يوم",
        description: language === "en" ? "Optional flatbed truck delivery: 348 SAR/trip" : "توصيل شاحنة سطحة اختياري: 348 ريال/رحلة",
        priceType: "day"
      },
      { 
        id: "asphalt-paving-small", 
        name: language === "en" ? "Small Asphalt Paving Machine" : "آلة رصف الأسفلت الصغيرة", 
        icon: TruckIcons.renderAsphaltIcon(),
        image: getTruckIcon("asphalt-paving-small"),
        price: language === "en" ? "987 SAR/day" : "987 ريال/يوم",
        description: language === "en" ? "Includes driver, engineer & free transportation" : "يشمل السائق والمهندس والنقل مجاناً",
        priceType: "day"
      },
      { 
        id: "asphalt-paving-big", 
        name: language === "en" ? "Big Asphalt Paving Machine" : "آلة رصف الأسفلت الكبيرة", 
        icon: TruckIcons.renderAsphaltIcon(),
        image: getTruckIcon("asphalt-paving-big"),
        price: language === "en" ? "5487 SAR/day" : "5487 ريال/يوم",
        description: language === "en" ? "Includes driver & engineer. Delivery: 987 SAR" : "يشمل السائق والمهندس. التوصيل: 987 ريال",
        priceType: "day"
      },
      { 
        id: "generator-repair", 
        name: language === "en" ? "Generator Repair" : "إصلاح المولدات", 
        icon: TruckIcons.renderEngineerIcon(),
        image: getTruckIcon("generator-repair"),
        price: language === "en" ? "58 SAR/visit" : "58 ريال/زيارة",
        description: language === "en" ? "Engineer visit fee only, service costs extra" : "رسوم زيارة المهندس فقط، تكلفة الخدمة إضافية",
        priceType: "service"
      },
      { 
        id: "hydraulic-crane", 
        name: language === "en" ? "Hydraulic Truck Crane 25 Ton" : "رافعة شاحنة هيدروليكية 25 طن", 
        icon: TruckIcons.renderCraneIcon(),
        image: getTruckIcon("hydraulic-crane"),
        price: language === "en" ? "1187 SAR/day, 598 SAR/trip" : "1187 ريال/يوم، 598 ريال/رحلة",
        description: language === "en" ? "Available for daily rental or single trip" : "متاحة للإيجار اليومي أو الرحلة الواحدة",
        priceType: "day"
      },
      { 
        id: "basket-winch", 
        name: language === "en" ? "Basket Winch Truck 21m" : "شاحنة رافعة سلة 21 متر", 
        icon: TruckIcons.renderBasketIcon(),
        image: getTruckIcon("basket-winch"),
        price: language === "en" ? "589 SAR/day" : "589 ريال/يوم",
        priceType: "day"
      }
    ];
  };

  return { getTruckTypes };
};
