import React, { useEffect, useState } from "react";
import { Truck, MapPin, Navigation, Clock, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";

// Ice-themed notification bubble
const IceNotification = ({ message, type = "info" }) => {
  const typeStyles = {
    info: "bg-cyan-500",
    warning: "bg-amber-500",
    success: "bg-green-500",
  };
  
  return (
    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20 min-w-48 max-w-64 whitespace-normal">
      <div className={`${typeStyles[type]} text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium`}
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 55% 80%, 50% 100%, 45% 80%, 0% 80%)"
        }}
      >
        <div className="pb-3">
          {message}
        </div>
      </div>
    </div>
  );
};

// Styled icy button component
const IcyIcon = ({ children, pulse = false, size = "md", onClick = () => {} }) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-400 rounded-lg shadow-lg" style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 85% 85%, 85% 100%, 70% 85%, 0% 85%)"
      }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-300 to-cyan-500 rounded-lg flex items-center justify-center overflow-hidden" style={{
        clipPath: "polygon(0% 5%, 95% 5%, 95% 80%, 80% 80%, 80% 95%, 65% 80%, 0% 80%)"
      }}>
        {children}
        
        {/* Dripping effect */}
        <div className="absolute bottom-0 left-1/4 w-1 h-3 bg-cyan-300 rounded-b-full"></div>
        <div className="absolute bottom-0 left-2/3 w-1.5 h-4 bg-cyan-300 rounded-b-full"></div>
        <div className="absolute bottom-0 right-1/3 w-1 h-2 bg-cyan-300 rounded-b-full"></div>
      </div>
      
      {/* Pulse animation if enabled */}
      {pulse && (
        <div className="absolute inset-0 rounded-lg animate-ping opacity-30 bg-cyan-400"></div>
      )}
    </div>
  );
};

interface EnhancedTruckMapProps {
  tracking?: boolean;
  distance?: number;
}

