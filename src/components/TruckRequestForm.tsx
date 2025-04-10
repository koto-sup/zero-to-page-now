
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";
import TruckTypeSelector from "@/components/TruckTypeSelector";

interface RequestDetails {
  startLocation: string;
  destination: string;
  distance: number;
  estimatedPrice: number;
}

interface TruckRequestFormProps {
  onRequestSubmitted: (details: RequestDetails) => void;
  discountApplied?: boolean;
}

const TruckRequestForm: React.FC<TruckRequestFormProps> = ({ onRequestSubmitted, discountApplied = false }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [truckType, setTruckType] = useState("refrigerated");
  const [loading, setLoading] = useState(false);

  // Update price when truck type changes
  useEffect(() => {
    // Base prices for different truck types
    const basePrices: Record<string, number> = {
      refrigerated: 110,
      transport: 95,
      store: 120,
      crane: 150,
      wood: 105,
      tractor: 130,
      "loading-crane": 160,
      bulldozer: 170,
      "dump-truck": 125,
      "skid-steer": 115,
      flatbed: 100,
      backhoe: 145,
      "front-loader": 140
    };

    const basePrice = basePrices[truckType] || 100;
    const calculatedDistance = estimateDistance(startLocation, destination);
    setDistance(calculatedDistance);
    
    let price = basePrice * calculatedDistance;
    
    // Apply discount if applicable
    if (discountApplied) {
      price = price * 0.85; // 15% discount
    }
    
    setEstimatedPrice(Math.round(price));
  }, [truckType, startLocation, destination, discountApplied]);

  // Simulate distance calculation
  const estimateDistance = (start: string, end: string): number => {
    if (!start || !end) return 1;
    // In a real app, we'd use a mapping API to calculate this
    // For simulation, we'll generate a random distance between 1-20
    return Math.max(1, Math.min(20, (start.length + end.length) % 20 + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startLocation || !destination) {
      // In a real app, we'd show validation errors
      return;
    }
    
    setLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      onRequestSubmitted({
        startLocation,
        destination,
        distance,
        estimatedPrice,
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="startLocation">موقع الانطلاق</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="startLocation"
                      className="pr-10"
                      placeholder="أدخل موقع الانطلاق"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="destination">الوجهة</Label>
                  <div className="relative">
                    <Navigation className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="destination"
                      className="pr-10"
                      placeholder="أدخل الوجهة"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <TruckTypeSelector 
            selectedTruckType={truckType}
            onTruckTypeChange={setTruckType}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">تفاصيل الرحلة</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span>المسافة التقديرية:</span>
                  <span className="font-medium">{distance} كم</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span>نوع الشاحنة:</span>
                  <span className="font-medium">
                    {truckType === "refrigerated" && "شاحنة مبردة"}
                    {truckType === "transport" && "شاحنة نقل"}
                    {truckType === "store" && "شاحنة متجر"}
                    {truckType === "crane" && "شاحنة رافعة"}
                    {truckType === "wood" && "شاحنة نقل الأخشاب"}
                    {truckType === "tractor" && "جرار زراعي"}
                    {truckType === "loading-crane" && "رافعة تحميل"}
                    {truckType === "bulldozer" && "جرافة"}
                    {truckType === "dump-truck" && "شاحنة قلابة"}
                    {truckType === "skid-steer" && "لودر انزلاقي"}
                    {truckType === "flatbed" && "شاحنة مسطحة"}
                    {truckType === "backhoe" && "حفارة خلفية"}
                    {truckType === "front-loader" && "لودر أمامي"}
                  </span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span>وقت الوصول التقديري:</span>
                  <span className="font-medium">{Math.round(distance * 5)} دقيقة</span>
                </div>
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>السعر التقديري:</span>
                  <span className="text-green-600">
                    {estimatedPrice} ريال
                    {discountApplied && (
                      <span className="mr-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        خصم 15%
                      </span>
                    )}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  الأسعار تقديرية وقد تتغير حسب العرض والطلب والمسافة الفعلية
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            type="submit" 
            className="w-full bg-moprd-teal hover:bg-moprd-blue h-12 text-lg"
            disabled={loading}
          >
            {loading ? "جاري البحث..." : "البحث عن شاحنات"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TruckRequestForm;
