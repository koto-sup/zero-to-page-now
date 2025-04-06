
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
    driverName: "John Driver",
    truckModel: "Refrigerated Truck XL",
    refrigerationCapacity: "5 tons",
    rating: 4.8,
    distance: 1.2,
    image: "/placeholder.svg",
    isAvailable: true,
  },
  {
    id: "truck-2",
    driverId: "driver-2",
    driverName: "Sarah Smith",
    truckModel: "Cold Transport Pro",
    refrigerationCapacity: "3 tons",
    rating: 4.5,
    distance: 2.4,
    image: "/placeholder.svg",
    isAvailable: true,
  },
  {
    id: "truck-3",
    driverId: "driver-3",
    driverName: "Mike Johnson",
    truckModel: "Refrigerator Express",
    refrigerationCapacity: "7 tons",
    rating: 4.9,
    distance: 3.7,
    image: "/placeholder.svg",
    isAvailable: false,
  },
  {
    id: "truck-4",
    driverId: "driver-4",
    driverName: "Emily Williams",
    truckModel: "Chill Carrier",
    refrigerationCapacity: "4 tons",
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
      toast.error("Please enter a location");
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
        <h1 className="text-3xl font-bold mb-4">Find Refrigerated Trucks</h1>
        <p className="text-gray-600">
          Search for available refrigerated trucks in your area
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="location" className="mb-2 block">Search Location</Label>
              <div className="relative">
                <Input
                  id="location"
                  placeholder="Enter city, zip code or address"
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoaded && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            {trucks.length} Trucks Found
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
          <p className="text-xl text-gray-500">No trucks found in this area.</p>
          <p className="text-gray-500 mt-2">Try expanding your search radius.</p>
        </div>
      )}
    </div>
  );
};

export default FindTrucks;
