
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chart, ChartData, ChartOptions } from "@/components/ui/chart";
import { useNavigate } from "react-router-dom";
import { 
  Users, Truck, DollarSign, LineChart, 
  ArrowUpRight, ArrowDownRight, Activity,
  CalendarDays, MapPin, Filter
} from "lucide-react";

// Mock data
const revenueData: ChartData = {
  labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
  datasets: [
    {
      label: "الإيرادات",
      data: [43500, 51200, 63400, 58200, 72500, 83100],
      fill: true,
      backgroundColor: "rgba(8, 145, 178, 0.1)",
      borderColor: "rgb(8, 145, 178)",
      tension: 0.4,
    }
  ],
};

const usersData: ChartData = {
  labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
  datasets: [
    {
      label: "العملاء",
      data: [250, 340, 435, 470, 520, 610],
      fill: true,
      backgroundColor: "rgba(34, 211, 238, 0.1)",
      borderColor: "rgb(34, 211, 238)",
      tension: 0.4,
    },
    {
      label: "السائقين",
      data: [120, 150, 210, 240, 270, 320],
      fill: true,
      backgroundColor: "rgba(244, 114, 182, 0.1)",
      borderColor: "rgb(244, 114, 182)",
      tension: 0.4,
    }
  ],
};

const tripsData: ChartData = {
  labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
  datasets: [
    {
      label: "الرحلات",
      data: [420, 580, 690, 710, 840, 950],
      backgroundColor: "rgb(8, 145, 178)",
    }
  ],
};

const chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const recentCustomers = [
  { id: 1, name: "أحمد علي", status: "active", trips: 12, spending: 4350 },
  { id: 2, name: "محمد خالد", status: "active", trips: 8, spending: 2780 },
  { id: 3, name: "فاطمة سعد", status: "inactive", trips: 5, spending: 1350 },
  { id: 4, name: "نورة عبدالله", status: "active", trips: 15, spending: 5200 }
];

const recentDrivers = [
  { id: 1, name: "عبدالله محمد", status: "online", trips: 28, revenue: 9850, rating: 4.8 },
  { id: 2, name: "خالد سعيد", status: "offline", trips: 64, revenue: 18400, rating: 4.7 },
  { id: 3, name: "فهد عبدالرحمن", status: "online", trips: 42, revenue: 12350, rating: 4.9 },
  { id: 4, name: "سالم فهد", status: "offline", trips: 35, revenue: 9800, rating: 4.6 }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">
            مرحبًا بك في لوحة تحكم البيانات والإحصائيات
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          <Select
            defaultValue={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">اليوم</SelectItem>
              <SelectItem value="week">الأسبوع</SelectItem>
              <SelectItem value="month">الشهر</SelectItem>
              <SelectItem value="quarter">الربع</SelectItem>
              <SelectItem value="year">السنة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            تصفية
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  إجمالي الإيرادات
                </p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold">356,580</h3>
                  <span className="text-sm mr-1">ريال</span>
                </div>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>23% زيادة</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  إجمالي العملاء
                </p>
                <h3 className="text-2xl font-bold">1,485</h3>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>12% زيادة</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  إجمالي السائقين
                </p>
                <h3 className="text-2xl font-bold">682</h3>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>8% زيادة</span>
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Truck className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  إجمالي الرحلات
                </p>
                <h3 className="text-2xl font-bold">4,826</h3>
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>5% انخفاض</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="customers">العملاء</TabsTrigger>
          <TabsTrigger value="drivers">السائقين</TabsTrigger>
          <TabsTrigger value="requests">الطلبات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>الإيرادات (آخر 6 أشهر)</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart 
                  type="line" 
                  data={revenueData} 
                  options={chartOptions}
                  className="h-80" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تحليل المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart 
                  type="line" 
                  data={usersData} 
                  options={chartOptions}
                  className="h-80" 
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>أحدث العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-right border-b">
                        <th className="pb-3 font-medium">العميل</th>
                        <th className="pb-3 font-medium">الحالة</th>
                        <th className="pb-3 font-medium">عدد الرحلات</th>
                        <th className="pb-3 font-medium">الإنفاق</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentCustomers.map((customer) => (
                        <tr key={customer.id}>
                          <td className="py-3">{customer.name}</td>
                          <td className="py-3">
                            {customer.status === "active" ? (
                              <Badge className="bg-green-500">نشط</Badge>
                            ) : (
                              <Badge variant="outline">غير نشط</Badge>
                            )}
                          </td>
                          <td className="py-3">{customer.trips}</td>
                          <td className="py-3">{customer.spending} ريال</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full">عرض جميع العملاء</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إجمالي الرحلات</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart 
                  type="bar" 
                  data={tripsData} 
                  options={chartOptions}
                  className="h-80" 
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>جميع العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">بيانات العملاء مفصلة هنا...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>أحدث السائقين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-right border-b">
                      <th className="pb-3 font-medium">السائق</th>
                      <th className="pb-3 font-medium">الحالة</th>
                      <th className="pb-3 font-medium">عدد الرحلات</th>
                      <th className="pb-3 font-medium">الإيرادات</th>
                      <th className="pb-3 font-medium">التقييم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentDrivers.map((driver) => (
                      <tr key={driver.id}>
                        <td className="py-3">{driver.name}</td>
                        <td className="py-3">
                          {driver.status === "online" ? (
                            <Badge className="bg-green-500">متصل</Badge>
                          ) : (
                            <Badge variant="outline">غير متصل</Badge>
                          )}
                        </td>
                        <td className="py-3">{driver.trips}</td>
                        <td className="py-3">{driver.revenue} ريال</td>
                        <td className="py-3">{driver.rating} ★</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="w-full">عرض جميع السائقين</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>جميع الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">بيانات الطلبات مفصلة هنا...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
