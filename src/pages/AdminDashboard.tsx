
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSettings from "@/components/admin/AdminSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const stats = [
    { name: language === 'en' ? "Total Users" : "إجمالي المستخدمين", value: "1,245" },
    { name: language === 'en' ? "Active Drivers" : "السائقين النشطين", value: "328" },
    { name: language === 'en' ? "Today's Bookings" : "حجوزات اليوم", value: "24" },
    { name: language === 'en' ? "Monthly Revenue" : "الإيرادات الشهرية", value: "12,480 SAR" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? "Admin Dashboard" : "لوحة تحكم المسؤول"}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' ? "Manage system settings and monitor operations" : "إدارة إعدادات النظام ومراقبة العمليات"}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBack}
            className="h-10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? "Back" : "رجوع"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">{language === 'en' ? "Overview" : "نظرة عامة"}</TabsTrigger>
            <TabsTrigger value="users">{language === 'en' ? "Users" : "المستخدمين"}</TabsTrigger>
            <TabsTrigger value="drivers">{language === 'en' ? "Drivers" : "السائقين"}</TabsTrigger>
            <TabsTrigger value="bookings">{language === 'en' ? "Bookings" : "الحجوزات"}</TabsTrigger>
            <TabsTrigger value="settings">{language === 'en' ? "Settings" : "الإعدادات"}</TabsTrigger>
            <TabsTrigger value="reports">{language === 'en' ? "Reports" : "التقارير"}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? "Recent Activity" : "النشاط الأخير"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">
                            {language === 'en' ? `User registration #${1000 + i}` : `تسجيل مستخدم جديد #${1000 + i}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? `${i * 10} minutes ago` : `منذ ${i * 10} دقائق`}
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {language === 'en' ? "New" : "جديد"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? "System Metrics" : "مقاييس النظام"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? "Server Load" : "حمل الخادم"}</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? "Database Storage" : "تخزين قاعدة البيانات"}</span>
                      <span>62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? "API Calls" : "طلبات API"}</span>
                      <span>12,450 / day</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "User Management" : "إدارة المستخدمين"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'en' ? "User management interface will be displayed here." : "ستظهر واجهة إدارة المستخدمين هنا."}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Driver Management" : "إدارة السائقين"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'en' ? "Driver management interface will be displayed here." : "ستظهر واجهة إدارة السائقين هنا."}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Booking Management" : "إدارة الحجوزات"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'en' ? "Booking management interface will be displayed here." : "ستظهر واجهة إدارة الحجوزات هنا."}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Reports & Analytics" : "التقارير والتحليلات"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'en' ? "Reports and analytics interface will be displayed here." : "ستظهر واجهة التقارير والتحليلات هنا."}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
