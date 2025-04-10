
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

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth(); // Changed from loginWithEmail to login
  
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
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use the login function from AuthContext, determine role based on email
      const role = email.includes("driver") ? "driver" : "customer";
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
      } else {
        navigate("/customer-dashboard");
      }
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بعودتك إلى زكرت",
      });
    } catch (error) {
      setError("فشل تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IceCard className="w-full max-w-md">
      <IceCardHeader className="text-center">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <IceCardTitle className="text-2xl mb-2">تسجيل الدخول</IceCardTitle>
        <IceCardDescription>
          أدخل بيانات حسابك للوصول إلى لوحة التحكم
        </IceCardDescription>
      </IceCardHeader>
      
      <IceCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <UserIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10 ice-input"
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">كلمة المرور</Label>
              <Link 
                to="/forgot-password" 
                className="text-xs text-cyan-600 hover:underline"
              >
                نسيت كلمة المرور؟
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
                className="pr-10 ice-input"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox 
              id="remember" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
            />
            <Label htmlFor="remember" className="text-sm cursor-pointer">تذكرني</Label>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}
          
          <IceButtonV2
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </IceButtonV2>
        </form>
      </IceCardContent>
      
      <IceCardFooter className="text-center">
        <p className="text-sm text-gray-600">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-cyan-600 hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </IceCardFooter>
    </IceCard>
  );
};

export default LoginForm;
