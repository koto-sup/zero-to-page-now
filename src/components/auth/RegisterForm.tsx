
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserTypeSelection } from "./UserTypeSelection";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  initialRole?: UserRole;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ initialRole = "customer" }) => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>(initialRole);
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  
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
        
        <UserTypeSelection role={role} onRoleChange={setRole} />
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
  );
};
