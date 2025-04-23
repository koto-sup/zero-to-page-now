
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import BottomNavbar from "@/components/BottomNavbar";
import AppNavbar from "@/components/AppNavbar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Store current path to localStorage for "back" functionality
  useEffect(() => {
    const currentPath = location.pathname;
    const previousPaths = JSON.parse(localStorage.getItem('navigationHistory') || '[]');
    
    // Only store path if it's different from the last one and not empty
    if (currentPath && (previousPaths.length === 0 || previousPaths[previousPaths.length - 1] !== currentPath)) {
      // Keep only last 10 paths
      const updatedPaths = [...previousPaths, currentPath].slice(-10);
      localStorage.setItem('navigationHistory', JSON.stringify(updatedPaths));
    }
  }, [location.pathname]);
  
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

  // Check if the current route is a chat page
  const isChatPage = location.pathname.includes('/chat/');
  
  // Add padding bottom to content if user is authenticated (for bottom navbar)
  // Add extra padding for chat pages to ensure message input is visible
  const contentStyle = {
    paddingBottom: isChatPage ? "130px" : (user ? "80px" : "")
  };

  // Setup hardware back button handler for mobile
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      // Check if we have history to go back to
      const paths = JSON.parse(localStorage.getItem('navigationHistory') || '[]');
      if (paths.length > 1) {
        // We don't need to do anything here because the browser will handle navigation
      } else {
        // If we're at the root of our history, prevent default behavior
        // and navigate to dashboard if logged in
        if (user) {
          navigate('/dashboard');
        }
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [navigate, user]);

  // Check if the current page is login or register
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <AppNavbar />}
      
      <div style={contentStyle} className="flex-grow">
        {children}
      </div>
      
      {user && <BottomNavbar />}
    </div>
  );
};

export default LayoutWrapper;
