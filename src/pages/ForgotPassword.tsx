
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  const validateForm = () => {
    if (!email) {
      setError("البريد الإلكتروني مطلوب");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("البريد الإلكتروني غير صحيح");
      return false;
    }
    setError("");
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // In a real app, call API to send password reset email
      // For demo, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
    } catch (error) {
      console.error("Password reset request failed:", error);
      toast.error("فشل طلب إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.");
    }
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
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-2xl">استعادة كلمة المرور</CardTitle>
          <CardDescription>
            أدخل بريدك الإلكتروني لاستلام رابط إعادة تعيين كلمة المرور
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {!isSubmitted ? (
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
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-moprd-teal hover:bg-moprd-blue"
              >
                إرسال رابط إعادة التعيين
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">تم إرسال الرابط</h3>
              <p className="text-center text-muted-foreground mb-4">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني {email}.
              </p>
              <Button 
                className="w-full bg-moprd-teal hover:bg-moprd-blue"
                onClick={() => navigate("/login")}
              >
                العودة إلى تسجيل الدخول
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/login" className="text-moprd-teal hover:underline font-medium">
                العودة إلى تسجيل الدخول
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
