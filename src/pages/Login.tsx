
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Truck, User, ArrowRight, Key, Lock, Google, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [errors, setErrors] = useState({ email: "", password: "" });
  
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
              <Button
                variant={role === "customer" ? "default" : "outline"}
                className={`h-32 flex flex-col items-center justify-center ${
                  role === "customer" ? "bg-moprd-teal hover:bg-moprd-blue" : ""
                }`}
                onClick={() => setRole("customer")}
              >
                <User className="h-10 w-10 mb-2" />
                <span>عميل</span>
              </Button>
              <Button
                variant={role === "driver" ? "default" : "outline"}
                className={`h-32 flex flex-col items-center justify-center ${
                  role === "driver" ? "bg-moprd-teal hover:bg-moprd-blue" : ""
                }`}
                onClick={() => setRole("driver")}
              >
                <Truck className="h-10 w-10 mb-2" />
                <span>سائق شاحنة</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="auth">
            <div className="space-y-4 p-4">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleLogin}>
                <Google className="h-5 w-5" />
                <span>تسجيل الدخول باستخدام Google</span>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleMicrosoftLogin}>
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
              <Input
                id="email"
                type="email"
                dir="ltr"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                dir="ltr"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            <div className="text-left">
              <Link to="/forgot-password" className="text-sm text-moprd-teal hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <Button 
              type="submit"
              className="w-full bg-moprd-teal hover:bg-moprd-blue"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
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
