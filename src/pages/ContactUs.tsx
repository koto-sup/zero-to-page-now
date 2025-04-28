
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { toast } from "sonner";

const ContactUs = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast(
        language === 'en' ? "Message Sent" : "تم إرسال الرسالة",
        {
          description: language === 'en' 
            ? "We'll get back to you as soon as possible" 
            : "سنرد عليك في أقرب وقت ممكن",
          position: "top-right"
        }
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  const textDirection = language === 'en' ? "text-left" : "text-right";
  const content = {
    title: language === 'en' ? "Contact Us" : "اتصل بنا",
    subtitle: language === 'en' 
      ? "We're here to help and answer any question you might have" 
      : "نحن هنا للمساعدة والإجابة على أي سؤال قد يكون لديك",
    name: language === 'en' ? "Name" : "الاسم",
    email: language === 'en' ? "Email" : "البريد الإلكتروني",
    phone: language === 'en' ? "Phone" : "رقم الهاتف",
    subject: language === 'en' ? "Subject" : "الموضوع",
    message: language === 'en' ? "Message" : "الرسالة",
    submit: language === 'en' ? "Send Message" : "إرسال الرسالة",
    submitting: language === 'en' ? "Sending..." : "جاري الإرسال...",
    officeTitle: language === 'en' ? "Our Office" : "مكتبنا",
    supportTitle: language === 'en' ? "Customer Support" : "دعم العملاء",
    hoursTitle: language === 'en' ? "Business Hours" : "ساعات العمل",
    address: language === 'en' 
      ? "123 King Fahd Road, Riyadh, Saudi Arabia" 
      : "123 طريق الملك فهد، الرياض، المملكة العربية السعودية",
    supportEmail: "support@zakart.com",
    supportPhone: "+966 50 123 4567",
    hours: language === 'en' 
      ? "Sunday - Thursday: 8:00 AM - 8:00 PM\nFriday - Saturday: 10:00 AM - 6:00 PM" 
      : "الأحد - الخميس: 8:00 صباحًا - 8:00 مساءً\nالجمعة - السبت: 10:00 صباحًا - 6:00 مساءً"
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{content.title}</h1>
            <p className="text-muted-foreground mt-2">{content.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-moprd-teal/10 p-3 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-moprd-teal" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{content.officeTitle}</h3>
                <p className="text-muted-foreground">{content.address}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-moprd-teal/10 p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-moprd-teal" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{content.supportTitle}</h3>
                <p className="text-muted-foreground">{content.supportEmail}</p>
                <p className="text-muted-foreground">{content.supportPhone}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-moprd-teal/10 p-3 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-moprd-teal" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{content.hoursTitle}</h3>
                <p className="text-muted-foreground whitespace-pre-line">{content.hours}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mx-auto">
            <CardHeader>
              <CardTitle className="text-center">{language === 'en' ? "Send us a message" : "أرسل لنا رسالة"}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={textDirection}>
                    <label className="block mb-2">{content.name}</label>
                    <Input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? "Enter your name" : "أدخل اسمك"} 
                      className={textDirection} 
                      required 
                    />
                  </div>
                  <div className={textDirection}>
                    <label className="block mb-2">{content.email}</label>
                    <Input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? "Enter your email" : "أدخل بريدك الإلكتروني"} 
                      className={textDirection} 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={textDirection}>
                    <label className="block mb-2">{content.phone}</label>
                    <Input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? "Enter your phone number" : "أدخل رقم هاتفك"} 
                      className={textDirection} 
                    />
                  </div>
                  <div className={textDirection}>
                    <label className="block mb-2">{content.subject}</label>
                    <Input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? "Enter subject" : "أدخل الموضوع"} 
                      className={textDirection} 
                      required 
                    />
                  </div>
                </div>
                <div className={textDirection}>
                  <label className="block mb-2">{content.message}</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={language === 'en' ? "Write your message here" : "اكتب رسالتك هنا"} 
                    className={`${textDirection} h-32`} 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {content.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {content.submit}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <div className="h-80 w-full rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674427766001!2d46.67510867426377!3d24.711747844966364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0365273dbf61%3A0xa7c3b3453ecf4994!2sKing%20Fahd%20Rd%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1709990442802!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
