
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserTypeSelection } from "./UserTypeSelection";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon size={18} className="text-cyan-600" />
              ) : (
                <EyeIcon size={18} className="text-cyan-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={18} className="text-cyan-600" />
              ) : (
                <EyeIcon size={18} className="text-cyan-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        
        <UserTypeSelection role={role} onRoleChange={setRole} />
      </CardContent>
      <CardFooter className="flex flex-col">
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
              جاري إنشاء الحساب...
            </>
          ) : "تسجيل"}
        </IceButtonV2>
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
