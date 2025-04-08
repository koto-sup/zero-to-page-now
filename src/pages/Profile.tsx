
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to update the profile
      // For now we're just simulating the update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile in auth context
      if (updateUserProfile) {
        updateUserProfile({
          ...user,
          name,
          email,
          phone,
          address
        });
      }
      
      toast.success("تم تحديث الملف الشخصي بنجاح");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("فشل تحديث الملف الشخصي. الرجاء المحاولة مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">الملف الشخصي</h1>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="details">المعلومات الشخصية</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="preferences">التفضيلات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الشخصية</CardTitle>
              <CardDescription>
                قم بتحديث معلومات ملفك الشخصي هنا
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdateProfile}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 ml-2" />
                    الاسم الكامل
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 ml-2" />
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="h-4 w-4 ml-2" />
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center">
                    <MapPin className="h-4 w-4 ml-2" />
                    العنوان
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="أدخل عنوانك"
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="bg-moprd-teal hover:bg-moprd-blue"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>الأمان</CardTitle>
              <CardDescription>
                إدارة إعدادات الأمان لحسابك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 ml-2 text-moprd-teal" />
                  <h3 className="font-medium">تغيير كلمة المرور</h3>
                </div>
                <p className="text-sm text-gray-500">
                  يمكنك تغيير كلمة المرور الخاصة بك للحفاظ على أمان حسابك
                </p>
                <Button variant="outline" className="mt-2">
                  تغيير كلمة المرور
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>التفضيلات</CardTitle>
              <CardDescription>
                إدارة تفضيلات حسابك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                سيتم إضافة خيارات التفضيلات قريباً.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
