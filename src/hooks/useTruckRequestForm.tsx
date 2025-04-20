
import { useState, useEffect } from "react";
import { RequestDetails } from "@/hooks/useTruckFinderState";

export interface TruckRequestFormState {
  startLocation: string;
  destination: string;
  distance: number;
  estimatedPrice: number;
  truckType: string;
  loading: boolean;
  daysSelected?: number;
  truckSize?: string;
  excavatorHeadType?: string;
  flatbedDeliveryOption?: string;
  refrigeratedOption?: string;
  mapSelectionMode: boolean;
  selectedMapLocation?: { lat: number; lng: number };
}

interface UseTruckRequestFormProps {
  discountApplied?: boolean;
  onRequestSubmitted: (details: RequestDetails) => void;
}

export const useTruckRequestForm = ({ discountApplied = false, onRequestSubmitted }: UseTruckRequestFormProps) => {
  const [formState, setFormState] = useState<TruckRequestFormState>({
    startLocation: "",
    destination: "",
    distance: 0,
    estimatedPrice: 0,
    truckType: "refrigerated",
    loading: false,
    daysSelected: 1,
    truckSize: "3ton",
    excavatorHeadType: "buckets",
    flatbedDeliveryOption: "none",
    refrigeratedOption: "standard",
    mapSelectionMode: false,
  });

  // Update price when truck type changes
  useEffect(() => {
    // Calculate estimated price based on the selected truck type
    let price = 0;
    const calculatedDistance = estimateDistance(formState.startLocation, formState.destination);
    
    switch (formState.truckType) {
      case "refrigerated":
        // 14 SAR per km + 48 SAR if refrigeration is activated
        price = 14 * calculatedDistance;
        if (formState.refrigeratedOption === "refrigerated") {
          price += 48;
        }
        break;
      case "jcp":
        // 578 SAR per day + potential flatbed delivery cost
        price = 578;
        if (formState.flatbedDeliveryOption === "delivery") {
          price += 238;
        } else if (formState.flatbedDeliveryOption === "roundtrip") {
          price += 488;
        }
        break;
      case "dump-truck":
        // 387 or 487 SAR per day based on size
        price = formState.truckSize === "3ton" ? 387 : 487;
        break;
      case "dump-loader":
        // 786 SAR per day for 20ton/18sqm dump loader
        price = 786;
        break;
      case "water-truck":
        // 148 SAR per day
        price = 148;
        break;
      case "crawler-excavator":
        // 687 SAR per day
        price = 687;
        break;
      case "wheel-excavator":
        // 1180 SAR per day
        price = 1180;
        break;
      default:
        // Default fallback
        price = 100;
    }
    
    // Apply discount if applicable
    if (discountApplied) {
      price = price * 0.85; // 15% discount
    }
    
    setFormState(prev => ({
      ...prev,
      distance: calculatedDistance,
      estimatedPrice: Math.round(price)
    }));
    
  }, [formState.truckType, formState.startLocation, formState.destination, discountApplied, formState.truckSize, formState.flatbedDeliveryOption, formState.refrigeratedOption]);

  // Simulate distance calculation
  const estimateDistance = (start: string, end: string): number => {
    if (!start || !end) return 1;
    // In a real app, we'd use a mapping API to calculate this
    // For simulation, we'll generate a random distance between 1-20
    return Math.max(1, Math.min(20, (start.length + end.length) % 20 + 1));
  };

  const handleStartLocationChange = (value: string) => {
    setFormState(prev => ({ ...prev, startLocation: value }));
  };

  const handleDestinationChange = (value: string) => {
    setFormState(prev => ({ ...prev, destination: value }));
  };

  const handleTruckTypeChange = (value: string) => {
    setFormState(prev => ({ ...prev, truckType: value }));
  };

  const handleDaysChange = (value: number) => {
    setFormState(prev => ({ ...prev, daysSelected: value }));
  };

  const handleTruckSizeChange = (value: string) => {
    setFormState(prev => ({ ...prev, truckSize: value }));
  };

  const handleExcavatorHeadChange = (value: string) => {
    setFormState(prev => ({ ...prev, excavatorHeadType: value }));
  };

  const handleFlatbedDeliveryOptionChange = (value: string) => {
    setFormState(prev => ({ ...prev, flatbedDeliveryOption: value }));
  };

  const handleRefrigeratedOptionChange = (value: string) => {
    setFormState(prev => ({ ...prev, refrigeratedOption: value }));
  };

  const setMapSelectionMode = (value: boolean) => {
    setFormState(prev => ({ ...prev, mapSelectionMode: value }));
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    setFormState(prev => ({ 
      ...prev, 
      selectedMapLocation: { lat, lng },
      startLocation: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})` 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formState.mapSelectionMode) {
      // For map-selection mode, we only need a valid map location
      if (!formState.selectedMapLocation) {
        alert("Please select a location on the map");
        return;
      }
    } else {
      // For standard mode, we need both start and destination
      if (!formState.startLocation || !formState.destination) {
        // In a real app, we'd show validation errors
        return;
      }
    }
    
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate API request delay
    setTimeout(() => {
      setFormState(prev => ({ ...prev, loading: false }));
      
      // Include additional details in the request
      onRequestSubmitted({
        startLocation: formState.startLocation,
        destination: formState.destination,
        distance: formState.distance,
        estimatedPrice: formState.estimatedPrice,
        truckType: formState.truckType,
        daysSelected: formState.daysSelected,
        truckSize: formState.truckSize,
        excavatorHeadType: formState.excavatorHeadType,
        flatbedDeliveryOption: formState.flatbedDeliveryOption,
        refrigeratedOption: formState.refrigeratedOption,
        useMapSelection: formState.mapSelectionMode
      });
    }, 1500);
  };

  return {
    formState,
    handleStartLocationChange,
    handleDestinationChange,
    handleTruckTypeChange,
    handleDaysChange,
    handleTruckSizeChange,
    handleExcavatorHeadChange,
    handleFlatbedDeliveryOptionChange,
    handleRefrigeratedOptionChange,
    handleMapLocationSelect,
    setMapSelectionMode,
    handleSubmit
  };
};
