
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface TruckTypeItemProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
  capacity?: string;
  refrigeration?: boolean;
}

const TruckTypeItem: React.FC<TruckTypeItemProps> = ({ 
  id, 
  name, 
  icon, 
  description, 
  selected, 
  onSelect,
  capacity,
  refrigeration
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
    }
  };
  
  const displayIcon = customIconUrl || icon;
  
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
          {capacity && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Capacity: {capacity}</p>
          )}
          {refrigeration !== undefined && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {refrigeration ? "Refrigerated" : "Non-refrigerated"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TruckTypeItem;
