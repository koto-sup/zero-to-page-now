import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Truck, 
  Construction, 
  Tractor, 
  Snowflake,
  Droplets,
  Shovel
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TruckTypeSelectorProps {
  selectedTruckType: string;
  onTruckTypeChange: (value: string) => void;
}

const TruckTypeSelector: React.FC<TruckTypeSelectorProps> = ({
  selectedTruckType,
  onTruckTypeChange
}) => {
  const { language } = useLanguage();
  
  // Icon renderers with cartoon-like styling
  const renderRefrigeratedIcon = () => (
    <div className="p-2 rounded-full bg-blue-100 flex items-center justify-center">
      <Snowflake className="h-6 w-6 text-blue-500" />
    </div>
  );

  const renderJCPIcon = () => (
    <div className="p-2 rounded-full bg-yellow-100 flex items-center justify-center">
      <Construction className="h-6 w-6 text-yellow-600" />
    </div>
  );

  const renderDumpTruckIcon = () => (
    <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center">
      <Truck className="h-6 w-6 text-gray-700" />
    </div>
  );

  const renderWaterTruckIcon = () => (
    <div className="p-2 rounded-full bg-cyan-100 flex items-center justify-center">
      <Droplets className="h-6 w-6 text-cyan-600" />
    </div>
  );

  const renderExcavatorIcon = () => (
    <div className="p-2 rounded-full bg-orange-100 flex items-center justify-center">
      <Shovel className="h-6 w-6 text-orange-600" />
    </div>
  );

  // Truck types with translations
  const getTruckTypes = () => {
    const baseTypes = [
      { 
        id: "refrigerated", 
        name: language === "en" ? "Refrigerated Truck" : "شاحنة مبردة", 
        icon: renderRefrigeratedIcon(),
        image: "/lovable-uploads/524d4fdf-7185-4546-908a-e43c8d728c38.png",
        price: language === "en" ? "14 SAR/km" : "14 ريال/كم",
        description: language === "en" ? "One-day rental, price based on offers" : "إيجار لمدة يوم واحد، السعر حسب العرض"
      },
      { 
        id: "jcp", 
        name: language === "en" ? "JCP Truck" : "شاحنة JCP", 
        icon: renderJCPIcon(),
        image: "/assets/jcp-truck.png",
        price: language === "en" ? "578 SAR/day" : "578 ريال/يوم",
        description: language === "en" ? "Delivery options: 238 SAR for delivery, 488 SAR for delivery and return" : "خيار نقل الشاحنة: 238 ريال للتوصيل، 488 ريال للتوصيل والإرجاع"
      },
      { 
        id: "dump-truck", 
        name: language === "en" ? "Dump Truck" : "شاحنة قلابة", 
        icon: renderDumpTruckIcon(),
        image: "/assets/dump-truck.png",
        price: language === "en" ? "387-487 SAR/day" : "387-487 ريال/يوم",
        description: language === "en" ? "3 tons: 387 SAR, 5 tons: 487 SAR" : "3 طن: 387 ريال، 5 طن: 487 ريال" 
      },
      { 
        id: "water-truck", 
        name: language === "en" ? "Water Suction Truck" : "شاحنة شفط المياه", 
        icon: renderWaterTruckIcon(),
        image: "/assets/water-truck.png",
        price: language === "en" ? "148 SAR/day" : "148 ريال/يوم" 
      },
      { 
        id: "crawler-excavator", 
        name: language === "en" ? "Crawler Excavator" : "حفارة زاحفة", 
        icon: renderExcavatorIcon(),
        image: "/assets/crawler-excavator.png",
        price: language === "en" ? "687 SAR/day" : "687 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس" 
      },
      { 
        id: "wheel-excavator", 
        name: language === "en" ? "Wheel Excavator" : "حفارة بعجلات", 
        icon: renderExcavatorIcon(),
        image: "/assets/wheel-excavator.png",
        price: language === "en" ? "1180 SAR/day" : "1180 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس" 
      },
      { 
        id: "transport", 
        name: language === "en" ? "Transport Truck" : "شاحنة نقل", 
        icon: <Truck className="h-6 w-6 text-blue-600" />,
        image: "/assets/truck-transport.png",
        price: language === "en" ? "95 SAR/hour" : "95 ريال/ساعة" 
      },
      { 
        id: "store", 
        name: language === "en" ? "Store Truck" : "شاحنة متجر", 
        icon: <Construction className="h-6 w-6 text-green-600" />,
        image: "/assets/truck-store.png",
        price: language === "en" ? "120 SAR/hour" : "120 ريال/ساعة" 
      },
      { 
        id: "crane", 
        name: language === "en" ? "Crane Truck" : "شاحنة رافعة", 
        icon: <Construction className="h-6 w-6 text-yellow-600" />,
        image: "/assets/truck-crane.png",
        price: language === "en" ? "150 SAR/hour" : "150 ريال/ساعة" 
      },
      { 
        id: "wood", 
        name: language === "en" ? "Wood Transport Truck" : "شاحنة نقل الأخشاب", 
        icon: <Tractor className="h-6 w-6 text-amber-700" />,
        image: "/assets/truck-wood.png",
        price: language === "en" ? "105 SAR/hour" : "105 ريال/ساعة" 
      },
      { 
        id: "tractor", 
        name: language === "en" ? "Agricultural Tractor" : "جرار زراعي", 
        icon: <Tractor className="h-6 w-6 text-green-700" />,
        image: "/assets/tractor.png",
        price: language === "en" ? "130 SAR/hour" : "130 ريال/ساعة" 
      },
      { 
        id: "loading-crane", 
        name: language === "en" ? "Loading Crane" : "رافعة تحميل", 
        icon: <Construction className="h-6 w-6 text-orange-600" />,
        image: "/assets/loading-crane.png",
        price: language === "en" ? "160 SAR/hour" : "160 ريال/ساعة" 
      },
      { 
        id: "bulldozer", 
        name: language === "en" ? "Bulldozer" : "جرافة", 
        icon: <Construction className="h-6 w-6 text-yellow-500" />,
        image: "/assets/bulldozer.png",
        price: language === "en" ? "170 SAR/hour" : "170 ريال/ساعة" 
      },
      { 
        id: "skid-steer", 
        name: language === "en" ? "Skid Steer Loader" : "لودر انزلاقي", 
        icon: <Construction className="h-6 w-6 text-yellow-800" />,
        image: "/assets/skid-steer.png",
        price: language === "en" ? "115 SAR/hour" : "115 ريال/ساعة" 
      },
      { 
        id: "flatbed", 
        name: language === "en" ? "Flatbed Truck" : "شاحنة مسطحة", 
        icon: <Truck className="h-6 w-6 text-red-600" />,
        image: "/assets/flatbed.png",
        price: language === "en" ? "100 SAR/hour" : "100 ريال/ساعة" 
      },
      { 
        id: "backhoe", 
        name: language === "en" ? "Backhoe" : "حفارة خلفية", 
        icon: <Construction className="h-6 w-6 text-purple-600" />,
        image: "/assets/backhoe.png",
        price: language === "en" ? "145 SAR/hour" : "145 ريال/ساعة" 
      },
      { 
        id: "front-loader", 
        name: language === "en" ? "Front Loader" : "لودر أمامي", 
        icon: <Construction className="h-6 w-6 text-indigo-600" />,
        image: "/assets/front-loader.png",
        price: language === "en" ? "140 SAR/hour" : "140 ريال/ساعة" 
      }
    ];
    
    return baseTypes;
  };

  const truckTypes = getTruckTypes();

  // Discount text based on language
  const getDiscountText = () => {
    switch(language) {
      case 'en': return "(15% discount for customers)";
      case 'fr': return "(15% de réduction pour les clients)";
      case 'es': return "(15% de descuento para clientes)";
      case 'ur': return "(گاہکوں کے لیے 15٪ چھوٹ)";
      case 'hi': return "(ग्राहकों के लिए 15% छूट)";
      case 'zh': return "(客户可享受15%折扣)";
      case 'ar': 
      default: return "(خصم 15% للعملاء)";
    }
  };

  // Info box text based on language
  const getInfoBoxText = () => {
    switch(language) {
      case 'en': return "15% fee is charged from the driver, not the customer. Prices are negotiable.";
      case 'fr': return "Des frais de 15% sont facturés au conducteur, pas au client. Les prix sont négociables.";
      case 'es': return "Se cobra una tarifa del 15% al conductor, no al cliente. Los precios son negociables.";
      case 'ur': return "15٪ فیس ڈرائیور سے لی جاتی ہے، کسٹمر سے نہیں۔ قیمتیں قابل مذاکرہ ہیں۔";
      case 'hi': return "15% शुल्क ड्राइवर से लिया जाता है, ग्राहक से नहीं। कीमतें बातचीत योग्य हैं।";
      case 'zh': return "15%的费用向司机收取，而非客户。价格可议。";
      case 'ar':
      default: return "يتم أخذ رسوم 15% من السائق وليس العميل، والأسعار قابلة للتفاوض.";
    }
  };

  // Get vehicle type label based on language
  const getVehicleTypeLabel = () => {
    switch(language) {
      case 'en': return "Vehicle Type";
      case 'fr': return "Type de Véhicule";
      case 'es': return "Tipo de Vehículo";
      case 'ur': return "گاڑی کی قسم";
      case 'hi': return "वाहन प्रकार";
      case 'zh': return "车辆类型";
      case 'ar':
      default: return "نوع المركبة";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">{getVehicleTypeLabel()}</h3>
        <div className="mb-3 p-2 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-200">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
            </svg>
            {getInfoBoxText()}
          </p>
        </div>
        <RadioGroup 
          value={selectedTruckType} 
          onValueChange={onTruckTypeChange} 
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {truckTypes.map((type) => (
            <div key={type.id} className="flex items-center">
              <RadioGroupItem value={type.id} id={`truck-type-${type.id}`} />
              <Label 
                htmlFor={`truck-type-${type.id}`} 
                className="flex items-center mr-2 p-2 cursor-pointer w-full hover:bg-muted/20 rounded-md transition-colors"
              >
                <div className="ml-3 p-1 rounded-full bg-blue-50 flex items-center justify-center" style={{ width: "48px", height: "48px" }}>
                  {type.id === "refrigerated" ? (
                    <img 
                      src={type.image} 
                      alt={type.name} 
                      className="max-w-full max-h-full" 
                    />
                  ) : (
                    type.icon
                  )}
                </div>
                <div>
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-gray-500">
                    {type.price}
                    {type.description && (
                      <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                    )}
                    {type.id === selectedTruckType && !type.description && (
                      <span className="mr-2 text-green-600">
                        {getDiscountText()}
                      </span>
                    )}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TruckTypeSelector;
