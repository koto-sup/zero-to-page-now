
import React from "react";
import { Truck } from "lucide-react";

const TruckMap = () => {
  // This is a placeholder for a real map implementation
  // In a real app, you would use a mapping library like Mapbox, Google Maps, Leaflet, etc.
  return (
    <div className="w-full h-full bg-blue-50 relative flex items-center justify-center">
      <div className="absolute inset-0" style={{ 
        backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/45.0,24.0,5/1280x400?access_token=pk.placeholder')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.5
      }}>
      </div>
      
      {/* Simulated truck positions */}
      <div className="absolute top-1/2 right-1/2 transform translate-x-12 -translate-y-8 z-10">
        <div className="bg-white p-1 rounded-full shadow-lg">
          <div className="bg-moprd-teal p-1 rounded-full text-white">
            <Truck size={18} />
          </div>
        </div>
        <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow-md text-center">1.2 كم</div>
      </div>
      
      <div className="absolute top-1/3 right-1/3 transform translate-x-24 translate-y-8 z-10">
        <div className="bg-white p-1 rounded-full shadow-lg">
          <div className="bg-moprd-blue p-1 rounded-full text-white">
            <Truck size={18} />
          </div>
        </div>
        <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow-md text-center">2.4 كم</div>
      </div>
      
      {/* Current location marker */}
      <div className="absolute top-1/2 right-1/2 z-10">
        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
        <div className="absolute top-0 right-0 w-12 h-12 bg-red-500 rounded-full -z-10 animate-ping opacity-10"></div>
      </div>
      
      <div className="relative bg-white px-4 py-2 rounded-lg shadow-md">
        لعرض خريطة حقيقية، يتوجب ربط خدمة خرائط
      </div>
    </div>
  );
};

export default TruckMap;
