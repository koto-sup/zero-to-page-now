
import React, { useState } from "react";
import { useAuth, DriverDetails } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingDeliveries } from "@/components/dashboard/UpcomingDeliveries";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Dashboard = () => {
  const { user, driverDetails, updateDriverDetails } = useAuth();
  const { language } = useLanguage();
  const [editMode, setEditMode] = useState(false);
  const [localDriverDetails, setLocalDriverDetails] = useState<DriverDetails>(
    driverDetails || {
      truckType: "",
      truckCapacity: "",
      licensePlate: "",
      refrigerationCapability: false,
      available: true
    }
  );

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">{language === "en" ? "Not Authenticated" : "غير مصرح"}</h1>
        <p className="mt-2">{language === "en" ? "Please login to view this page" : "الرجاء تسجيل الدخول لعرض هذه الصفحة"}</p>
      </div>
    );
  }

  const handleSaveDetails = async () => {
    if (updateDriverDetails) {
      const success = await updateDriverDetails(localDriverDetails);
      if (success) {
        setEditMode(false);
        toast.success(language === "en" ? "Driver details updated successfully" : "تم تحديث تفاصيل السائق بنجاح");
      }
    }
  };

  const isDriver = user.role === "driver";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{language === "en" ? "Dashboard" : "لوحة التحكم"}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Welcome," : "مرحبًا،"} {user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {isDriver && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{language === "en" ? "Truck Details" : "تفاصيل الشاحنة"}</h3>
                    <Button
                      onClick={() => setEditMode(!editMode)}
                      variant="outline"
                      size="sm"
                    >
                      {editMode 
                        ? (language === "en" ? "Cancel" : "إلغاء") 
                        : (language === "en" ? "Edit" : "تعديل")
                      }
                    </Button>
                  </div>
                  
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="truckType">{language === "en" ? "Truck Type" : "نوع الشاحنة"}</Label>
                          <Input
                            id="truckType"
                            value={localDriverDetails.truckType}
                            onChange={(e) => setLocalDriverDetails({
                              ...localDriverDetails,
                              truckType: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="truckCapacity">{language === "en" ? "Capacity" : "السعة"}</Label>
                          <Input
                            id="truckCapacity"
                            value={localDriverDetails.truckCapacity}
                            onChange={(e) => setLocalDriverDetails({
                              ...localDriverDetails,
                              truckCapacity: e.target.value
                            })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="licensePlate">{language === "en" ? "License Plate" : "رقم اللوحة"}</Label>
                        <Input
                          id="licensePlate"
                          value={localDriverDetails.licensePlate}
                          onChange={(e) => setLocalDriverDetails({
                            ...localDriverDetails,
                            licensePlate: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={localDriverDetails.refrigerationCapability}
                          onCheckedChange={(checked) => setLocalDriverDetails({
                            ...localDriverDetails,
                            refrigerationCapability: checked
                          })}
                          id="refrigeration"
                        />
                        <Label htmlFor="refrigeration">
                          {language === "en" ? "Refrigeration Capability" : "إمكانية التبريد"}
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={localDriverDetails.available}
                          onCheckedChange={(checked) => setLocalDriverDetails({
                            ...localDriverDetails,
                            available: checked
                          })}
                          id="available"
                        />
                        <Label htmlFor="available">
                          {language === "en" ? "Available for Hire" : "متاح للإيجار"}
                        </Label>
                      </div>
                      
                      <Button onClick={handleSaveDetails}>
                        {language === "en" ? "Save Changes" : "حفظ التغييرات"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {driverDetails ? (
                        <>
                          <p><strong>{language === "en" ? "Truck Type:" : "نوع الشاحنة:"}</strong> {driverDetails.truckType || "Not specified"}</p>
                          <p><strong>{language === "en" ? "Capacity:" : "السعة:"}</strong> {driverDetails.truckCapacity || "Not specified"}</p>
                          <p><strong>{language === "en" ? "License Plate:" : "رقم اللوحة:"}</strong> {driverDetails.licensePlate || "Not specified"}</p>
                          <p><strong>{language === "en" ? "Refrigeration:" : "التبريد:"}</strong> {driverDetails.refrigerationCapability ? 
                            (language === "en" ? "Yes" : "نعم") : 
                            (language === "en" ? "No" : "لا")}
                          </p>
                          <p><strong>{language === "en" ? "Status:" : "الحالة:"}</strong> {driverDetails.available ? 
                            (language === "en" ? "Available" : "متاح") : 
                            (language === "en" ? "Not Available" : "غير متاح")}
                          </p>
                        </>
                      ) : (
                        <p>{language === "en" ? "No truck details available. Click Edit to add details." : "لا توجد تفاصيل للشاحنة. انقر على تعديل لإضافة التفاصيل."}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Recent activity section */}
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <UpcomingDeliveries />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
