
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTruckTypes } from "@/hooks/useTruckTypes";
import { useAuth } from "@/contexts/AuthContext";
// Fix import to use default import instead of named import
import TruckTypeItem from "./truck-selector/TruckTypeItem";

interface TruckTypeSelectorProps {
  selectedTruckType: string;
  onTruckTypeChange: (value: string) => void;
}

const TruckTypeSelector: React.FC<TruckTypeSelectorProps> = ({
  selectedTruckType,
  onTruckTypeChange
}) => {
  const { language } = useLanguage();
  const { getTruckTypes } = useTruckTypes();
  const { user } = useAuth();

  const getDiscountText = () => {
    switch(language) {
      case 'en': return "(18% discount for customers)";
      case 'fr': return "(18% de réduction pour les clients)";
      case 'es': return "(18% de descuento para clientes)";
      case 'ur': return "(گاہکوں کے لیے 18٪ چھوٹ)";
      case 'hi': return "(ग्राहकों के लिए 18% छूट)";
      case 'zh': return "(客户可享受18%折扣)";
      case 'ar': 
      default: return "(خصم 18% للعملاء)";
    }
  };

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

  const getInfoBoxText = () => {
    switch(language) {
      case 'en': return "18% fee is charged from the driver, not the customer. Prices are negotiable.";
      case 'fr': return "Des frais de 18% sont facturés au conducteur, pas au client. Les prix sont négociables.";
      case 'es': return "Se cobra una tarifa del 18% al conductor, no al cliente. Los precios son negociables.";
      case 'ur': return "18٪ فیس ڈرائیور سے لی جاتی ہے، کسٹمر سے نہیں۔ قیمتیں قابل مذاکرہ ہیں۔";
      case 'hi': return "18% शुल्क ड्राइवर से लिया जाता है, ग्राहक से नहीं। कीमतें बातचीत योग्य हैं।";
      case 'zh': return "18%的费用向司机收取，而非客户。价格可议。";
      case 'ar':
      default: return "يتم أخذ رسوم 18% من السائق وليس العميل، والأسعار قابلة للتفاوض.";
    }
  };

  // Determine if we should show the message based on user role
  const shouldShowInfoBox = !user || user.role === "customer" || user.role === "admin";

  // Check if we should use map-only selection for this truck type
  const isMapOnlySelectionType = (truckTypeId: string) => {
    return ["jcp", "water-truck", "wheel-excavator", "crawler-excavator", 
            "loader-lowbed", "jcb-forklift", "asphalt-paving-small", 
            "asphalt-paving-big", "generator-repair", "hydraulic-crane", 
            "basket-winch"].includes(truckTypeId);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">{getVehicleTypeLabel()}</h3>
        
        {shouldShowInfoBox && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-200">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
              </svg>
              {getInfoBoxText()}
            </p>
          </div>
        )}
        
        <RadioGroup 
          value={selectedTruckType} 
          onValueChange={onTruckTypeChange} 
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {getTruckTypes().map((type) => (
            <TruckTypeItem
              key={type.id}
              id={type.id}
              name={type.name}
              icon={type.image} // Use image string instead of ReactNode
              description={type.description || ""}
              selected={type.id === selectedTruckType}
              onSelect={onTruckTypeChange}
              capacity={type.capacity}
              refrigeration={type.refrigeration}
              useMapOnly={isMapOnlySelectionType(type.id)}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TruckTypeSelector;
