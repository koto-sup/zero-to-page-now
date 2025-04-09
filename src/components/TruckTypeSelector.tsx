
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck, Tractor, Loader } from "lucide-react";

interface TruckTypeSelectorProps {
  selectedTruckType: string;
  onTruckTypeChange: (value: string) => void;
}

const TruckTypeSelector: React.FC<TruckTypeSelectorProps> = ({
  selectedTruckType,
  onTruckTypeChange
}) => {
  const truckTypes = [
    { 
      id: "refrigerated", 
      name: "شاحنة مبردة", 
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      price: "13.5 ريال/كم"
    },
    { 
      id: "cement", 
      name: "شاحنة إسمنت", 
      icon: <Truck className="h-6 w-6 text-gray-500" />,
      price: "15.0 ريال/كم" 
    },
    { 
      id: "crane", 
      name: "شاحنة رافعة", 
      icon: <Truck className="h-6 w-6 text-yellow-500" />,
      price: "20.0 ريال/كم" 
    },
    { 
      id: "livestock", 
      name: "شاحنة مواشي", 
      icon: <Truck className="h-6 w-6 text-green-500" />,
      price: "14.5 ريال/كم" 
    },
    { 
      id: "flatbed", 
      name: "شاحنة مسطحة", 
      icon: <Truck className="h-6 w-6 text-red-500" />,
      price: "12.0 ريال/كم" 
    },
    { 
      id: "tractor-trailer", 
      name: "جرار مقطورة", 
      icon: <Tractor className="h-6 w-6 text-purple-500" />,
      price: "18.0 ريال/كم" 
    },
    { 
      id: "car-carrier", 
      name: "ناقلة سيارات", 
      icon: <Truck className="h-6 w-6 text-indigo-500" />,
      price: "16.5 ريال/كم" 
    },
    { 
      id: "logging", 
      name: "شاحنة نقل الأخشاب", 
      icon: <Truck className="h-6 w-6 text-amber-700" />,
      price: "15.5 ريال/كم" 
    },
    { 
      id: "storage", 
      name: "شاحنة تخزين", 
      icon: <Truck className="h-6 w-6 text-teal-500" />,
      price: "13.0 ريال/كم" 
    },
    { 
      id: "tanker", 
      name: "شاحنة صهريج", 
      icon: <Truck className="h-6 w-6 text-cyan-500" />,
      price: "17.0 ريال/كم" 
    },
    { 
      id: "loader", 
      name: "رافعة تحميل", 
      icon: <Loader className="h-6 w-6 text-orange-500" />,
      price: "104 ريال/ساعة" 
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">نوع الشاحنة</h3>
        <RadioGroup value={selectedTruckType} onValueChange={onTruckTypeChange} className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {truckTypes.map((type) => (
            <div key={type.id} className="flex items-center">
              <RadioGroupItem value={type.id} id={`truck-type-${type.id}`} />
              <Label 
                htmlFor={`truck-type-${type.id}`} 
                className="flex items-center mr-2 p-2 cursor-pointer w-full"
              >
                <div className="ml-2">{type.icon}</div>
                <div>
                  <div>{type.name}</div>
                  <div className="text-sm text-gray-500">{type.price}</div>
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