const EnhancedTruckMap = ({ tracking = false, distance = 2.3 }: EnhancedTruckMapProps) => {
  const [rotation, setRotation] = useState(45);
  const [currentDistance, setCurrentDistance] = useState(distance);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [driverStatus, setDriverStatus] = useState("جاري التحرك");
  
  // Calculate estimated arrival time based on distance
  const estimatedMinutes = Math.max(Math.floor(currentDistance * 5), 1);
  
  useEffect(() => {
    // Simulate truck movement by changing rotation slightly
    if (tracking) {
      const rotationInterval = setInterval(() => {
        setRotation(prev => (prev + Math.random() * 10 - 5) % 360);
      }, 3000);
      
      // Simulate distance decreasing
      const distanceInterval = setInterval(() => {
        setCurrentDistance(prev => {
          const newDistance = Math.max(prev - 0.1, 0);
          
          // Show notifications based on distance milestones
          if (prev > 2.0 && newDistance <= 2.0) {
            setNotificationMessage("السائق في الطريق إليك");
            setNotificationType("info");
            setShowNotification(true);
            setDriverStatus("في الطريق");
            
            setTimeout(() => setShowNotification(false), 5000);
            
            toast.info("السائق في الطريق إليك", {
              description: "تقدير الوصول: 10 دقائق"
            });
          } 
          else if (prev > 1.0 && newDistance <= 1.0) {
            setNotificationMessage("السائق على بعد 5 دقائق");
            setNotificationType("info");
            setShowNotification(true);
            setDriverStatus("قريب منك");
            
            setTimeout(() => setShowNotification(false), 5000);
            
            toast.info("السائق قريب منك!", {
              description: "تقدير الوصول: 5 دقائق"
            });
          }
          else if (prev > 0.5 && newDistance <= 0.5) {
            setNotificationMessage("السائق على وشك الوصول!");
            setNotificationType("success");
            setShowNotification(true);
            setDriverStatus("وصول قريباً");
            
            setTimeout(() => setShowNotification(false), 5000);
            
            toast.success("السائق على وشك الوصول!", {
              description: "تقدير الوصول: دقيقتان"
            });
          }
          else if (prev > 0.1 && newDistance <= 0.1) {
            setNotificationMessage("السائق وصل إلى موقعك!");
            setNotificationType("success");
            setShowNotification(true);
            setDriverStatus("وصل");
            
            // Keep this notification visible
            
            toast.success("تم الوصول!", {
              description: "السائق في موقعك الآن"
            });
          }
          
          return newDistance;
        });
      }, 5000);
      
      return () => {
        clearInterval(rotationInterval);
        clearInterval(distanceInterval);
      };
    }
  }, [tracking]);

  // Handle driver contact
  const handleCallDriver = () => {
    toast.info("جاري الاتصال بالسائق", {
      description: "+966 50 123 4567",
      duration: 3000
    });
  };

  const handleMessageDriver = () => {
    window.location.href = "/chat/driver-1";
  };

  return (
    <div className="w-full h-full bg-blue-50 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ 
        backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/45.0,24.0,14/1280x720?access_token=pk.placeholder')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "contrast(1.1) brightness(0.95)"
      }}>
      </div>
      
      {/* Map grid overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sky-100/30"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%230891b2' fill-opacity='0.05'/%3E%3C/svg%3E")`,
      }}></div>
      
      {/* Current location marker - user's position */}
      <div className="absolute top-1/2 right-1/2 z-10">
        <div className="relative">
          <div className="w-6 h-6 bg-sky-500 rounded-full border-4 border-white shadow-lg"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500 rounded-full -z-10 animate-ping opacity-10"></div>
        </div>
      </div>
      
      {/* Truck icon - if tracking mode */}
      {tracking && (
        <div className="absolute" style={{ 
          top: `calc(50% - ${currentDistance * 30}px)`, 
          right: `calc(50% + ${currentDistance * 20}px)`
        }}>
          <div className="relative">
            {showNotification && (
              <IceNotification 
                message={notificationMessage} 
                type={notificationType} 
              />
            )}
            
            <IcyIcon size="lg" pulse={currentDistance < 0.5} onClick={() => {}}>
              <Truck 
                size={36} 
                className="text-blue-900" 
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </IcyIcon>
            
            {/* Driver status and quick actions */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-xl shadow-lg text-xs font-bold flex flex-col items-center w-32">
              <div className="flex items-center mb-1">
                <Clock className="w-3 h-3 text-moprd-teal mr-1" />
                <span className="text-moprd-blue">{estimatedMinutes} دقيقة</span>
              </div>
              <span className="text-xs text-gray-600 mb-2">{driverStatus}</span>
              
              <div className="flex gap-2 mt-1">
                <div onClick={handleCallDriver} className="p-1.5 bg-moprd-teal/20 rounded-full cursor-pointer hover:bg-moprd-teal/30">
                  <Phone size={14} className="text-moprd-teal" />
                </div>
                <div onClick={handleMessageDriver} className="p-1.5 bg-moprd-teal/20 rounded-full cursor-pointer hover:bg-moprd-teal/30">
                  <MessageSquare size={14} className="text-moprd-teal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Route line */}
      {tracking && (
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          <path 
            d={`M ${50 + currentDistance * 20} ${50 - currentDistance * 30} Q ${60} ${40}, ${50} ${50}`}
            stroke="url(#routeGradient)" 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
        </svg>
      )}
      
      {/* Simulated other trucks */}
      <div className="absolute top-1/3 right-1/3 transform translate-x-24 translate-y-8 z-10">
        <div className="bg-white p-1 rounded-full shadow-lg">
          <div className="bg-moprd-blue p-1 rounded-full text-white">
            <Truck size={18} />
          </div>
        </div>
        <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow-md text-center">3.4 كم</div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3 transform -translate-x-12 translate-y-8 z-10">
        <div className="bg-white p-1 rounded-full shadow-lg">
          <div className="bg-moprd-teal p-1 rounded-full text-white">
            <Truck size={18} />
          </div>
        </div>
        <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow-md text-center">2.7 كم</div>
      </div>
      
      {/* Navigation instructions if in tracking mode */}
      {tracking && (
        <div className="absolute bottom-4 right-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-moprd-teal/20 rounded-full mr-3">
              <Navigation className="text-moprd-teal" />
            </div>
            <div>
              <p className="text-sm font-medium">يتجه السائق إليك الآن</p>
              <p className="text-xs text-gray-500">المنطقة الشمالية، شارع الملك عبد العزيز</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTruckMap;
