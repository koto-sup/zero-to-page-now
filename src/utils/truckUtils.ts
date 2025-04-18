
export const getTruckIcon = (id: string) => {
  switch(id) {
    case "refrigerated": return "/lovable-uploads/cc1d2b91-8416-4580-9616-be1490769ef3.png"; // 4-refrigerated truck icon
    case "jcp": return "/lovable-uploads/2318cf76-07e2-4d0c-b6d4-2f949f32922d.png"; // 2-jcp
    case "dump-truck": return "/lovable-uploads/32960499-cd1d-4f47-bcee-37716adba4b6.png"; // 3-small dump truck
    case "water-truck": return "/lovable-uploads/9f9124a6-b272-49c2-bead-347e67f29b98.png"; // 5-Water Suction Truck
    case "wheel-excavator": return "/lovable-uploads/dad6802a-4aea-43eb-9b55-7eeae82566c1.png"; // 6-wheel Excavator
    case "crawler-excavator": return "/lovable-uploads/6e80d2c0-5926-46c1-9822-363538ef97f9.png"; // 7-Crawler Excavator
    case "crane-loader": return "/lovable-uploads/cdc8b952-955e-40f0-b12a-dc9d862ac1b0.png"; // 9-crane loader
    case "loader-lowbed": return "/lovable-uploads/d3641d9f-4887-451a-aef3-18d4cecfc99a.png"; // 10-loader lowbed truck
    case "jcb-forklift": return "/lovable-uploads/af188fbf-e672-40c8-b9bd-c253da8714a1.png"; // 11-jcb forklift telescope
    case "asphalt-paving-small": return "/lovable-uploads/38740bff-70fb-4d60-a82e-0f10443ceb3c.png"; // 12-asphalt paving machine
    case "asphalt-paving-big": return "/lovable-uploads/38740bff-70fb-4d60-a82e-0f10443ceb3c.png"; // 12-big asphalt paving machine (using same image)
    case "generator-repair": return "/lovable-uploads/f066d5bd-c116-472c-9f62-b548da60b0d2.png"; // 13-engineer maintenance
    case "hydraulic-crane": return "/lovable-uploads/ec368410-5387-4ea1-be34-aa9bdc043c79.png"; // 14-hydraulic truck crane 25 ton
    case "basket-winch": return "/lovable-uploads/16a546dd-4af2-453a-b486-7a93c9c2f633.png"; // 15-Basket winch truck
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
  priceType?: "day" | "km" | "trip" | "service";
  hasKmPricing?: boolean;
}
