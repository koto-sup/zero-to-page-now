
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Register = () => {
  const [searchParams] = useSearchParams();
  const { isLoading } = useAuth();
  const [initialRole, setInitialRole] = React.useState<UserRole>("customer");
  
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "customer" || roleParam === "driver") {
      setInitialRole(roleParam);
    }
  }, [searchParams]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            انضم إلى زكرت {initialRole === "customer" ? "للعثور على شاحنات مبردة" : "لتقديم خدمات الشاحنات الخاصة بك"}
          </CardDescription>
        </CardHeader>
        <RegisterForm initialRole={initialRole} />
      </Card>
    </div>
  );
};

export default Register;
