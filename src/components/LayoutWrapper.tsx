
import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import BottomNavbar from "@/components/BottomNavbar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { user } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const location = useLocation();
  
  // Add padding bottom to content if user is authenticated (for bottom navbar)
  const contentStyle = user ? { paddingBottom: "80px" } : undefined;

  return (
    <div style={contentStyle}>
      {children}
      
      {user && (
        <BottomNavbar 
          onLanguageChange={changeLanguage} 
          currentLanguage={language}
        />
      )}
    </div>
  );
};

export default LayoutWrapper;
