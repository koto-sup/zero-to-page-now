
import React from 'react';
import TruckTypeItem from '@/components/truck-selector/TruckTypeItem';

interface TruckType {
  id: string;
  name: string;
  icon: string;
  description: string;
  capacity?: string;
  refrigeration?: boolean;
}

interface TruckTypeItemWrapperProps {
  type: TruckType;
  isSelected: boolean;
  discountText?: string;
}

// This is a wrapper component that adapts the TruckTypeItem to be used in TruckRequestForm
const TruckTypeItemWrapper: React.FC<TruckTypeItemWrapperProps> = ({ 
  type, 
  isSelected, 
  discountText 
}) => {
  const description = `${type.description || ''} ${discountText || ''}`.trim();
  
  return (
    <TruckTypeItem
      id={type.id}
      name={type.name}
      icon={type.icon}
      description={description}
      selected={isSelected}
      onSelect={() => {}} // This will be handled by the parent RadioGroup
      capacity={type.capacity}
      refrigeration={type.refrigeration}
    />
  );
};

export default TruckTypeItemWrapper;
