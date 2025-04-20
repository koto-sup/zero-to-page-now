
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
    if (roleParam === "customer" || roleParam === "driver" || roleParam === "admin") {
      setInitialRole(roleParam as UserRole);
    }
  }, [searchParams]);
  
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
