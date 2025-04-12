
import React from "react";
import LocationInputs from "@/components/truck-request/LocationInputs";
import TruckTypeSelector from "@/components/TruckTypeSelector";
import TripDetails from "@/components/truck-request/TripDetails";
import { useTruckRequestForm } from "@/hooks/useTruckRequestForm";
import { RequestDetails } from "@/hooks/useTruckFinderState";

interface TruckRequestFormProps {
  onRequestSubmitted: (details: RequestDetails) => void;
  discountApplied?: boolean;
}

const TruckRequestForm: React.FC<TruckRequestFormProps> = ({
  onRequestSubmitted,
  discountApplied = false
}) => {
  const {
    formState,
    handleStartLocationChange,
    handleDestinationChange,
    handleTruckTypeChange,
    handleDaysChange,
    handleTruckSizeChange,
    handleExcavatorHeadChange,
    handleFlatbedDeliveryOptionChange,
    handleSubmit
  } = useTruckRequestForm({
    discountApplied,
    onRequestSubmitted
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <LocationInputs 
            startLocation={formState.startLocation}
            destination={formState.destination}
            onStartLocationChange={handleStartLocationChange}
            onDestinationChange={handleDestinationChange}
          />

          <TruckTypeSelector 
            selectedTruckType={formState.truckType}
            onTruckTypeChange={handleTruckTypeChange}
          />
        </div>

        <TripDetails
          distance={formState.distance}
          truckType={formState.truckType}
          estimatedPrice={formState.estimatedPrice}
          discountApplied={discountApplied}
          loading={formState.loading}
          onSubmit={handleSubmit}
          onDaysChange={handleDaysChange}
          onTruckSizeChange={handleTruckSizeChange}
          onExcavatorHeadChange={handleExcavatorHeadChange}
          onFlatbedDeliveryOptionChange={handleFlatbedDeliveryOptionChange}
        />
      </div>
    </form>
  );
};

export default TruckRequestForm;
