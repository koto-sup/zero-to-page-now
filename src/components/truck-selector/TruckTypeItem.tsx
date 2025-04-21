
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Snowflake, Truck, Package, Construction, Weight, Droplets, MapPin } from 'lucide-react';

interface TruckTypeItemProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
  capacity?: string;
  refrigeration?: boolean;
  useMapOnly?: boolean;
  features?: string[];
}

// This component was previously being used with a default export
// but is now being imported as a named export, so let's fix that
const TruckTypeItem: React.FC<TruckTypeItemProps> = ({ 
  id, 
  name, 
  icon, 
  description, 
  selected, 
  onSelect,
  capacity,
  refrigeration,
  useMapOnly = false,
  features = []
}) => {
  const { isAdmin } = useAuth();
  const [customIconUrl, setCustomIconUrl] = useState<string | null>(null);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomIconUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // In a real app with Supabase integration, we would upload the image to storage
      // and update the database with the new URL
    }
  };
  
  const displayIcon = customIconUrl || icon;

  // Function to render feature icons
  const renderFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'refrigerated':
        return <Snowflake size={16} className="text-blue-500" aria-label="Refrigerated" />;
      case 'heavy':
        return <Weight size={16} className="text-red-600" aria-label="Heavy Load" />;
      case 'construction':
        return <Construction size={16} className="text-yellow-600" aria-label="Construction Equipment" />;
      case 'water':
        return <Droplets size={16} className="text-cyan-500" aria-label="Water Transport" />;
      case 'delivery':
        return <Package size={16} className="text-green-500" aria-label="Delivery Options" />;
      default:
        return <Truck size={16} className="text-gray-500" aria-label="Standard Truck" />;
    }
  };
  
  return (
    <div 
      className={`
        border rounded-lg p-4 cursor-pointer transition-all
        ${selected 
          ? 'border-moprd-teal bg-moprd-teal/10' 
          : 'border-gray-200 hover:border-moprd-teal/50 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-moprd-teal/50 dark:hover:bg-gray-800'
        }
      `}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-16 relative">
          <img 
            src={displayIcon}
            alt={name}
            className="w-full h-full object-contain"
          />
          {isAdmin && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id={`upload-${id}`}
                onClick={(e) => e.stopPropagation()}
              />
              <label 
                htmlFor={`upload-${id}`}
                className="text-xs text-moprd-teal hover:underline cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                Change Icon
              </label>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          
          {/* Feature Icons Row */}
          {(refrigeration || features.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {refrigeration && <Snowflake size={16} className="text-blue-500" aria-label="Refrigerated" />}
              {features.map((feature, index) => (
                <span key={`${id}-feature-${index}`} className="inline-flex items-center">
                  {renderFeatureIcon(feature)}
                </span>
              ))}
            </div>
          )}
          
          {useMapOnly && (
            <div className="flex items-center mt-1 text-xs text-blue-600">
              <MapPin size={12} className="mr-1" />
              <span>Map selection only</span>
            </div>
          )}
          {capacity && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Capacity: {capacity}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Export both as default and named export to support both import styles
export { TruckTypeItem };
export default TruckTypeItem;
