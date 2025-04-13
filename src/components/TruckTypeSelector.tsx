
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Snowflake,
  Droplets,
  Shovel,
  Construction
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
      <Construction className="h-6 w-6 text-gray-700" />
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

  // Truck types with translations - removed the specified truck types
  const getTruckTypes = () => {
    const baseTypes = [
      { 
        id: "refrigerated", 
        name: language === "en" ? "Refrigerated Truck" : "شاحنة مبردة", 
        icon: renderRefrigeratedIcon(),
        image: "/lovable-uploads/191e2114-a3a6-4a0a-9f35-7ee23e4fc07e.png",
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
        image: "/lovable-uploads/191e2114-a3a6-4a0a-9f35-7ee23e4fc07e.png",
        price: language === "en" ? "387-487 SAR/day" : "387-487 ريال/يوم",
        description: language === "en" ? "3 tons: 387 SAR, 5 tons: 487 SAR" : "3 طن: 387 ريال، 5 طن: 487 ريال" 
      },
      { 
        id: "dump-loader", 
        name: language === "en" ? "Dump Loader" : "شاحنة حفر وتحميل", 
        icon: renderDumpTruckIcon(),
        image: "/lovable-uploads/0819c9a2-a973-40ee-b628-305175c366c9.png",
        price: language === "en" ? "786 SAR/day" : "786 ريال/يوم",
        description: language === "en" ? "20 tons, 18 square meters" : "20 طن، 18 متر مربع" 
      },
      { 
        id: "water-truck", 
        name: language === "en" ? "Water Suction Truck" : "شاحنة شفط المياه", 
        icon: renderWaterTruckIcon(),
        image: "/lovable-uploads/191e2114-a3a6-4a0a-9f35-7ee23e4fc07e.png",
        price: language === "en" ? "148 SAR/day" : "148 ريال/يوم" 
      },
      { 
        id: "crawler-excavator", 
        name: language === "en" ? "Crawler Excavator" : "حفارة زاحفة", 
        icon: renderExcavatorIcon(),
        image: "/lovable-uploads/191e2114-a3a6-4a0a-9f35-7ee23e4fc07e.png",
        price: language === "en" ? "687 SAR/day" : "687 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس" 
      },
      { 
        id: "wheel-excavator", 
        name: language === "en" ? "Wheel Excavator" : "حفارة بعجلات", 
        icon: renderExcavatorIcon(),
        image: "/lovable-uploads/191e2114-a3a6-4a0a-9f35-7ee23e4fc07e.png",
        price: language === "en" ? "1180 SAR/day" : "1180 ريال/يوم",
        description: language === "en" ? "Head types available for selection" : "يمكن اختيار نوع الرأس" 
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
          {getTruckTypes().map((type) => (
            <div key={type.id} className="flex items-center">
              <RadioGroupItem value={type.id} id={`truck-type-${type.id}`} />
              <Label 
                htmlFor={`truck-type-${type.id}`} 
                className="flex items-center mr-2 p-2 cursor-pointer w-full hover:bg-muted/20 rounded-md transition-colors"
              >
                <div className="ml-3 p-1 rounded-full bg-blue-50 flex items-center justify-center" style={{ width: "48px", height: "48px" }}>
                  {type.image ? (
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
