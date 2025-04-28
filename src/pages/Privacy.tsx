
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LockKeyhole, UserCheck, FileCheck, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();

  const content = {
    title: language === 'en' ? "Privacy Policy" : "سياسة الخصوصية",
    introduction: language === 'en' 
      ? "At Zakart, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information." 
      : "نحن في زكرت نلتزم بحماية خصوصية مستخدمينا. تصف هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.",
    dataCollection: {
      title: language === 'en' ? "Data Collection" : "جمع البيانات",
      content: language === 'en' 
        ? "We collect information you provide directly when registering and using our services. This includes your name, contact details, location data, and payment information." 
        : "نقوم بجمع المعلومات التي تقدمها مباشرة عند التسجيل واستخدام خدماتنا. يشمل ذلك اسمك وتفاصيل الاتصال وبيانات الموقع ومعلومات الدفع."
    },
    dataUse: {
      title: language === 'en' ? "How We Use Your Data" : "كيف نستخدم بياناتك",
      content: language === 'en'
        ? "We use your information to provide and improve our services, process transactions, communicate with you about your account, and personalize your experience." 
        : "نستخدم معلوماتك لتقديم وتحسين خدماتنا، ومعالجة المعاملات، والتواصل معك بشأن حسابك، وتخصيص تجربتك."
    },
    dataSecurity: {
      title: language === 'en' ? "Data Security" : "أمن البيانات",
      content: language === 'en'
        ? "We implement strong security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction." 
        : "نقوم بتنفيذ تدابير أمنية قوية لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير."
    },
    dataSharing: {
      title: language === 'en' ? "Data Sharing" : "مشاركة البيانات",
      content: language === 'en'
        ? "We may share your information with truck drivers to facilitate your booking, payment processors to handle transactions, and service providers who assist us in operating our business." 
        : "قد نشارك معلوماتك مع سائقي الشاحنات لتسهيل الحجز الخاص بك، ومعالجي الدفع للتعامل مع المعاملات، ومقدمي الخدمات الذين يساعدوننا في إدارة أعمالنا."
    },
    yourRights: {
      title: language === 'en' ? "Your Rights" : "حقوقك",
      content: language === 'en'
        ? "You have the right to access, correct, or delete your personal information. You can also object to processing, request data portability, or withdraw consent at any time." 
        : "لديك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها. يمكنك أيضًا الاعتراض على المعالجة، أو طلب نقل البيانات، أو سحب الموافقة في أي وقت."
    },
    contactUs: language === 'en' ? "Contact Us" : "اتصل بنا",
    questions: language === 'en' 
      ? "If you have any questions or concerns about our privacy practices, please contact our Privacy Team at privacy@zakart.com" 
      : "إذا كان لديك أي أسئلة أو مخاوف بشأن ممارسات الخصوصية لدينا، يرجى الاتصال بفريق الخصوصية لدينا على privacy@zakart.com"
  };

  const textDirection = language === 'en' ? "text-left" : "text-right";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-3xl font-bold text-center">{content.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className={`space-y-6 ${textDirection}`}>
              <p className="text-lg text-muted-foreground">{content.introduction}</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Shield className="h-5 w-5 text-moprd-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{content.dataCollection.title}</h3>
                    <p>{content.dataCollection.content}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <UserCheck className="h-5 w-5 text-moprd-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{content.dataUse.title}</h3>
                    <p>{content.dataUse.content}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <LockKeyhole className="h-5 w-5 text-moprd-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{content.dataSecurity.title}</h3>
                    <p>{content.dataSecurity.content}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <FileCheck className="h-5 w-5 text-moprd-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{content.dataSharing.title}</h3>
                    <p>{content.dataSharing.content}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <AlertCircle className="h-5 w-5 text-moprd-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{content.yourRights.title}</h3>
                    <p>{content.yourRights.content}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-xl font-semibold mb-2">{content.contactUs}</h3>
                <p>{content.questions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy;
