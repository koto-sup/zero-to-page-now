
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceButton } from "@/components/ui/ice-button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Truck, User, ArrowRight, Key, Lock, Mail, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { language, changeLanguage } = useLanguage();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  
  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;
    
    if (!email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password, role);
      
      // Store credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        // Note: In a real app, you wouldn't store the password in localStorage
        // This is just for demonstration
        // localStorage.setItem("savedPassword", password);
        localStorage.setItem("savedRole", role);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
        localStorage.removeItem("savedRole");
      }
      
      navigate(role === "customer" ? "/find-trucks" : "/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Error is already handled in the auth context with toast
    }
  };

  const handleGoogleLogin = () => {
    toast.info("سيتم تنفيذ تسجيل الدخول عبر Google قريباً");
  };

  const handleMicrosoftLogin = () => {
    toast.info("سيتم تنفيذ تسجيل الدخول عبر Microsoft قريباً");
  };
  
  // Load saved credentials on component mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedRole = localStorage.getItem("savedRole") as UserRole;
    
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          src="https://player.vimeo.com/external/373839498.sd.mp4?s=a93f4587a90551d713bc04abe5bca7af5f251082&profile_id=164&oauth2_token_id=57447761"
        >
          <source src="https://player.vimeo.com/external/373839498.sd.mp4?s=a93f4587a90551d713bc04abe5bca7af5f251082&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-moprd-blue/80 to-moprd-teal/60"></div>
      </div>
      
      {/* Language selector */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
          <button 
            onClick={() => changeLanguage("ar")}
            className={`px-3 py-1.5 rounded ${language === "ar" ? "bg-moprd-teal text-white" : "hover:bg-gray-100"}`}>
            العربية
          </button>
          <button 
            onClick={() => changeLanguage("en")}
            className={`px-3 py-1.5 rounded ${language === "en" ? "bg-moprd-teal text-white" : "hover:bg-gray-100"}`}>
            English
          </button>
        </div>
      </div>
      
      <Card className="w-full max-w-md z-10 shadow-2xl bg-white/90 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تسجيل الدخول إلى زكرت</CardTitle>
          <CardDescription>
            أدخل بيانات الاعتماد للوصول إلى حسابك
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="role" className="w-full">
          <TabsList className="grid grid-cols-2 mx-4">
            <TabsTrigger value="role" className="flex items-center justify-center">حساب</TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center justify-center">مصادقة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="role">
            <div className="grid grid-cols-2 gap-4 p-4">
              <div 
                className={`h-32 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all ${
                  role === "customer" 
                    ? "bg-gradient-to-b from-sky-300 to-sky-500 text-white shadow-lg" 
                    : "bg-white border-2 border-gray-200"
                }`}
                onClick={() => setRole("customer")}
              >
                <div className="relative">
                  <User className={`h-10 w-10 mb-2 ${role === "customer" ? "text-white" : "text-gray-600"}`} />
                  
                  {/* Ice drips if selected */}
                  {role === "customer" && (
                    <>
                      <div className="absolute -bottom-1 left-0 w-1 h-2 bg-sky-200 rounded-b-full"></div>
                      <div className="absolute -bottom-2 left-1/2 w-1.5 h-3 bg-sky-200 rounded-b-full"></div>
                      <div className="absolute -bottom-1.5 right-0 w-1 h-2.5 bg-sky-200 rounded-b-full"></div>
                    </>
                  )}
                </div>
                <span className={`${role === "customer" ? "text-white" : "text-gray-700"}`}>عميل</span>
              </div>
              
              <div 
                className={`h-32 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all ${
                  role === "driver" 
                    ? "bg-gradient-to-b from-sky-300 to-sky-500 text-white shadow-lg" 
                    : "bg-white border-2 border-gray-200"
                }`}
                onClick={() => setRole("driver")}
              >
                <div className="relative">
                  <Truck className={`h-10 w-10 mb-2 ${role === "driver" ? "text-white" : "text-gray-600"}`} />
                  
                  {/* Ice drips if selected */}
                  {role === "driver" && (
                    <>
                      <div className="absolute -bottom-1 left-0 w-1 h-2 bg-sky-200 rounded-b-full"></div>
                      <div className="absolute -bottom-2 left-1/2 w-1.5 h-3 bg-sky-200 rounded-b-full"></div>
                      <div className="absolute -bottom-1.5 right-0 w-1 h-2.5 bg-sky-200 rounded-b-full"></div>
                    </>
                  )}
                </div>
                <span className={`${role === "driver" ? "text-white" : "text-gray-700"}`}>سائق شاحنة</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="auth">
            <div className="space-y-4 p-4">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 ice-button" onClick={handleGoogleLogin}>
                <Globe className="h-5 w-5" />
                <span>تسجيل الدخول باستخدام Google</span>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 ice-button" onClick={handleMicrosoftLogin}>
                <svg className="h-5 w-5" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                <span>تسجيل الدخول باستخدام Microsoft</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <CardContent className="space-y-4 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  dir="ltr"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  dir="ltr"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 text-moprd-teal border-gray-300 rounded focus:ring-moprd-teal"
                />
                <label htmlFor="remember" className="mr-2 text-sm text-gray-600">
                  تذكرني
                </label>
              </div>
              
              <Link to="/forgot-password" className="text-sm text-moprd-teal hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <IceButton 
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </IceButton>
          </form>

          <Separator className="my-4" />
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link to="/register" className="text-moprd-teal hover:underline font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
