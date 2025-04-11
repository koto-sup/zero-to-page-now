
import { useState, useEffect } from "react";
import { RequestDetails } from "@/hooks/useTruckFinderState";

export interface TruckRequestFormState {
  startLocation: string;
  destination: string;
  distance: number;
  estimatedPrice: number;
  truckType: string;
  loading: boolean;
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
    loading: false
  });

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

    const basePrice = basePrices[formState.truckType] || 100;
    const calculatedDistance = estimateDistance(formState.startLocation, formState.destination);
    
    let price = basePrice * calculatedDistance;
    
    // Apply discount if applicable
    if (discountApplied) {
      price = price * 0.85; // 15% discount
    }
    
    setFormState(prev => ({
      ...prev,
      distance: calculatedDistance,
      estimatedPrice: Math.round(price)
    }));
    
  }, [formState.truckType, formState.startLocation, formState.destination, discountApplied]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.startLocation || !formState.destination) {
      // In a real app, we'd show validation errors
      return;
    }
    
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate API request delay
    setTimeout(() => {
      setFormState(prev => ({ ...prev, loading: false }));
      onRequestSubmitted({
        startLocation: formState.startLocation,
        destination: formState.destination,
        distance: formState.distance,
        estimatedPrice: formState.estimatedPrice,
      });
    }, 1500);
  };

  return {
    formState,
    handleStartLocationChange,
    handleDestinationChange,
    handleTruckTypeChange,
    handleSubmit
  };
};
