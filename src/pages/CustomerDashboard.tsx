
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Import our new components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NearbyTrucksSection from "@/components/dashboard/NearbyTrucksSection";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingDeliveries from "@/components/dashboard/UpcomingDeliveries";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate loading AI notifications
    const timer = setTimeout(() => {
      setNotifications([
        "شاحنة مبردة متاحة على بعد 1.2 كم من موقعك!",
        "نلاحظ أنك تبحث عن شاحنات بسعة تبريد عالية، هناك 3 شاحنات متاحة الآن",
        "تحذير: هناك اختناق مروري في الطريق المفضل لديك، يرجى التخطيط وفقًا لذلك"
      ]);
      
      // Show the first notification as a toast
      toast.success("شاحنة مبردة متاحة بالقرب منك!", {
        description: "شاحنة على بعد 1.2 كم من موقعك، اضغط للتفاصيل",
        action: {
          label: "عرض",
          onClick: () => window.location.href = "/find-trucks"
        }
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const nearbyTrucks = [
    {
      id: "truck-1",
      driverName: "خالد السائق",
      truckModel: "شاحنة مبردة XL",
      distance: 1.2,
      available: true
    },
    {
      id: "truck-2",
      driverName: "محمد السائق",
      truckModel: "ناقل بارد برو",
      distance: 2.4,
      available: true
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader userName={user?.name} />
      
      {/* Map Section */}
      <NearbyTrucksSection nearbyTrucks={nearbyTrucks} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <AiRecommendations notifications={notifications} />
        
        {/* Recent Activity */}
        <RecentActivity />
      </div>
      
      {/* Upcoming Deliveries */}
      <UpcomingDeliveries user={user} />
    </div>
  );
};

export default CustomerDashboard;
