
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceButton } from "@/components/ui/ice-button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowRight, Mail, RefreshCw } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("يرجى إدخال عنوان بريد إلكتروني صالح");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call to request password reset
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, this would call an API endpoint
      // For now we'll just simulate success
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور", {
        description: "يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات إعادة التعيين"
      });
      
      setIsSubmitted(true);
    } catch (error) {
      setError("حدث خطأ أثناء إرسال طلب إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.");
      toast.error("فشل إرسال رابط إعادة تعيين كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-moprd-teal/10 to-moprd-blue/20"></div>
        <div className="frost-overlay"></div>
      </div>
      
      <Card className="w-full max-w-md ice-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">استعادة كلمة المرور</CardTitle>
          <CardDescription>
            أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              
              <IceButton
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  "إرسال رابط إعادة التعيين"
                )}
              </IceButton>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">تم إرسال البريد الإلكتروني</h3>
              <p className="text-gray-500 mb-6">
                لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى <strong>{email}</strong>. يرجى التحقق من بريدك الإلكتروني واتباع التعليمات.
              </p>
              
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="mb-2 w-full"
              >
                إرسال مرة أخرى
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Link
            to="/login"
            className="flex items-center text-sm text-moprd-teal hover:underline"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة إلى تسجيل الدخول
          </Link>
        </CardFooter>
        
        {/* Ice drips */}
        <div className="ice-drip ice-drip-1"></div>
        <div className="ice-drip ice-drip-2"></div>
        <div className="ice-drip ice-drip-3"></div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
