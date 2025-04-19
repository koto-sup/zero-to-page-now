
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginForm = () => {
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(language === 'en' ? "Please fill in all fields" : "الرجاء ملء جميع الحقول");
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast.success(
        language === 'en' ? "Login successful!" : "تم تسجيل الدخول بنجاح!",
        {
          description: language === 'en' ? "Welcome back!" : "مرحباً بعودتك!"
        }
      );
      navigate("/");
    } else if (error) {
      toast.error(
        language === 'en' ? "Login failed" : "فشل تسجيل الدخول", 
        { description: error }
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">
            {language === 'en' ? 'Login' : 'تسجيل الدخول'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium dark:text-gray-200">
                {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'en' ? "Enter your email" : "أدخل بريدك الإلكتروني"}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium dark:text-gray-200">
                {language === 'en' ? 'Password' : 'كلمة المرور'}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'en' ? "Enter your password" : "أدخل كلمة المرور"}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-moprd-teal hover:bg-moprd-blue"
              disabled={isLoading}
            >
              {isLoading 
                ? (language === 'en' ? "Logging in..." : "جاري تسجيل الدخول...") 
                : (language === 'en' ? "Login" : "دخول")
              }
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm mt-2">
            <Link 
              to="/forgot-password" 
              className="text-moprd-teal hover:underline"
            >
              {language === 'en' ? "Forgot password?" : "نسيت كلمة المرور؟"}
            </Link>
          </div>
          <div className="text-center text-sm mt-2">
            {language === 'en' ? "Don't have an account?" : "ليس لديك حساب؟"}{" "}
            <Link 
              to="/register" 
              className="text-moprd-teal hover:underline"
            >
              {language === 'en' ? "Register" : "سجل الآن"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
