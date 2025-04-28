
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, Loader2, Search, Phone, FileQuestion, Mail, MapPin, Share2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";

const Help = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponses, setAiResponses] = useState<{question: string, answer: string}[]>([]);
  const { language } = useLanguage();

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Store the current question
    const currentQuestion = question;
    
    // Add to responses with a placeholder
    setAiResponses(prev => [...prev, {
      question: currentQuestion,
      answer: language === 'en' ? "Thinking..." : "جاري التفكير..."
    }]);
    
    // Clear input
    setQuestion("");
    
    // Mock AI response - in a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Update the response
      setAiResponses(prev => 
        prev.map((item, index) => 
          index === prev.length - 1 
            ? {
                question: item.question,
                answer: getAIResponse(item.question, language)
              } 
            : item
        )
      );
      
      toast(
        language === 'en' ? "Assistant responded" : "رد المساعد",
        {
          description: language === 'en' 
            ? "The AI assistant has answered your question" 
            : "أجاب المساعد الذكي على سؤالك",
          position: "top-right"
        }
      );
    }, 1500);
  };

  // Enhanced AI response generation
  const getAIResponse = (q: string, lang: string) => {
    const questionLower = q.toLowerCase();
    
    if (questionLower.includes("truck") || questionLower.includes("شاحنة") || questionLower.includes("vehicle")) {
      return lang === 'en' 
        ? "Zakart offers various types of refrigerated trucks, flatbeds, and specialized equipment. Our fleet includes small (1-3 tons), medium (3-7 tons), and large (7+ tons) vehicles. All trucks are regularly inspected for quality and safety. You can request a truck from the 'Find Trucks' page by selecting the type and specifying your location and destination."
        : "تقدم زكرت أنواعًا مختلفة من الشاحنات المبردة والشاحنات المسطحة والمعدات المتخصصة. يشمل أسطولنا مركبات صغيرة (1-3 أطنان) ومتوسطة (3-7 أطنان) وكبيرة (+7 أطنان). يتم فحص جميع الشاحنات بانتظام للتأكد من الجودة والسلامة. يمكنك طلب شاحنة من صفحة 'البحث عن الشاحنات' عن طريق اختيار النوع وتحديد موقعك ووجهتك.";
    }
    else if (questionLower.includes("price") || questionLower.includes("cost") || questionLower.includes("سعر") || questionLower.includes("fee")) {
      return lang === 'en'
        ? "Our pricing is transparent and competitive. Prices are calculated based on truck type, distance, cargo weight, and rental duration. Factors that affect pricing include fuel costs, time of day, and demand. You can get an exact quote after entering your trip details. We offer discounts for regular customers and special promotions throughout the year. There are no hidden fees or charges."
        : "أسعارنا شفافة وتنافسية. يتم حساب الأسعار بناءً على نوع الشاحنة والمسافة ووزن البضائع ومدة الإيجار. تشمل العوامل التي تؤثر على التسعير تكاليف الوقود ووقت اليوم والطلب. يمكنك الحصول على عرض سعر دقيق بعد إدخال تفاصيل رحلتك. نقدم خصومات للعملاء المنتظمين وعروض خاصة على مدار العام. لا توجد رسوم أو تكاليف خفية.";
    }
    else if (questionLower.includes("payment") || questionLower.includes("دفع")) {
      return lang === 'en'
        ? "We accept multiple payment methods for your convenience: credit/debit cards (Visa, Mastercard, American Express), digital wallets (Apple Pay, Google Pay), bank transfers, and cash on delivery in certain areas. All online payments are secured with industry-standard encryption. You can select your preferred payment method during checkout. For business accounts, we also offer invoice billing with flexible payment terms."
        : "نقبل طرق دفع متعددة لراحتك: بطاقات الائتمان/الخصم (فيزا، ماستركارد، أمريكان إكسبريس)، المحافظ الرقمية (Apple Pay، Google Pay)، التحويلات المصرفية، والدفع عند الاستلام في مناطق معينة. جميع المدفوعات عبر الإنترنت مؤمنة بتشفير بمعايير الصناعة. يمكنك اختيار طريقة الدفع المفضلة لديك أثناء الدفع. للحسابات التجارية، نقدم أيضًا فواتير مع شروط دفع مرنة.";
    }
    else if (questionLower.includes("cancel") || questionLower.includes("إلغاء")) {
      return lang === 'en'
        ? "You can cancel your order within 14 minutes of placing it without any charges. To cancel, go to your order details and select 'Cancel Order'. After the 14-minute window, cancellation fees may apply based on how close to the pickup time you cancel. If a driver has already been assigned, a minimum fee will be charged to compensate them for their time and fuel. For subscription plans and advance bookings, different cancellation policies apply, which you can find in your contract."
        : "يمكنك إلغاء طلبك خلال 14 دقيقة من تقديمه دون أي رسوم. للإلغاء، انتقل إلى تفاصيل طلبك وحدد 'إلغاء الطلب'. بعد فترة الـ 14 دقيقة، قد تنطبق رسوم الإلغاء بناءً على مدى قرب وقت الاستلام الذي تلغيه. إذا تم تعيين سائق بالفعل، سيتم فرض رسوم دنيا لتعويضهم عن وقتهم والوقود. بالنسبة لخطط الاشتراك والحجوزات المسبقة، تطبق سياسات إلغاء مختلفة، يمكنك العثور عليها في عقدك.";
    }
    else if (questionLower.includes("track") || questionLower.includes("تتبع")) {
      return lang === 'en'
        ? "You can track your shipment in real-time through the 'Track' feature in our app. Once a driver accepts your booking, you'll receive live updates on their location and estimated arrival time. Our tracking system updates every 15 seconds for accurate positioning. You'll also receive notifications when the driver is approaching your pickup location, when they've collected your cargo, and when they're approaching the delivery destination. For any issues with tracking, you can chat directly with the driver or contact our support team."
        : "يمكنك تتبع شحنتك في الوقت الفعلي من خلال ميزة 'التتبع' في تطبيقنا. بمجرد قبول السائق لحجزك، ستتلقى تحديثات مباشرة عن موقعه ووقت الوصول المقدر. يقوم نظام التتبع لدينا بالتحديث كل 15 ثانية للحصول على تحديد دقيق للموقع. ستتلقى أيضًا إشعارات عندما يقترب السائق من موقع الاستلام الخاص بك، وعندما يستلم البضائع الخاصة بك، وعندما يقترب من وجهة التسليم. في حالة وجود أي مشاكل في التتبع، يمكنك الدردشة مباشرة مع السائق أو الاتصال بفريق الدعم لدينا.";
    }
    else if (questionLower.includes("contact") || questionLower.includes("اتصال") || questionLower.includes("support") || questionLower.includes("دعم")) {
      return lang === 'en'
        ? "Our customer support team is available 24/7 to assist you. You can reach us through multiple channels: Live chat in the app, Email at support@zakart.com, Phone at +966 50 123 4567, or through our social media accounts (@ZakartSupport). For urgent matters, we recommend using the live chat or calling our support line. Our average response time is under 5 minutes for chat and phone, and under 2 hours for email inquiries."
        : "فريق دعم العملاء لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك. يمكنك الوصول إلينا من خلال قنوات متعددة: الدردشة المباشرة في التطبيق، البريد الإلكتروني على support@zakart.com، الهاتف على +966 50 123 4567، أو من خلال حساباتنا على وسائل التواصل الاجتماعي (@ZakartSupport). للأمور العاجلة، نوصي باستخدام الدردشة المباشرة أو الاتصال بخط الدعم لدينا. متوسط وقت الاستجابة لدينا هو أقل من 5 دقائق للدردشة والهاتف، وأقل من ساعتين لاستفسارات البريد الإلكتروني.";
    }
    else if (questionLower.includes("driver") || questionLower.includes("سائق")) {
      return lang === 'en'
        ? "All our drivers undergo a rigorous vetting process including background checks, driving record verification, and professional reference checks. They are trained in cargo handling, customer service, and safety procedures. Each driver maintains a rating system based on customer feedback. You can view a driver's profile including their photo, rating, experience level, and vehicle details before accepting their offer. You can communicate directly with your assigned driver through our in-app messaging system."
        : "يخضع جميع سائقينا لعملية تدقيق صارمة تشمل فحوصات الخلفية، والتحقق من سجل القيادة، والتحقق من المراجع المهنية. يتم تدريبهم على مناولة البضائع، وخدمة العملاء، وإجراءات السلامة. يحتفظ كل سائق بنظام تقييم بناءً على تعليقات العملاء. يمكنك عرض ملف السائق بما في ذلك صورته، والتقييم، ومستوى الخبرة، وتفاصيل المركبة قبل قبول عرضه. يمكنك التواصل مباشرة مع السائق المعين لك من خلال نظام المراسلة داخل التطبيق.";
    }
    else if (questionLower.includes("account") || questionLower.includes("حساب") || questionLower.includes("profile") || questionLower.includes("ملف")) {
      return lang === 'en'
        ? "You can manage your account settings through the Profile section of the app. Here you can update your personal information, change your password, manage payment methods, view your order history, and set communication preferences. For business accounts, you can add multiple users with different permission levels. If you need to delete your account, please contact customer support for assistance."
        : "يمكنك إدارة إعدادات حسابك من خلال قسم الملف الشخصي في التطبيق. هنا يمكنك تحديث معلوماتك الشخصية، وتغيير كلمة المرور، وإدارة طرق الدفع، وعرض سجل الطلبات، وتعيين تفضيلات الاتصال. بالنسبة للحسابات التجارية، يمكنك إضافة مستخدمين متعددين بمستويات أذونات مختلفة. إذا كنت بحاجة إلى حذف حسابك، يرجى الاتصال بدعم العملاء للحصول على المساعدة.";
    }
    else {
      return lang === 'en'
        ? "Thank you for your question. Our team is dedicated to providing the best service for all your refrigerated and specialized truck needs. We connect you with verified drivers across the region and ensure safe, timely delivery of your goods. If you need more specific information, please try asking about trucks, pricing, payment options, cancellation policy, tracking, driver qualifications, or account management. For immediate assistance, you can contact our support team at +966 50 123 4567."
        : "شكرًا على سؤالك. فريقنا مكرس لتقديم أفضل خدمة لجميع احتياجاتك من الشاحنات المبردة والمتخصصة. نربطك بسائقين موثوقين في جميع أنحاء المنطقة ونضمن التسليم الآمن وفي الوقت المناسب لبضائعك. إذا كنت بحاجة إلى معلومات أكثر تحديدًا، يرجى محاولة السؤال عن الشاحنات، أو التسعير، أو خيارات الدفع، أو سياسة الإلغاء، أو التتبع، أو مؤهلات السائق، أو إدارة الحساب. للمساعدة الفورية، يمكنك الاتصال بفريق الدعم لدينا على +966 50 123 4567.";
    }
  };

  const faqData = [
    {
      question: language === 'en' ? "How do I request a truck?" : "كيف أطلب شاحنة؟",
      answer: language === 'en' 
        ? "To request a truck, go to 'Find Trucks' page, select the type of truck you need, enter your pickup and delivery locations, choose any special requirements, and submit your request. Available drivers will send you their offers." 
        : "لطلب شاحنة، انتقل إلى صفحة 'البحث عن الشاحنات'، واختر نوع الشاحنة التي تحتاجها، وأدخل مواقع الاستلام والتسليم، واختر أي متطلبات خاصة، وأرسل طلبك. سيرسل لك السائقون المتاحون عروضهم."
    },
    {
      question: language === 'en' ? "How is the price calculated?" : "كيف يتم حساب السعر؟",
      answer: language === 'en'
        ? "The price is calculated based on truck type, distance between pickup and delivery locations, weight and volume of cargo, rental duration, and any additional services requested. You can see a price estimate before confirming your booking."
        : "يتم حساب السعر بناءً على نوع الشاحنة، والمسافة بين مواقع الاستلام والتسليم، ووزن وحجم البضائع، ومدة الإيجار، وأي خدمات إضافية مطلوبة. يمكنك رؤية تقدير السعر قبل تأكيد حجزك."
    },
    {
      question: language === 'en' ? "What payment methods are available?" : "ما هي طرق الدفع المتاحة؟",
      answer: language === 'en'
        ? "We accept credit/debit cards, digital wallets (Apple Pay, Google Pay), bank transfers, and cash on delivery in certain areas. For business accounts, we also offer invoice billing with flexible payment terms."
        : "نقبل بطاقات الائتمان/الخصم، والمحافظ الرقمية (Apple Pay، Google Pay)، والتحويلات المصرفية، والدفع عند الاستلام في مناطق معينة. للحسابات التجارية، نقدم أيضًا فواتير مع شروط دفع مرنة."
    },
    {
      question: language === 'en' ? "Can I track my shipment?" : "هل يمكنني تتبع شحنتي؟",
      answer: language === 'en' 
        ? "Yes, you can track your shipment in real-time through the 'Track' feature in our app. You'll see the driver's location on a map and receive updates on estimated arrival time." 
        : "نعم، يمكنك تتبع شحنتك في الوقت الفعلي من خلال ميزة 'التتبع' في تطبيقنا. سترى موقع السائق على الخريطة وتتلقى تحديثات حول وقت الوصول المقدر."
    },
    {
      question: language === 'en' ? "How do I cancel an order?" : "كيف يمكنني إلغاء طلب؟",
      answer: language === 'en' 
        ? "You can cancel your order within 14 minutes of placing it without any charges. To cancel, go to your order details and select 'Cancel Order'. After 14 minutes, cancellation fees may apply." 
        : "يمكنك إلغاء طلبك خلال 14 دقيقة من تقديمه دون أي رسوم. للإلغاء، انتقل إلى تفاصيل طلبك وحدد 'إلغاء الطلب'. بعد 14 دقيقة، قد تنطبق رسوم الإلغاء."
    },
    {
      question: language === 'en' ? "How do I contact customer support?" : "كيف يمكنني الاتصال بدعم العملاء؟",
      answer: language === 'en' 
        ? "You can reach our customer support team 24/7 through live chat in the app, email at support@zakart.com, phone at +966 50 123 4567, or through our social media accounts." 
        : "يمكنك الوصول إلى فريق دعم العملاء لدينا على مدار الساعة طوال أيام الأسبوع من خلال الدردشة المباشرة في التطبيق، أو البريد الإلكتروني على support@zakart.com، أو الهاتف على +966 50 123 4567، أو من خلال حساباتنا على وسائل التواصل الاجتماعي."
    }
  ];

  const textDirection = language === 'en' ? "text-left" : "text-right";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="border-b">
            <CardTitle className="text-3xl font-bold text-center">
              {language === 'en' ? "Help Center" : "مركز المساعدة"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Quick Access Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Button variant="outline" className="flex flex-col items-center h-auto py-4 gap-2">
                <Search className="h-6 w-6 text-moprd-teal" />
                <span>{language === 'en' ? "Search FAQ" : "البحث في الأسئلة الشائعة"}</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center h-auto py-4 gap-2">
                <Phone className="h-6 w-6 text-moprd-teal" />
                <span>{language === 'en' ? "Call Support" : "اتصل بالدعم"}</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center h-auto py-4 gap-2">
                <Mail className="h-6 w-6 text-moprd-teal" />
                <span>{language === 'en' ? "Email Us" : "راسلنا"}</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center h-auto py-4 gap-2">
                <FileQuestion className="h-6 w-6 text-moprd-teal" />
                <span>{language === 'en' ? "Submit Ticket" : "إرسال تذكرة"}</span>
              </Button>
            </div>
            
            {/* AI Chat Assistant */}
            <div className="mb-8 p-6 bg-primary/5 rounded-lg border">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {language === 'en' ? "Smart Assistant" : "المساعد الذكي"}
                </h2>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder={language === 'en' ? "Ask the smart assistant..." : "اسأل المساعد الذكي..."}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                  className={`flex-1 ${textDirection}`}
                />
                <Button 
                  onClick={handleAskQuestion} 
                  disabled={!question || isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {language === 'en' ? "Send" : "إرسال"}
                </Button>
              </div>
              
              {/* AI Responses */}
              {aiResponses.length > 0 && (
                <div className="mt-6 space-y-4">
                  {aiResponses.map((item, index) => (
                    <div key={index} className={`bg-white border rounded-lg p-4 shadow-sm ${textDirection}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-primary">
                          {language === 'en' ? "Your question: " : "سؤالك: "}{item.question}
                        </p>
                      </div>
                      <div className={`p-3 bg-gray-50 rounded-lg ${textDirection}`}>
                        {item.answer === "Thinking..." || item.answer === "جاري التفكير..." ? (
                          <div className="flex items-center">
                            <span>{item.answer}</span> <Loader2 className="h-4 w-4 animate-spin ml-2" />
                          </div>
                        ) : (
                          item.answer
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested questions */}
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'en' ? "Suggested questions:" : "أسئلة مقترحة:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setQuestion(language === 'en' ? "How does truck tracking work?" : "كيف يعمل تتبع الشاحنات؟")}
                  >
                    {language === 'en' ? "How does truck tracking work?" : "كيف يعمل تتبع الشاحنات؟"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setQuestion(language === 'en' ? "What payment methods do you accept?" : "ما هي طرق الدفع المقبولة؟")}
                  >
                    {language === 'en' ? "What payment methods do you accept?" : "ما هي طرق الدفع المقبولة؟"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setQuestion(language === 'en' ? "How do I contact customer service?" : "كيف أتواصل مع خدمة العملاء؟")}
                  >
                    {language === 'en' ? "How do I contact customer service?" : "كيف أتواصل مع خدمة العملاء؟"}
                  </Button>
                </div>
              </div>
            </div>

            <h2 className={`text-2xl font-semibold mb-4 ${textDirection}`}>
              {language === 'en' ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
            </h2>
            <Accordion type="single" collapsible className={textDirection}>
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 p-4 bg-moprd-teal/10 rounded-lg">
              <h3 className={`font-semibold mb-2 ${textDirection}`}>
                {language === 'en' ? "Still need help?" : "هل لا تزال بحاجة إلى مساعدة؟"}
              </h3>
              <p className={textDirection}>
                {language === 'en' 
                  ? "Our support team is available 24/7 to assist you." 
                  : "فريق الدعم لدينا متاح على مدار الساعة لمساعدتك."}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button size="sm" variant="default">
                  <Phone className="h-4 w-4 mr-2" />
                  {language === 'en' ? "Call Us" : "اتصل بنا"}
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  {language === 'en' ? "Email Support" : "دعم البريد الإلكتروني"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;
