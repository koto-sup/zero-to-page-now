
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface UpcomingDeliveriesProps {
  user: { name: string } | null;
}

const UpcomingDeliveries: React.FC<UpcomingDeliveriesProps> = ({ user }) => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Calendar className="ml-2 h-5 w-5 text-moprd-teal" />
          الشحنات المرتقبة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">ليس لديك أية شحنات قادمة حاليا</p>
            <Link to="/find-trucks">
              <Button variant="outline">البحث عن شاحنة</Button>
            </Link>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">يرجى تسجيل الدخول لعرض الشحنات المرتقبة</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeliveries;
