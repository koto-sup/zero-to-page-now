
import React, { useEffect, useState } from "react";
import { Truck, MapPin, Crosshair } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Mock truck positions
const mockTrucks = [
  { id: "truck-1", lat: 24.7136, lng: 46.6753, distance: 1.2, type: "refrigerated" }, // Riyadh
  { id: "truck-2", lat: 24.7255, lng: 46.6468, distance: 2.4, type: "jcp" },
  { id: "truck-3", lat: 24.6949, lng: 46.7081, distance: 3.7, type: "dump-truck" },
];

interface TruckMapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  interactive?: boolean;
  fullScreen?: boolean;
}

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

// User selected location marker
const LocationMarker = ({ 
  top, 
  left 
}: { 
  top: string; 
  left: string;
}) => {
  return (
    <div className="absolute" style={{ top, left }}>
      <div className="relative">
        <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <div className="absolute top-0 left-0 w-6 h-6 bg-red-500 rounded-full -z-10 animate-ping opacity-10"></div>
      </div>
    </div>
  );
};

const TruckMap: React.FC<TruckMapProps> = ({ 
  onLocationSelect, 
  interactive = false,
  fullScreen = false 
}) => {
  const { language } = useLanguage();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{top: string, left: string} | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Handle map click for location selection
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const mapElem = e.currentTarget;
    const rect = mapElem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const topPercent = (y / rect.height) * 100;
    const leftPercent = (x / rect.width) * 100;
    
    setUserLocation({ 
      top: `${topPercent}%`, 
      left: `${leftPercent}%` 
    });
    
    // Simulate coordinates calculation (would be real coordinates in a real map)
    // For demo purposes, we're just simulating around Riyadh coordinates
    const simulatedLat = 24.7 + ((topPercent - 50) / 500);
    const simulatedLng = 46.7 + ((leftPercent - 50) / 500);
    
    if (onLocationSelect) {
      onLocationSelect(simulatedLat, simulatedLng);
    }
    
    toast.success(
      language === 'en' ? "Location selected!" : "تم اختيار الموقع!",
      {
        description: language === 'en' 
          ? "You can now proceed with your truck request" 
          : "يمكنك الآن المتابعة في طلب الشاحنة"
      }
    );
  };

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getMapMessage = () => {
    switch(language) {
      case 'en': return interactive 
                ? "Tap anywhere on the map to select your location" 
                : "To display a real map, connect a map service";
      case 'ar': 
      default: return interactive
              ? "انقر في أي مكان على الخريطة لاختيار موقعك"
              : "لعرض خريطة حقيقية، يتوجب ربط خدمة خرائط";
    }
  };

  // Mock address suggestions
  const suggestions = [
    "الرياض، حي النرجس",
    "الرياض، حي الملقا",
    "الرياض، حي اليرموك",
    "الرياض، طريق الملك فهد"
  ];

  return (
    <div className={`relative w-full h-full ${fullScreen ? 'absolute inset-0' : ''}`}>
      {/* Map Search Bar (Uber/Careem style) */}
      {interactive && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all ${searchFocused ? 'border-moprd-teal' : 'border border-gray-200'}`}>
            <div className="flex items-center p-3">
              <MapPin className="h-5 w-5 text-moprd-teal mr-2" />
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                placeholder={language === 'en' ? "Search for a destination" : "البحث عن وجهة"}
              />
            </div>
            
            {/* Search suggestions */}
            {searchFocused && (
              <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="p-3 border-t border-gray-100 dark:border-gray-700 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchText(suggestion);
                      setSearchFocused(false);
                      // Simulate location selection
                      if (onLocationSelect) {
                        // Random coordinates around Riyadh
                        const randomLat = 24.7 + (Math.random() - 0.5) / 10;
                        const randomLng = 46.7 + (Math.random() - 0.5) / 10;
                        onLocationSelect(randomLat, randomLng);
                      }
                    }}
                  >
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Map area */}
      <div 
        className={`w-full h-full bg-blue-50 relative ${interactive ? 'cursor-crosshair' : ''}`}
        onClick={interactive ? handleMapClick : undefined}
        style={{ height: fullScreen ? '100vh' : '100%' }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/46.7,24.7,12/1280x400?access_token=placeholder')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: mapLoaded ? 0.7 : 0.3,
          transition: "opacity 0.5s ease-in-out"
        }}>
        </div>
        
        {/* Current location marker */}
        {!userLocation && interactive && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 flex items-center justify-center">
              <Crosshair className="h-8 w-8 text-moprd-teal animate-pulse" />
            </div>
          </div>
        )}
        
        {/* User selected location */}
        {userLocation && <LocationMarker top={userLocation.top} left={userLocation.left} />}
        
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
        
        {/* Map loading/info message */}
        {!mapLoaded ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md animate-pulse">
            {language === 'en' ? 'Loading map...' : 'جاري تحميل الخريطة...'}
          </div>
        ) : interactive && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
            {getMapMessage()}
          </div>
        )}
        
        {/* Locate me button */}
        {interactive && (
          <Button
            className="absolute bottom-12 right-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg rounded-full p-3 w-12 h-12"
            size="icon"
            variant="outline"
            onClick={() => {
              toast.success(
                language === 'en' ? "Using your current location" : "استخدام موقعك الحالي"
              );
              // Simulate using current location
              if (onLocationSelect) {
                onLocationSelect(24.7136, 46.6753); // Riyadh coordinates
              }
            }}
          >
            <Crosshair className="h-6 w-6 text-moprd-teal" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TruckMap;
