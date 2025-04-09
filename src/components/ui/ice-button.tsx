
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { cva } from "class-variance-authority";

const iceButtonVariants = cva(
  "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-sky-300 to-sky-500 text-white hover:from-sky-400 hover:to-sky-600",
        destructive: "bg-gradient-to-b from-red-300 to-red-600 text-white hover:from-red-400 hover:to-red-700",
        outline: "border-2 border-sky-400 bg-white hover:bg-sky-50 text-sky-600",
        secondary: "bg-gradient-to-b from-cyan-300 to-cyan-500 text-white hover:from-cyan-400 hover:to-cyan-600",
        ghost: "bg-transparent hover:bg-sky-100 text-sky-600",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 px-3 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IceButtonProps extends ButtonProps {
  iceDrips?: boolean;
}

const IceButton = React.forwardRef<HTMLButtonElement, IceButtonProps>(
  ({ className, variant, size, iceDrips = true, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          iceButtonVariants({ variant, size }),
          "rounded-lg",
          className
        )}
        variant={variant}
        size={size}
        {...props}
      >
        {children}
        
        {iceDrips && (
          <>
            {/* Ice dripping effects */}
            <div className="absolute -bottom-1 left-1/4 w-1 h-2 bg-sky-200 rounded-b-full"></div>
            <div className="absolute -bottom-2 left-1/2 w-1.5 h-3 bg-sky-200 rounded-b-full"></div>
            <div className="absolute -bottom-1.5 right-1/3 w-1 h-2.5 bg-sky-200 rounded-b-full"></div>
            
            {/* Shine effect */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/30 rounded-t-lg"></div>
          </>
        )}
      </Button>
    );
  }
);

IceButton.displayName = "IceButton";

export { IceButton };
