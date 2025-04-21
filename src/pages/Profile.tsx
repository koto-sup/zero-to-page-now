import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Settings, LogOut, FileEdit, Bell, Globe, HelpCircle, Shield } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import Layout from "@/components/Layout";
import { Wallet, Coins, Award } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-lg">
                  {language === "en" 
                    ? "Please login to view your profile" 
                    : "الرجاء تسجيل الدخول لعرض ملفك الشخصي"
                  }
                </p>
                <Button className="mt-4" onClick={() => navigate("/login")}>
                  {language === "en" ? "Login" : "تسجيل الدخول"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const menuItems = [
    {
      icon: <FileEdit className="h-5 w-5 mr-3" />,
      title: language === "en" ? "Edit Profile" : "تعديل الملف الشخصي",
      action: () => navigate("/profile/edit")
    },
    {
      icon: <Settings className="h-5 w-5 mr-3" />,
      title: language === "en" ? "Settings" : "الإعدادات",
      action: () => navigate("/settings")
    },
    {
      icon: <Bell className="h-5 w-5 mr-3" />,
      title: language === "en" ? "Notifications" : "الإشعارات",
      action: () => navigate("/notifications")
    },
    {
      icon: <Globe className="h-5 w-5 mr-3" />,
      title: language === "en" ? "Language" : "اللغة",
      component: <LanguageSelector />
    },
    {
      icon: <HelpCircle className="h-5 w-5 mr-3" />,
      title: language === "en" ? "Help & Support" : "المساعدة والدعم",
      action: () => navigate("/help")
    },
    {
      icon: <LogOut className="h-5 w-5 mr-3 text-red-500" />,
      title: language === "en" ? "Logout" : "تسجيل الخروج",
      action: handleLogout,
      className: "text-red-500"
    }
  ];

  if (user.role === "admin") {
    menuItems.unshift({
      icon: <Shield className="h-5 w-5 mr-3 text-purple-500" />,
      title: language === "en" ? "Admin Dashboard" : "لوحة تحكم المسؤول",
      action: () => navigate("/admin-dashboard"),
      className: "text-purple-500"
    });
  }

  const [bucket, setBucket] = React.useState({
    balance: 235.45,
    points: user?.bucketPoints ?? 0,
    claimedDiscount: false,
  });

  const handleCompleteOrder = () => {
    setBucket((prev) => {
      const newPoints = prev.points + 25;
      return { ...prev, points: newPoints };
    });
  };

  const handleClaimDiscount = () => {
    if (bucket.points >= 180 && !bucket.claimedDiscount) {
      setBucket((prev) => ({
        ...prev,
        points: prev.points - 180,
        claimedDiscount: true,
        balance: prev.balance + 48,
      }));
      window.alert(
        language === 'en'
          ? "You have claimed your 48 SAR discount!"
          : "لقد طالبت بخصمك بقيمة 48 ريال!"
      );
    }
  };

  return (
    <Layout>
      <div className="container max-w-xl mx-auto px-4 py-8">
        <Card className={`mb-8 overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
          <div className="bg-gradient-to-b from-moprd-teal to-moprd-blue h-24"></div>
          <CardContent className="pt-0 relative">
            <div className="flex justify-center -mt-12">
              <div className="rounded-full border-4 border-background dark:border-gray-800">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <UserCircle className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="inline-block px-3 py-1 mt-2 rounded-full bg-moprd-teal/10 text-moprd-teal text-sm">
                {user.role === "customer" 
                  ? (language === "en" ? "Customer" : "عميل") 
                  : user.role === "admin"
                    ? (language === "en" ? "Administrator" : "مسؤول")
                    : (language === "en" ? "Driver" : "سائق")}
              </div>
            </div>
            {user.role === "customer" && (
              <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center bg-blue-50 dark:bg-slate-900 px-4 py-2 rounded-lg shadow">
                  <Wallet className="h-6 w-6 text-moprd-teal mr-2" />
                  <span className="text-lg font-semibold">
                    {bucket.balance.toLocaleString()} <span className="text-xs font-normal text-gray-400">SAR</span>
                  </span>
                </div>
                <div className="flex items-center bg-yellow-50 dark:bg-slate-900 px-4 py-2 rounded-lg shadow">
                  <Award className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="text-lg font-semibold">
                    {bucket.points} <span className="text-xs font-normal text-gray-400">{language === "en" ? "Points" : "نقاط"}</span>
                  </span>
                  {bucket.points >= 180 && !bucket.claimedDiscount && (
                    <Button
                      className="ml-2"
                      size="sm"
                      variant="secondary"
                      onClick={handleClaimDiscount}
                    >
                      {language === "en" ? "Claim 48 SAR" : "احصل على 48 ريال"}
                    </Button>
                  )}
                  {bucket.claimedDiscount && (
                    <span className="ml-2 text-green-600 text-xs">
                      {language === "en" ? "Discount claimed" : "تم استخدام الخصم"}
                    </span>
                  )}
                </div>
              </div>
            )}
            {user.role === "customer" && (
              <div className="text-center mt-5">
                <Button variant="outline" size="sm" onClick={handleCompleteOrder}>
                  {language === "en" ? "Simulate Order (earn 25 points)" : "محاكاة طلب (اكسب 25 نقطة)"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
          <CardHeader>
            <CardTitle>{language === "en" ? "Account Settings" : "إعدادات الحساب"}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y dark:divide-gray-700">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors ${item.className || ''}`}
                  onClick={item.action}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.component}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
