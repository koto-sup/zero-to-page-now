
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EditProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(user?.profileImage || null);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleGoBack = () => {
    navigate("/profile");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app with Supabase integration, we'd upload the image and update the profile
      // For now we'll simulate success after a delay
      setTimeout(() => {
        // Simulating profile update
        if (updateUserProfile) {
          updateUserProfile({
            name,
            email,
            phoneNumber,
            profileImage: profilePreview || user.profileImage
          });
        }
        
        toast.success(
          language === 'en' ? "Profile updated successfully" : "تم تحديث الملف الشخصي بنجاح"
        );
        setIsLoading(false);
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(
        language === 'en' ? "Error updating profile" : "خطأ في تحديث الملف الشخصي"
      );
      setIsLoading(false);
    }
  };

  const translations = {
    editProfile: language === 'en' ? "Edit Profile" : "تعديل الملف الشخصي",
    personalInformation: language === 'en' ? "Personal Information" : "المعلومات الشخصية",
    name: language === 'en' ? "Name" : "الاسم",
    email: language === 'en' ? "Email" : "البريد الإلكتروني",
    phoneNumber: language === 'en' ? "Phone Number" : "رقم الهاتف",
    profilePicture: language === 'en' ? "Profile Picture" : "الصورة الشخصية",
    change: language === 'en' ? "Change" : "تغيير",
    save: language === 'en' ? "Save Changes" : "حفظ التغييرات",
    saving: language === 'en' ? "Saving..." : "جاري الحفظ...",
    back: language === 'en' ? "Back" : "رجوع"
  };

  return (
    <div className="container max-w-xl mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="flex items-center mb-4"
        onClick={handleGoBack}
      >
        <ChevronLeft className="ml-2 h-4 w-4" />
        {translations.back}
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{translations.editProfile}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                {profilePreview ? (
                  <img 
                    src={profilePreview} 
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-moprd-teal" 
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-moprd-teal">
                    <Camera className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute bottom-0 right-0">
                  <Button 
                    type="button" 
                    size="sm" 
                    className="rounded-full w-8 h-8 p-0"
                    onClick={() => document.getElementById('profile-picture')?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input 
                    type="file" 
                    id="profile-picture" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{translations.profilePicture}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{translations.personalInformation}</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">{translations.name}</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{translations.email}</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || user.provider === "oauth"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">{translations.phoneNumber}</Label>
                <Input 
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? translations.saving : translations.save}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
