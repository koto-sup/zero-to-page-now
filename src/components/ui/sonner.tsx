
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const { language } = useLanguage();

  const closeText = language === 'en' ? "Close" : "إغلاق";

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        duration: 5000, // 5 seconds duration
        dismissible: true, // Make all toasts dismissible by default
      }}
      closeButtonAriaLabel={closeText}
      {...props}
    />
  );
};

export { Toaster };
