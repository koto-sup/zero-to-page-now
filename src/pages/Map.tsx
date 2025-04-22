
import React from "react";
import Layout from "@/components/Layout";
import TruckMap from "@/components/TruckMap";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";

const Map = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2" 
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "en" ? "Back" : "رجوع"}
          </Button>
          
          <h1 className="text-3xl font-bold">
            {language === "en" ? "Map View" : "عرض الخريطة"}
          </h1>
        </div>
        
        <div className="w-full h-[70vh] rounded-lg overflow-hidden">
          <TruckMap interactive={true} />
        </div>
      </div>
    </Layout>
  );
};

export default Map;
