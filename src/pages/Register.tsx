
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Truck, User } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "customer" || roleParam === "driver") {
      setRole(roleParam);
    }
  }, [searchParams]);
  
  const validateForm = () => {
    const newErrors = { 
      name: "", 
      email: "", 
      password: "", 
      confirmPassword: "" 
    };
    let isValid = true;
    
    if (!name) {
      newErrors.name = "الاسم مطلوب";
      isValid = false;
    }
    
    if (!email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "يجب أن تكون كلمة المرور 6 أحرف على الأقل";
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(name, email, password, role);
      if (role === "driver") {
        navigate("/truck-details");
      } else {
        navigate("/customer-dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Error is already handled in the auth context with toast
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            انضم إلى زكرت {role === "customer" ? "للعثور على شاحنات مبردة" : "لتقديم خدمات الشاحنات الخاصة بك"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                placeholder="محمد علي"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>أقوم بالتسجيل كـ:</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer" className="flex items-center cursor-pointer mr-2">
                      <User className="h-4 w-4 ml-2" />
                      عميل (أبحث عن شاحنات مبردة)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="driver" id="driver" />
                    <Label htmlFor="driver" className="flex items-center cursor-pointer mr-2">
                      <Truck className="h-4 w-4 ml-2" />
                      سائق شاحنة (أقدم خدمات نقل مبردة)
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              type="submit"
              className="w-full bg-moprd-teal hover:bg-moprd-blue"
              disabled={isLoading}
            >
              {isLoading ? "جاري إنشاء الحساب..." : "تسجيل"}
            </Button>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                لديك حساب بالفعل؟{" "}
                <Link to="/login" className="text-moprd-teal hover:underline font-medium">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
