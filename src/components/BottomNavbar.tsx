
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Home, Truck, Bell, User, MapPin, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BottomNavbar = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;

  const t = (en: string, ar: string) => language === 'en' ? en : ar;

  // Navigation items
  const navItems = [
    {
      title: t("Dashboard", "الرئيسية"),
      icon: Home,
      path: "/dashboard",
      active: currentPath === "/dashboard",
    },
    {
      title: t("Messages", "الرسائل"),
      icon: MessageSquare,
      path: "/chat",
      active: currentPath.includes("/chat"),
    },
    {
      title: t("Track", "تتبع"),
      icon: Activity,  // Changed from "Cont" to "Track" with Activity icon
      path: "/truck-tracking/driver-1",
      active: currentPath.includes("/truck-tracking"),
    },
    {
      title: t("Notifications", "الإشعارات"),
      icon: Bell,
      path: "/notifications",
      active: currentPath === "/notifications",
    },
    {
      title: t("Profile", "الملف"),
      icon: User,
      path: "/profile",
      active: currentPath === "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800 z-30">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
              item.active
                ? "text-moprd-teal"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <item.icon
              className={`h-5 w-5 ${item.active ? "text-moprd-teal" : "text-gray-500 dark:text-gray-400"}`}
            />
            <span className="text-xs mt-1">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
