
import * as React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";
import { cva } from "class-variance-authority";

const iceButtonVariantsV2 = cva(
  "relative overflow-hidden transition-all duration-300 hover:shadow-lg font-medium text-center",
  {
    variants: {
      variant: {
        default: "text-blue-900",
        destructive: "text-red-900",
        outline: "text-sky-900",
        secondary: "text-cyan-900",
        ghost: "text-sky-600",
        link: "text-sky-600 hover:text-sky-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "py-3 px-6 text-base",
        sm: "py-2 px-3 text-sm",
        lg: "py-4 px-8 text-lg",
        icon: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IceButtonV2Props extends Omit<ButtonProps, "variant"> {
  iceDrips?: boolean;
  iceGlow?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const IceButtonV2 = React.forwardRef<HTMLButtonElement, IceButtonV2Props>(
  ({ className, variant = "default", size, iceDrips = true, iceGlow = true, children, ...props }, ref) => {
    const getBackgroundClasses = () => {
      switch(variant) {
        case "default":
          return "bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-400";
        case "destructive":
          return "bg-gradient-to-b from-red-200 via-red-300 to-red-400";
        case "outline":
          return "bg-white border-2 border-cyan-400";
        case "secondary":
          return "bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400";
        case "ghost":
          return "bg-transparent hover:bg-cyan-100";
        case "link":
          return "bg-transparent";
        default:
          return "bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-400";
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "group",
          iceButtonVariantsV2({ variant, size }),
          className
        )}
        {...props}
      >
        {/* Ice button backdrop */}
        <div className={cn(
          "absolute inset-0 rounded-lg",
          getBackgroundClasses()
        )}></div>
        
        {/* Shine effect */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-white/30 rounded-t-lg"></div>
        
        {/* Content wrapper */}
        <span className="relative z-10">{children}</span>

        {/* Ice drips */}
        {iceDrips && (
          <>
            <div className="absolute -bottom-1 left-1/5 w-1 h-2 bg-sky-200 rounded-b-full"></div>
            <div className="absolute -bottom-2 left-2/5 w-1.5 h-3 bg-sky-200 rounded-b-full"></div>
            <div className="absolute -bottom-1.5 right-1/4 w-1 h-2.5 bg-sky-200 rounded-b-full"></div>
          </>
        )}
        
        {/* Glow effect on hover */}
        {iceGlow && (
          <div className="absolute inset-0 -z-10 bg-cyan-400 opacity-0 blur-xl rounded-lg transition-opacity duration-300 group-hover:opacity-30"></div>
        )}
      </button>
    );
  }
);

IceButtonV2.displayName = "IceButtonV2";

export { IceButtonV2 };
