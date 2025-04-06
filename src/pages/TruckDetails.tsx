
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { UploadIcon, Truck, Trash2, Snowflake, Check } from "lucide-react";

const TruckDetails = () => {
  const navigate = useNavigate();
  const { user, driverDetails, updateDriverDetails } = useAuth();

  // If not a driver, redirect to homepage
  React.useEffect(() => {
    if (user && user.role !== "driver") {
      navigate("/");
    }
  }, [user, navigate]);

  const [truckModel, setTruckModel] = useState(driverDetails?.truckModel || "");
  const [licensePlate, setLicensePlate] = useState(driverDetails?.licensePlate || "");
  const [refrigerationCapacity, setRefrigerationCapacity] = useState(
    driverDetails?.refrigerationCapacity || ""
  );
  const [available, setAvailable] = useState(driverDetails?.available || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    driverDetails?.truckImages || []
  );

  const handleImageUpload = () => {
    // In a real app, this would handle actual file uploads
    // For this demo, we'll just add a placeholder
    setUploadedImages(prev => [...prev, "/placeholder.svg"]);
    toast.success("Image uploaded successfully");
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!truckModel || !licensePlate || !refrigerationCapacity) {
      toast.error("Please fill out all required fields");
      setIsSubmitting(false);
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one truck image");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      updateDriverDetails({
        truckModel,
        licensePlate,
        refrigerationCapacity,
        truckImages: uploadedImages,
        available,
      });
      
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1000);
  };

  if (!user || user.role !== "driver") {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Truck Details</h1>
        <p className="text-gray-600">
          Provide information about your refrigerated truck to start receiving requests
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Truck Information
                </CardTitle>
                <CardDescription>
                  Enter the details of your refrigerated truck
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="truckModel">Truck Model</Label>
                  <Input
                    id="truckModel"
                    placeholder="e.g. Refrigerated Truck XL"
                    value={truckModel}
                    onChange={(e) => setTruckModel(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    placeholder="e.g. ABC-1234"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refrigerationCapacity">
                    <div className="flex items-center">
                      <Snowflake className="mr-2 h-4 w-4 text-moprd-teal" />
                      Refrigeration Capacity
                    </div>
                  </Label>
                  <Input
                    id="refrigerationCapacity"
                    placeholder="e.g. 5 tons"
                    value={refrigerationCapacity}
                    onChange={(e) => setRefrigerationCapacity(e.target.value)}
                  />
                </div>
                <div className="space-y-2 pt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={available}
                      onCheckedChange={setAvailable}
                      id="available"
                    />
                    <Label htmlFor="available" className="cursor-pointer">
                      {available ? "Available for bookings" : "Not available for bookings"}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Truck Images</CardTitle>
                <CardDescription>
                  Upload photos of your refrigerated truck
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Truck image ${index + 1}`}
                          className="rounded-md w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-24 border-dashed"
                  onClick={handleImageUpload}
                >
                  <div className="flex flex-col items-center">
                    <UploadIcon className="h-6 w-6 mb-2" />
                    <span>Upload Image</span>
                  </div>
                </Button>
                <div className="text-xs text-muted-foreground text-center">
                  Upload clear photos of your truck showing refrigeration equipment
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            className="bg-moprd-teal hover:bg-moprd-blue"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Saving...</>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Save Truck Details
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TruckDetails;
