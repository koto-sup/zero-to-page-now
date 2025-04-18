
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, Truck, DollarSign, MessageSquare } from "lucide-react";

// Mock activity data
const activityData = [
  {
    id: "act-1",
    type: "booking",
    title: {
      en: "New booking request",
      ar: "طلب حجز جديد"
    },
    description: {
      en: "Customer requested a Refrigerated Truck",
      ar: "طلب العميل شاحنة مبردة"
    },
    time: "12:30",
    date: "2025-04-17",
    status: "pending"
  },
  {
    id: "act-2",
    type: "payment",
    title: {
      en: "Payment received",
      ar: "تم استلام الدفعة"
    },
    description: {
      en: "SAR 480 received for booking #BK8812",
      ar: "تم استلام 480 ريال للحجز #BK8812"
    },
    time: "09:15",
    date: "2025-04-17",
    status: "completed"
  },
  {
    id: "act-3",
    type: "trip",
    title: {
      en: "Trip completed",
      ar: "تم إكمال الرحلة"
    },
    description: {
      en: "Trip from Riyadh to Jeddah completed successfully",
      ar: "تم إكمال الرحلة من الرياض إلى جدة بنجاح"
    },
    time: "18:45",
    date: "2025-04-16",
    status: "completed"
  },
  {
    id: "act-4",
    type: "message",
    title: {
      en: "New message",
      ar: "رسالة جديدة"
    },
    description: {
      en: "You have a new message from Mohammed",
      ar: "لديك رسالة جديدة من محمد"
    },
    time: "14:20",
    date: "2025-04-16",
    status: "unread"
  },
  {
    id: "act-5",
    type: "system",
    title: {
      en: "System maintenance",
      ar: "صيانة النظام"
    },
    description: {
      en: "System will be down for maintenance on Apr 20",
      ar: "سيكون النظام متوقفًا للصيانة في 20 أبريل"
    },
    time: "08:00",
    date: "2025-04-15",
    status: "info"
  }
];

const Activity: React.FC = () => {
  const { language } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case "trip":
        return <Truck className="h-5 w-5 text-orange-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">{language === "en" ? "Completed" : "مكتمل"}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">{language === "en" ? "Pending" : "معلق"}</Badge>;
      case "unread":
        return <Badge className="bg-purple-500">{language === "en" ? "Unread" : "غير مقروء"}</Badge>;
      case "info":
        return <Badge className="bg-blue-500">{language === "en" ? "Info" : "معلومات"}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {language === "en" ? "Activity" : "النشاط"}
        </h1>
        <p className="text-gray-600 mt-2">
          {language === "en" 
            ? "Recent activity and notifications" 
            : "النشاطات والإشعارات الأخيرة"}
        </p>
      </div>

      <div className="space-y-4">
        {activityData.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-gray-100 mr-4">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{language === "en" ? item.title.en : item.title.ar}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === "en" ? item.description.en : item.description.ar}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.time} • {item.date}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Activity;
