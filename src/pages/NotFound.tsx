
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // If the user arrived at 404 via history navigation, try to go back to the home page
    if (window.history.state && window.history.state.idx > 0) {
      navigate('/', { replace: true });
      return;
    }
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, navigate]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-moprd-teal">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {language === "en" 
              ? "Sorry! The page you are looking for cannot be found." 
              : "عفواً! الصفحة التي تبحث عنها غير موجودة."}
          </p>
          <Button asChild className="bg-moprd-teal hover:bg-moprd-blue">
            <Link to="/">
              {language === "en" 
                ? "Return to Home Page" 
                : "العودة إلى الصفحة الرئيسية"}
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
