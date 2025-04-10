
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    toast.success(`You are now ${checked ? "available" : "unavailable"} for bookings`);
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
          <h1 className="text-3xl font-bold mb-2">Driver Dashboard</h1>
          <p className="text-gray-600">
            Manage your truck details and bookings
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
                {isAvailable ? "Available for Bookings" : "Currently Unavailable"}
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
              Edit Truck Profile
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
                  Today's Earnings
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
                  Bookings This Week
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
                  Average Rating
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
                  Weekly Earnings Overview
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
                  New Requests
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
                    <Badge className="bg-moprd-blue">New</Badge>
                  </div>
                  <Link to="/chat">
                    <Button size="sm" variant="outline" className="w-full">
                      Respond
                    </Button>
                  </Link>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Jane Doe</p>
                      <p className="text-sm text-muted-foreground">Philadelphia to DC</p>
                    </div>
                    <Badge className="bg-green-600">Quote Sent</Badge>
                  </div>
                  <Link to="/chat">
                    <Button size="sm" variant="outline" className="w-full">
                      View Chat
                    </Button>
                  </Link>
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
              Recent Bookings
            </div>
          </CardTitle>
          <Link to="/bookings">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Route</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Actions</th>
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
                        <Badge className="bg-yellow-500">Pending</Badge>
                      )}
                      {booking.status === "in_progress" && (
                        <Badge className="bg-blue-500">In Progress</Badge>
                      )}
                      {booking.status === "completed" && (
                        <Badge className="bg-green-600">Completed</Badge>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-1">
                        {booking.status === "pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <CheckSquare className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                        {booking.status !== "pending" && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
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
