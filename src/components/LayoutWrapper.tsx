
import React, { useEffect } from "react";
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
  
  // Track user activity
  useEffect(() => {
    if (user) {
      // Log page visit to session storage for activity tracking
      const now = new Date().toISOString();
      const pageVisit = { path: location.pathname, timestamp: now };
      
      // Get existing activity or initialize new array
      const existingActivity = JSON.parse(sessionStorage.getItem('userActivity') || '[]');
      existingActivity.push(pageVisit);
      
      // Store activity in session storage
      sessionStorage.setItem('userActivity', JSON.stringify(existingActivity));
      
      // Store most recent activity for quick access
      localStorage.setItem('lastActivity', JSON.stringify(pageVisit));
    }
  }, [location.pathname, user]);
  
  // Add padding bottom to content if user is authenticated (for bottom navbar)
  const contentStyle = user ? { paddingBottom: "80px" } : undefined;

  return (
    <div style={contentStyle}>
      {children}
      
      {user && (
        <BottomNavbar />
      )}
    </div>
  );
};

export default LayoutWrapper;
