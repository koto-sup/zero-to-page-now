
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, LogOut, UserCircle, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", { name, email, phone, address });
    toast.success(language === "en" ? "Profile updated successfully" : "تم تحديث الملف الشخصي بنجاح");
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success(language === "en" ? "Logged out successfully" : "تم تسجيل الخروج بنجاح");
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {language === "en" ? "Profile" : "الملف الشخصي"}
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <UserCircle className="w-20 h-20 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{name || (language === "en" ? "User" : "المستخدم")}</h2>
            <p className="text-muted-foreground mb-4">
              {user?.role === "driver" 
                ? (language === "en" ? "Driver" : "سائق") 
                : (language === "en" ? "Customer" : "عميل")}
            </p>
            <div className="space-y-2 text-right">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
              {phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{address}</span>
                </div>
              )}
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full mt-6 flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {language === "en" ? "Logout" : "تسجيل الخروج"}
            </Button>
          </CardContent>
        </Card>

        {/* Edit Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{language === "en" ? "Update Profile" : "تحديث الملف الشخصي"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Update your profile information" : "قم بتحديث معلومات ملفك الشخصي"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{language === "en" ? "Name" : "الاسم"}</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{language === "en" ? "Email" : "البريد الإلكتروني"}</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{language === "en" ? "Phone Number" : "رقم الهاتف"}</Label>
                <Input 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={language === "en" ? "Enter your phone number" : "أدخل رقم هاتفك"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{language === "en" ? "Address" : "العنوان"}</Label>
                <Textarea 
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={language === "en" ? "Enter your address" : "أدخل عنوانك"}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {language === "en" ? "Save Changes" : "حفظ التغييرات"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
