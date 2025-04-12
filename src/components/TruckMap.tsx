
import React, { useEffect, useState } from "react";
import { Truck, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock truck positions
const mockTrucks = [
  { id: "truck-1", lat: 24.7136, lng: 46.6753, distance: 1.2, type: "refrigerated" }, // Riyadh
  { id: "truck-2", lat: 24.7255, lng: 46.6468, distance: 2.4, type: "jcp" },
  { id: "truck-3", lat: 24.6949, lng: 46.7081, distance: 3.7, type: "dump-truck" },
];

// Component for showing a truck on the map with its icon
const TruckMarker = ({ 
  top, 
  left, 
  distance, 
  type 
}: { 
  top: string; 
  left: string; 
  distance: number;
  type: string;
}) => {
  // Different colors for different truck types
  const getColor = () => {
    switch(type) {
      case 'refrigerated': return "bg-cyan-500";
      case 'jcp': return "bg-yellow-600";
      case 'dump-truck': return "bg-gray-700";
      case 'water-truck': return "bg-blue-500";
      case 'crawler-excavator': return "bg-orange-600";
      case 'wheel-excavator': return "bg-amber-800";
      default: return "bg-moprd-teal";
    }
  };

  return (
    <div className="absolute" style={{ top, left }}>
      <div className="bg-white p-1 rounded-full shadow-lg">
        <div className={`p-1 rounded-full text-white ${getColor()}`}>
          <Truck size={18} />
        </div>
      </div>
      <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow-md text-center">{distance} كم</div>
    </div>
  );
};

const TruckMap = () => {
  const { language } = useLanguage();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getMapMessage = () => {
    switch(language) {
      case 'en': return "To display a real map, connect a map service";
      case 'fr': return "Pour afficher une carte réelle, connectez un service de cartographie";
      case 'es': return "Para mostrar un mapa real, conecte un servicio de mapas";
      case 'ur': return "حقیقی نقشہ دکھانے کے لیے، نقشہ سروس کو منسلک کریں";
      case 'hi': return "वास्तविक मानचित्र प्रदर्शित करने के लिए, एक मानचित्र सेवा से जुड़ें";
      case 'zh': return "要显示真实地图，请连接地图服务";
      case 'ar': 
      default: return "لعرض خريطة حقيقية، يتوجب ربط خدمة خرائط";
    }
  };

  return (
    <div className="w-full h-full bg-blue-50 relative flex items-center justify-center">
      <div className="absolute inset-0" style={{ 
        backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/46.7,24.7,12/1280x400?access_token=placeholder')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: mapLoaded ? 0.7 : 0.3,
        transition: "opacity 0.5s ease-in-out"
      }}>
      </div>
      
      {/* Current location marker */}
      <div className="absolute top-1/2 right-1/2 z-10">
        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
        <div className="absolute top-0 right-0 w-12 h-12 bg-red-500 rounded-full -z-10 animate-ping opacity-10"></div>
        <div className="absolute -bottom-8 -right-16 bg-white px-2 py-1 rounded-md shadow-sm text-xs whitespace-nowrap">
          <MapPin className="h-3 w-3 inline mr-1" />
          {language === 'en' ? 'Your Location' : 'موقعك الحالي'}
        </div>
      </div>
      
      {/* Simulated truck positions */}
      {mockTrucks.map((truck, index) => {
        // Position trucks around the center with some randomness
        const posTop = `${40 + (index * 12)}%`;
        const posLeft = `${40 + (index * 10)}%`;
        
        return (
          <TruckMarker 
            key={truck.id}
            top={posTop}
            left={posLeft}
            distance={truck.distance}
            type={truck.type}
          />
        );
      })}
      
      {!mapLoaded ? (
        <div className="relative bg-white px-4 py-2 rounded-lg shadow-md animate-pulse">
          {language === 'en' ? 'Loading map...' : 'جاري تحميل الخريطة...'}
        </div>
      ) : (
        <div className="relative bg-white px-4 py-2 rounded-lg shadow-md">
          {getMapMessage()}
        </div>
      )}
    </div>
  );
};

export default TruckMap;
