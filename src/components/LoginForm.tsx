
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, Loader2 } from "lucide-react";
import { IceCard, IceCardContent, IceCardHeader, IceCardTitle, IceCardDescription, IceCardFooter } from "@/components/ui/ice-card";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const { language } = useLanguage();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if there are saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError(language === "en" 
        ? "Please enter your email and password" 
        : "يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Determine role based on email for demo
      let role = email.includes("admin") ? "admin" : email.includes("driver") ? "driver" : "customer";
      
      // Use the login function from AuthContext
      await login(email, password, role);
      
      // If remember me is checked, save the email to localStorage
      if (rememberMe) {
        localStorage.setItem("remembered_email", email);
      } else {
        localStorage.removeItem("remembered_email");
      }
      
      // Navigate based on user role
      if (role === "driver") {
        navigate("/dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
      
      toast({
        title: language === "en" ? "Login successful" : "تم تسجيل الدخول بنجاح",
        description: language === "en" ? "Welcome back to Zakrat" : "مرحبًا بعودتك إلى زكرت",
      });
    } catch (error) {
      setError(language === "en" 
        ? "Login failed. Please check your details and try again." 
        : "فشل تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IceCard className="w-full max-w-md dark:bg-gray-900 dark:border-gray-800">
      <IceCardHeader className="text-center">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <IceCardTitle className="text-2xl mb-2 dark:text-white">
          {language === "en" ? "Login" : "تسجيل الدخول"}
        </IceCardTitle>
        <IceCardDescription className="dark:text-gray-400">
          {language === "en" 
            ? "Enter your credentials to access your dashboard" 
            : "أدخل بيانات حسابك للوصول إلى لوحة التحكم"}
        </IceCardDescription>
      </IceCardHeader>
      
      <IceCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-300">
              {language === "en" ? "Email" : "البريد الإلكتروني"}
            </Label>
            <div className="relative">
              <UserIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10 ice-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="dark:text-gray-300">
                {language === "en" ? "Password" : "كلمة المرور"}
              </Label>
              <Link 
                to="/forgot-password" 
                className="text-xs text-cyan-600 hover:underline dark:text-cyan-400"
              >
                {language === "en" ? "Forgot Password?" : "نسيت كلمة المرور؟"}
              </Link>
            </div>
            <div className="relative">
              <LockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 ice-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 dark:hover:text-gray-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon size={18} className="text-cyan-600 dark:text-cyan-400" />
                ) : (
                  <EyeIcon size={18} className="text-cyan-600 dark:text-cyan-400" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox 
              id="remember" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
              className="dark:border-gray-600"
            />
            <Label htmlFor="remember" className="text-sm cursor-pointer dark:text-gray-300">
              {language === "en" ? "Remember me" : "تذكرني"}
            </Label>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}
          
          <IceButtonV2
            type="submit"
            className="w-full"
            disabled={isLoading}
            iceDrips={true}
            iceGlow={true}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                {language === "en" ? "Logging in..." : "جاري تسجيل الدخول..."}
              </>
            ) : (
              language === "en" ? "Login" : "تسجيل الدخول"
            )}
          </IceButtonV2>
        </form>
      </IceCardContent>
      
      <IceCardFooter className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === "en" ? "Don't have an account? " : "ليس لديك حساب؟ "}
          <Link to="/register" className="text-cyan-600 hover:underline font-medium dark:text-cyan-400">
            {language === "en" ? "Create an account" : "إنشاء حساب جديد"}
          </Link>
        </p>
      </IceCardFooter>
    </IceCard>
  );
};

export default LoginForm;
