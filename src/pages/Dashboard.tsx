
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Chart,
  ChartData,
  ChartOptions
} from "@/components/ui/chart";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent"; 
import {
  TruckIcon,
  MessageSquare,
  DollarSign,
  Star,
  BarChart3,
  Clock,
  AlertCircle,
  CheckSquare,
  Snowflake
} from "lucide-react";

// Mock data
const mockBookings = [
  {
    id: "booking-1",
    customerName: "Customer User",
    pickupLocation: "New York, NY",
    deliveryLocation: "Boston, MA",
    status: "pending",
    date: "2025-04-08",
    amount: 320,
  },
  {
    id: "booking-2",
    customerName: "Jane Doe",
    pickupLocation: "Philadelphia, PA",
    deliveryLocation: "Washington, DC",
    status: "completed",
    date: "2025-04-05",
    amount: 280,
  },
  {
    id: "booking-3",
    customerName: "Robert Smith",
    pickupLocation: "Baltimore, MD",
    deliveryLocation: "Richmond, VA",
    status: "in_progress",
    date: "2025-04-07",
    amount: 350,
  },
];

const Dashboard = () => {
  const { user, driverDetails, updateDriverDetails } = useAuth();
  const { language, t } = useLanguage();
  const { getDashboardContent } = useLanguageContent();
  const dashboardContent = getDashboardContent();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(driverDetails?.available || false);
  
  // Redirect if not a driver
  React.useEffect(() => {
    if (user && user.role !== "driver") {
      window.location.href = "/";
    }
  }, [user]);

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    updateDriverDetails({ available: checked });
    
    const message = language === 'en' 
      ? `You are now ${checked ? "available" : "unavailable"} for bookings`
      : checked ? "أنت الآن متاح للحجوزات" : "أنت الآن غير متاح للحجوزات";
      
    toast.success(message);
  };

  const handleAcceptBooking = (bookingId: string) => {
    const message = language === 'en'
      ? "Booking accepted successfully"
      : "تم قبول الحجز بنجاح";
    toast.success(message);
  };

  const handleRejectBooking = (bookingId: string) => {
    const message = language === 'en'
      ? "Booking rejected"
      : "تم رفض الحجز";
    toast.success(message);
  };

  const handleContactCustomer = (bookingId: string, customerId: string = "customer-1") => {
    // Navigate to chat with this specific customer
    navigate(`/chat/${customerId}`);
  };
  
  // Chart data
  const earningsData: ChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Earnings",
        data: [150, 220, 180, 260, 290, 350, 180],
        fill: true,
        backgroundColor: "rgba(8, 145, 178, 0.2)",
        borderColor: "rgb(8, 145, 178)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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

  if (!user || user.role !== "driver") {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('dashboard')}</h1>
          <p className="text-gray-600">
            {t('manageTruckDetails')}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          {/* Enhanced availability toggle with IceButtonV2 */}
          <div className="w-full md:w-auto">
            <IceButtonV2
              className={`flex items-center justify-center gap-2 py-2 px-4 w-full md:w-auto ${
                isAvailable 
                ? "border border-cyan-400 shadow-lg shadow-cyan-200/50" 
                : "border border-gray-300"
              }`}
              variant={isAvailable ? "default" : "outline"}
              onClick={() => handleAvailabilityChange(!isAvailable)}
              iceDrips={isAvailable}
              iceGlow={isAvailable}
            >
              <div className={`p-2 rounded-full ${isAvailable ? "bg-cyan-100" : "bg-gray-100"}`}>
                <Snowflake 
                  className={`h-5 w-5 ${isAvailable ? "text-cyan-600" : "text-gray-400"}`} 
                  size={20} 
                />
              </div>
              <span className="font-medium">
                {isAvailable ? t('availableForBookings') : t('currentlyUnavailable')}
              </span>
              <div className="relative ml-2">
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleAvailabilityChange}
                  className="ice-switch"
                >
                  <div className="ice-switch-thumb" />
                </Switch>
              </div>
            </IceButtonV2>
          </div>
          <Link to="/truck-details" className="w-full md:w-auto">
            <IceButtonV2 variant="outline" className="w-full md:w-auto">
              {t('editTruckProfile')}
            </IceButtonV2>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t('todaysEarnings')}
                </p>
                <h3 className="text-2xl font-bold">$185.00</h3>
              </div>
              <div className="p-2 bg-moprd-teal/10 rounded-full">
                <DollarSign className="h-6 w-6 text-moprd-teal" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t('bookingsThisWeek')}
                </p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <div className="p-2 bg-moprd-blue/10 rounded-full">
                <TruckIcon className="h-6 w-6 text-moprd-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t('averageRating')}
                </p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold mr-1">4.8</h3>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  {t('weeklyEarningsOverview')}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart 
                type="line" 
                data={earningsData} 
                options={chartOptions}
                className="h-64" 
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {t('newRequests')}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/20 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Customer User</p>
                      <p className="text-sm text-muted-foreground">New York to Boston</p>
                    </div>
                    <Badge className="bg-moprd-blue">{t('pending')}</Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContactCustomer("new-request-1", "customer-1")}
                  >
                    {t('respond')}
                  </Button>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Jane Doe</p>
                      <p className="text-sm text-muted-foreground">Philadelphia to DC</p>
                    </div>
                    <Badge className="bg-green-600">{t('completed')}</Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContactCustomer("new-request-2", "customer-2")}
                  >
                    {t('viewChat')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {t('recentBookings')}
            </div>
          </CardTitle>
          <Link to="/bookings">
            <Button variant="ghost" size="sm">
              {t('viewAll')}
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">{t('customer')}</th>
                  <th className="pb-2 font-medium">{t('route')}</th>
                  <th className="pb-2 font-medium">{t('date')}</th>
                  <th className="pb-2 font-medium">{t('amount')}</th>
                  <th className="pb-2 font-medium">{t('status')}</th>
                  <th className="pb-2 font-medium">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="py-3">{booking.customerName}</td>
                    <td className="py-3 text-muted-foreground">
                      {booking.pickupLocation} → {booking.deliveryLocation}
                    </td>
                    <td className="py-3">{booking.date}</td>
                    <td className="py-3">${booking.amount}</td>
                    <td className="py-3">
                      {booking.status === "pending" && (
                        <Badge className="bg-yellow-500">{t('pending')}</Badge>
                      )}
                      {booking.status === "in_progress" && (
                        <Badge className="bg-blue-500">{t('inProgress')}</Badge>
                      )}
                      {booking.status === "completed" && (
                        <Badge className="bg-green-600">{t('completed')}</Badge>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-1">
                        {booking.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleAcceptBooking(booking.id)}
                            >
                              <CheckSquare className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleRejectBooking(booking.id)}
                            >
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleContactCustomer(booking.id, booking.customerName.replace(" ", "-").toLowerCase())}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
