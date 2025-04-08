
import React from "react";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface AiRecommendationsProps {
  notifications: string[];
}

const AiRecommendations: React.FC<AiRecommendationsProps> = ({ notifications }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Bell className="ml-2 h-5 w-5 text-moprd-teal" />
          توصيات ذكية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start bg-blue-50 p-4 rounded-md">
              {index === 2 ? (
                <AlertTriangle className="h-5 w-5 text-amber-500 ml-3 flex-shrink-0 mt-0.5" />
              ) : (
                <TrendingUp className="h-5 w-5 text-moprd-teal ml-3 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={index === 2 ? "text-amber-700" : "text-moprd-blue"}>
                  {notification}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiRecommendations;
