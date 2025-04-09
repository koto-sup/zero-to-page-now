
import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";

interface IceCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  iceDrips?: boolean;
  frostEffect?: boolean;
  glow?: boolean;
}

const IceCard = React.forwardRef<
  HTMLDivElement,
  IceCardProps
>(({ className, iceDrips = true, frostEffect = true, glow = false, children, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "relative overflow-hidden border-sky-200",
        "bg-gradient-to-br from-white/95 to-sky-50/90",
        "backdrop-blur-sm",
        glow && "hover:shadow-sky-200/50 hover:shadow-lg transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {/* Top shine effect */}
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/60 to-transparent rounded-t-lg pointer-events-none"></div>
      
      {children}
      
      {/* Ice drips */}
      {iceDrips && (
        <>
          <div className="absolute -bottom-1 left-1/5 w-1 h-2 bg-sky-200 rounded-b-full"></div>
          <div className="absolute -bottom-2 left-2/5 w-1.5 h-3 bg-sky-200 rounded-b-full"></div>
          <div className="absolute -bottom-3 left-1/2 w-2 h-4 bg-sky-200 rounded-b-full"></div>
          <div className="absolute -bottom-1.5 right-1/3 w-1 h-2.5 bg-sky-200 rounded-b-full"></div>
          <div className="absolute -bottom-2 right-1/5 w-1.5 h-3 bg-sky-200 rounded-b-full"></div>
        </>
      )}
      
      {/* Frost effect */}
      {frostEffect && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bae6fd' fill-opacity='0.15'/%3E%3C/svg%3E")`,
          opacity: 0.7
        }}></div>
      )}
    </Card>
  );
});
IceCard.displayName = "IceCard";

const IceCardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardHeader>
>(({ className, ...props }, ref) => (
  <CardHeader ref={ref} className={cn("relative z-10", className)} {...props} />
));
IceCardHeader.displayName = "IceCardHeader";

const IceCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof CardTitle>
>(({ className, ...props }, ref) => (
  <CardTitle ref={ref} className={cn("text-sky-900", className)} {...props} />
));
IceCardTitle.displayName = "IceCardTitle";

const IceCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof CardDescription>
>(({ className, ...props }, ref) => (
  <CardDescription ref={ref} className={cn("text-sky-700/70", className)} {...props} />
));
IceCardDescription.displayName = "IceCardDescription";

const IceCardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardContent>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("relative z-10", className)} {...props} />
));
IceCardContent.displayName = "IceCardContent";

const IceCardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardFooter>
>(({ className, ...props }, ref) => (
  <CardFooter ref={ref} className={cn("relative z-10", className)} {...props} />
));
IceCardFooter.displayName = "IceCardFooter";

export { IceCard, IceCardHeader, IceCardTitle, IceCardDescription, IceCardContent, IceCardFooter };
