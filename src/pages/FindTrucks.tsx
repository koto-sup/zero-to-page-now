
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Search, Loader2 } from "lucide-react";
import TruckCard from "@/components/TruckCard";
import { useAuth } from "@/contexts/AuthContext";

interface Truck {
  id: string;
  driverId: string;
  driverName: string;
  truckModel: string;
  refrigerationCapacity: string;
  rating: number;
  distance: number; // in miles
  image: string;
  isAvailable: boolean;
}

const MOCK_TRUCKS: Truck[] = [
  {
    id: "truck-1",
    driverId: "driver-1",
    driverName: "خالد السائق",
    truckModel: "شاحنة مبردة XL",
    refrigerationCapacity: "5 طن",
    rating: 4.8,
    distance: 1.2,
    image: "/placeholder.svg",
    isAvailable: true,
  },
  {
    id: "truck-2",
    driverId: "driver-2",
    driverName: "محمد السائق",
    truckModel: "ناقل بارد برو",
    refrigerationCapacity: "3 طن",
    rating: 4.5,
    distance: 2.4,
    image: "/placeholder.svg",
    isAvailable: true,
  },
  {
    id: "truck-3",
    driverId: "driver-3",
    driverName: "أحمد السائق",
    truckModel: "إكسبريس ثلاجة",
    refrigerationCapacity: "7 طن",
    rating: 4.9,
    distance: 3.7,
    image: "/placeholder.svg",
    isAvailable: false,
  },
  {
    id: "truck-4",
    driverId: "driver-4",
    driverName: "سارة السائق",
    truckModel: "ناقل مبرد",
    refrigerationCapacity: "4 طن",
    rating: 4.6,
    distance: 4.1,
    image: "/placeholder.svg",
    isAvailable: true,
  },
];

const FindTrucks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      toast.error("الرجاء إدخال موقع");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrucks(MOCK_TRUCKS);
      setIsSearching(false);
      setIsLoaded(true);
    }, 1500);
  };

  const handleRequestQuote = (truckId: string) => {
    // In a real app, we might create a chat/request in the database
    // For now, just navigate to chat
    const truck = MOCK_TRUCKS.find(t => t.id === truckId);
    if (!truck) return;
    
    navigate(`/chat/${truck.driverId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">البحث عن شاحنات مبردة</h1>
        <p className="text-gray-600">
          ابحث عن الشاحنات المبردة المتاحة في منطقتك
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="location" className="mb-2 block">البحث عن موقع</Label>
              <div className="relative">
                <Input
                  id="location"
                  placeholder="أدخل المدينة أو الرمز البريدي أو العنوان"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                type="submit" 
                className="bg-moprd-teal hover:bg-moprd-blue min-w-[120px]"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري البحث...
                  </>
                ) : (
                  "بحث"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoaded && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            تم العثور على {trucks.length} شاحنة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trucks.map((truck) => (
              <TruckCard
                key={truck.id}
                id={truck.id}
                driverName={truck.driverName}
                truckModel={truck.truckModel}
                refrigerationCapacity={truck.refrigerationCapacity}
                rating={truck.rating}
                distance={truck.distance}
                image={truck.image}
                isAvailable={truck.isAvailable}
                onRequestQuote={() => handleRequestQuote(truck.id)}
              />
            ))}
          </div>
        </>
      )}

      {isLoaded && trucks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">لم يتم العثور على شاحنات في هذه المنطقة.</p>
          <p className="text-gray-500 mt-2">حاول توسيع نطاق البحث الخاص بك.</p>
        </div>
      )}
    </div>
  );
};

export default FindTrucks;
