import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Truck, 
  Loader, 
  Tractor, 
  Store, 
  Construction, 
  Building2, 
  Forklift,
  Trees
} from "lucide-react";

interface TruckTypeSelectorProps {
  selectedTruckType: string;
  onTruckTypeChange: (value: string) => void;
}

interface TruckTypeInfo {
  id: string;
  name: string;
  icon: JSX.Element;
  image: string;
  price: string;
  description?: string;
}

const TruckTypeSelector: React.FC<TruckTypeSelectorProps> = ({
  selectedTruckType,
  onTruckTypeChange
}) => {
  const truckTypes: TruckTypeInfo[] = [
    { 
      id: "refrigerated", 
      name: "شاحنة مبردة", 
      icon: <Truck className="h-6 w-6 text-cyan-500" />,
      image: "/lovable-uploads/524d4fdf-7185-4546-908a-e43c8d728c38.png",
      price: "14 ريال/كم",
      description: "إيجار لمدة يوم واحد، السعر حسب العرض"
    },
    { 
      id: "jcp", 
      name: "شاحنة JCP", 
      icon: <Construction className="h-6 w-6 text-yellow-600" />,
      image: "/assets/jcp-truck.png",
      price: "578 ريال/يوم",
      description: "خيار نقل الشاحنة: 238 ريال للتوصيل، 488 ريال للتوصيل والإرجاع"
    },
    { 
      id: "dump-truck", 
      name: "شاحنة قلابة", 
      icon: <Truck className="h-6 w-6 text-gray-600" />,
      image: "/assets/dump-truck.png",
      price: "387-487 ريال/يوم",
      description: "3 طن: 387 ريال، 5 طن: 487 ريال" 
    },
    { 
      id: "water-truck", 
      name: "شاحنة شفط المياه", 
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      image: "/assets/water-truck.png",
      price: "148 ريال/يوم" 
    },
    { 
      id: "crawler-excavator", 
      name: "حفارة زاحفة", 
      icon: <Construction className="h-6 w-6 text-orange-600" />,
      image: "/assets/crawler-excavator.png",
      price: "687 ريال/يوم",
      description: "يمكن اختيار نوع الرأس" 
    },
    { 
      id: "wheel-excavator", 
      name: "حفارة بعجلات", 
      icon: <Construction className="h-6 w-6 text-yellow-800" />,
      image: "/assets/wheel-excavator.png",
      price: "1180 ريال/يوم",
      description: "يمكن اختيار نوع الرأس" 
    },
    { 
      id: "transport", 
      name: "شاحنة نقل", 
      icon: <Truck className="h-6 w-6 text-blue-600" />,
      image: "/assets/truck-transport.png",
      price: "95 ريال/ساعة" 
    },
    { 
      id: "store", 
      name: "شاحنة متجر", 
      icon: <Store className="h-6 w-6 text-green-600" />,
      image: "/assets/truck-store.png",
      price: "120 ريال/ساعة" 
    },
    { 
      id: "crane", 
      name: "شاحنة رافعة", 
      icon: <Construction className="h-6 w-6 text-yellow-600" />,
      image: "/assets/truck-crane.png",
      price: "150 ريال/ساعة" 
    },
    { 
      id: "wood", 
      name: "شاحنة نقل الأخشاب", 
      icon: <Trees className="h-6 w-6 text-amber-700" />,
      image: "/assets/truck-wood.png",
      price: "105 ريال/ساعة" 
    },
    { 
      id: "tractor", 
      name: "جرار زراعي", 
      icon: <Tractor className="h-6 w-6 text-green-700" />,
      image: "/assets/tractor.png",
      price: "130 ريال/ساعة" 
    },
    { 
      id: "loading-crane", 
      name: "رافعة تحميل", 
      icon: <Loader className="h-6 w-6 text-orange-600" />,
      image: "/assets/loading-crane.png",
      price: "160 ريال/ساعة" 
    },
    { 
      id: "bulldozer", 
      name: "جرافة", 
      icon: <Construction className="h-6 w-6 text-yellow-500" />,
      image: "/assets/bulldozer.png",
      price: "170 ريال/ساعة" 
    },
    { 
      id: "skid-steer", 
      name: "لودر انزلاقي", 
      icon: <Forklift className="h-6 w-6 text-yellow-800" />,
      image: "/assets/skid-steer.png",
      price: "115 ريال/ساعة" 
    },
    { 
      id: "flatbed", 
      name: "شاحنة مسطحة", 
      icon: <Truck className="h-6 w-6 text-red-600" />,
      image: "/assets/flatbed.png",
      price: "100 ريال/ساعة" 
    },
    { 
      id: "backhoe", 
      name: "حفارة خلفية", 
      icon: <Construction className="h-6 w-6 text-purple-600" />,
      image: "/assets/backhoe.png",
      price: "145 ريال/ساعة" 
    },
    { 
      id: "front-loader", 
      name: "لودر أمامي", 
      icon: <Building2 className="h-6 w-6 text-indigo-600" />,
      image: "/assets/front-loader.png",
      price: "140 ريال/ساعة" 
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">نوع المركبة</h3>
        <div className="mb-3 p-2 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-200">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
            </svg>
            يتم أخذ رسوم 15% من السائق وليس العميل، والأسعار قابلة للتفاوض.
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
                    <div className="p-1 bg-cyan-50 rounded-full">{type.icon}</div>
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
                        (خصم 15% للعملاء)
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
