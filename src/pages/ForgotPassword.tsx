
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword, isLoading } = useAuth();
  const { language } = useLanguage();
  const [emailSent, setEmailSent] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error(language === 'en' ? "Please enter your email address" : "الرجاء إدخال عنوان البريد الإلكتروني");
      return;
    }
    
    try {
      const success = await resetPassword(email);
      if (success) {
        setEmailSent(true);
        toast.success(
          language === 'en' 
            ? "Password reset instructions sent to your email" 
            : "تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-moprd-teal/10 to-moprd-blue/10">
      <Card className="w-full max-w-md shadow-lg border-moprd-teal/10 dark:border-moprd-teal/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {language === 'en' ? "Reset Your Password" : "إعادة تعيين كلمة المرور"}
          </CardTitle>
          {!emailSent ? (
            <p className="text-center text-muted-foreground">
              {language === 'en' 
                ? "Enter your email and we'll send you password reset instructions." 
                : "أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة تعيين كلمة المرور."}
            </p>
          ) : (
            <p className="text-center text-green-600 dark:text-green-400">
              {language === 'en' 
                ? "Check your inbox for password reset instructions." 
                : "تحقق من بريدك الوارد للحصول على تعليمات إعادة تعيين كلمة المرور."}
            </p>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!emailSent && (
              <div className="space-y-2">
                <Label htmlFor="email">{language === 'en' ? "Email" : "البريد الإلكتروني"}</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                  required
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {!emailSent ? (
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? "Sending..." : "جارِ الإرسال..."}
                  </>
                ) : (
                  language === 'en' ? "Send Reset Instructions" : "إرسال تعليمات إعادة التعيين"
                )}
              </Button>
            ) : (
              <Button 
                type="button" 
                className="w-full" 
                onClick={() => setEmailSent(false)}
              >
                {language === 'en' ? "Send Again" : "إرسال مرة أخرى"}
              </Button>
            )}
            <div className="text-center">
              <Link 
                to="/login"
                className="text-sm text-moprd-teal hover:underline"
              >
                {language === 'en' ? "Back to Login" : "العودة إلى تسجيل الدخول"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
