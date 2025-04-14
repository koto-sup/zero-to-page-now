
export const getTruckIcon = (id: string) => {
  switch(id) {
    case "refrigerated": return "/lovable-uploads/cc1d2b91-8416-4580-9616-be1490769ef3.png"; // 4-refrigerated truck icon
    case "jcp": return "/lovable-uploads/2318cf76-07e2-4d0c-b6d4-2f949f32922d.png"; // 2-jcp
    case "dump-truck": return "/lovable-uploads/32960499-cd1d-4f47-bcee-37716adba4b6.png"; // 3-small dump truck
    case "water-truck": return "/lovable-uploads/9f9124a6-b272-49c2-bead-347e67f29b98.png"; // 5-Water Suction Truck
    case "wheel-excavator": return "/lovable-uploads/dad6802a-4aea-43eb-9b55-7eeae82566c1.png"; // 6-wheel Excavator
    case "crawler-excavator": return "/lovable-uploads/6e80d2c0-5926-46c1-9822-363538ef97f9.png"; // 7-Crawler Excavator
    default: return "/lovable-uploads/191e2114-a3a6-4a0a-9f35-7ee23e4fc07e.png";
  }
};

export interface TruckType {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
  price: string;
  description?: string;
}
