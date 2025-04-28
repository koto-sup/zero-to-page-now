
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSettings from "@/components/admin/AdminSettings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowLeft, Users, TruckIcon, Calendar, DollarSign, BarChart3, Activity, Settings, FileText, Bell, UserPlus, Shield, AlertTriangle, CheckCircle, Filter, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast(
        language === 'en' ? "Dashboard Updated" : "تم تحديث لوحة التحكم",
        {
          description: language === 'en' 
            ? "All data has been refreshed with the latest information" 
            : "تم تحديث جميع البيانات بأحدث المعلومات",
          position: "top-right"
        }
      );
    }, 1500);
  };

  const stats = [
    { 
      name: language === 'en' ? "Total Users" : "إجمالي المستخدمين", 
      value: "1,245",
      icon: Users,
      change: "+12%",
      color: "bg-blue-500"
    },
    { 
      name: language === 'en' ? "Active Drivers" : "السائقين النشطين", 
      value: "328",
      icon: TruckIcon,
      change: "+5%",
      color: "bg-green-500"
    },
    { 
      name: language === 'en' ? "Today's Bookings" : "حجوزات اليوم", 
      value: "24",
      icon: Calendar,
      change: "-3%",
      color: "bg-orange-500"
    },
    { 
      name: language === 'en' ? "Monthly Revenue" : "الإيرادات الشهرية", 
      value: "12,480 SAR",
      icon: DollarSign,
      change: "+18%",
      color: "bg-purple-500"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Ahmed Mohammed",
      action: language === 'en' ? "registered a new account" : "سجل حساب جديد",
      time: "10 minutes ago",
      status: "new"
    },
    {
      id: 2,
      user: "Fatima Abdullah",
      action: language === 'en' ? "requested a refrigerated truck" : "طلب شاحنة مبردة",
      time: "25 minutes ago",
      status: "pending"
    },
    {
      id: 3,
      user: "Omar Khalid",
      action: language === 'en' ? "updated driver profile" : "حدث ملف السائق",
      time: "45 minutes ago",
      status: "completed"
    },
    {
      id: 4,
      user: "Sara Ahmed",
      action: language === 'en' ? "submitted a support ticket" : "قدم تذكرة دعم",
      time: "1 hour ago",
      status: "urgent"
    },
    {
      id: 5,
      user: "Mohammed Ali",
      action: language === 'en' ? "changed payment method" : "غير طريقة الدفع",
      time: "2 hours ago",
      status: "completed"
    }
  ];

  const alerts = [
    {
      id: 1,
      title: language === 'en' ? "System Update" : "تحديث النظام",
      description: language === 'en' ? "Planned maintenance in 2 days" : "صيانة مخططة خلال يومين",
      type: "info",
      icon: Bell
    },
    {
      id: 2,
      title: language === 'en' ? "Security Alert" : "تنبيه أمني",
      description: language === 'en' ? "Unusual login attempts detected" : "تم اكتشاف محاولات تسجيل دخول غير عادية",
      type: "warning",
      icon: Shield 
    },
    {
      id: 3,
      title: language === 'en' ? "Payment Issue" : "مشكلة في الدفع",
      description: language === 'en' ? "Failed transactions need review" : "المعاملات الفاشلة تحتاج إلى مراجعة",
      type: "error",
      icon: AlertTriangle
    },
    {
      id: 4,
      title: language === 'en' ? "Verification Complete" : "اكتمل التحقق",
      description: language === 'en' ? "10 new drivers verified successfully" : "تم التحقق من 10 سائقين جدد بنجاح",
      type: "success",
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch(type) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const textDirection = language === 'en' ? "text-left" : "text-right";

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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshData}
              disabled={refreshing}
              className="h-10"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {language === 'en' ? "Refresh" : "تحديث"}
            </Button>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <div className="text-2xl font-bold mt-1">{stat.value}</div>
                    <div className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} {language === 'en' ? "from last month" : "من الشهر الماضي"}
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Card className="w-full md:w-3/4 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>{language === 'en' ? "User Growth" : "نمو المستخدمين"}</CardTitle>
              <CardDescription>{language === 'en' ? "Weekly registration summary" : "ملخص التسجيل الأسبوعي"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                {/* Chart would go here - using placeholder */}
                <BarChart3 className="h-32 w-32 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-1/4 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>{language === 'en' ? "Quick Actions" : "إجراءات سريعة"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Add User" : "إضافة مستخدم"}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TruckIcon className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Add Vehicle" : "إضافة مركبة"}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Send Notification" : "إرسال إشعار"}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  {language === 'en' ? "Generate Report" : "إنشاء تقرير"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="h-10">
              <TabsTrigger value="overview">{language === 'en' ? "Overview" : "نظرة عامة"}</TabsTrigger>
              <TabsTrigger value="users">{language === 'en' ? "Users" : "المستخدمين"}</TabsTrigger>
              <TabsTrigger value="drivers">{language === 'en' ? "Drivers" : "السائقين"}</TabsTrigger>
              <TabsTrigger value="bookings">{language === 'en' ? "Bookings" : "الحجوزات"}</TabsTrigger>
              <TabsTrigger value="settings">{language === 'en' ? "Settings" : "الإعدادات"}</TabsTrigger>
              <TabsTrigger value="reports">{language === 'en' ? "Reports" : "التقارير"}</TabsTrigger>
            </TabsList>

            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {language === 'en' ? "Filter" : "تصفية"}
            </Button>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-moprd-teal" />
                      {language === 'en' ? "Recent Activity" : "النشاط الأخير"}
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      {language === 'en' ? "View All" : "عرض الكل"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">
                            <span className="text-primary">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-moprd-teal" />
                      {language === 'en' ? "System Alerts" : "تنبيهات النظام"}
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      {language === 'en' ? "Manage" : "إدارة"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 pb-2 border-b">
                        <div className={`mt-1 p-2 rounded-full ${getAlertColor(alert.type).replace('text', 'bg')}`}>
                          <alert.icon className={`h-4 w-4 ${getAlertColor(alert.type)}`} />
                        </div>
                        <div>
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-moprd-teal" />
                  {language === 'en' ? "System Metrics" : "مقاييس النظام"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>{language === 'en' ? "Server Load" : "حمل الخادم"}</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>{language === 'en' ? "Database Storage" : "تخزين قاعدة البيانات"}</span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>{language === 'en' ? "API Calls" : "طلبات API"}</span>
                    <span>12,450 / day</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>{language === 'en' ? "Active Sessions" : "الجلسات النشطة"}</span>
                    <span>356 users</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'en' ? "User Management" : "إدارة المستخدمين"}</CardTitle>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {language === 'en' ? "Add User" : "إضافة مستخدم"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-4">
                    {language === 'en'
                      ? "Enhanced user management interface with filtering, sorting, and bulk actions"
                      : "واجهة إدارة مستخدمين محسنة مع تصفية وفرز وإجراءات متعددة"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'en' ? "Driver Management" : "إدارة السائقين"}</CardTitle>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {language === 'en' ? "Add Driver" : "إضافة سائق"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-4">
                    {language === 'en'
                      ? "Enhanced driver management with verification status, vehicle assignments, and performance metrics"
                      : "إدارة سائقين محسنة مع حالة التحقق وتعيينات المركبات ومقاييس الأداء"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'en' ? "Booking Management" : "إدارة الحجوزات"}</CardTitle>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    {language === 'en' ? "Filter" : "تصفية"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-4">
                    {language === 'en'
                      ? "Enhanced booking management with status tracking, dispute resolution, and route optimization"
                      : "إدارة حجوزات محسنة مع تتبع الحالة وحل النزاعات وتحسين المسار"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>

          <TabsContent value="reports">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'en' ? "Reports & Analytics" : "التقارير والتحليلات"}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      {language === 'en' ? "Filter" : "تصفية"}
                    </Button>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      {language === 'en' ? "Export" : "تصدير"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-4">
                    {language === 'en'
                      ? "Enhanced analytics dashboard with customizable reports, visualization options, and scheduled exports"
                      : "لوحة تحليلات محسنة مع تقارير قابلة للتخصيص وخيارات التصور والتصدير المجدول"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
