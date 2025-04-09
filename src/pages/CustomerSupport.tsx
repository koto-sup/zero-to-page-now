
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Search, HelpCircle, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";

const faqCategories = [
  {
    id: "general",
    title: "أسئلة عامة",
    questions: [
      {
        q: "ما هو تطبيق زكرت؟",
        a: "زكرت هو تطبيق للربط بين أصحاب الشاحنات المبردة والعملاء الذين يحتاجون لنقل بضائعهم."
      },
      {
        q: "كيف يمكنني التسجيل؟",
        a: "يمكنك التسجيل بسهولة باختيار نوع الحساب (عميل أو سائق) ثم إدخال بياناتك الشخصية."
      },
      {
        q: "هل يمكنني تغيير نوع حسابي؟",
        a: "لا يمكن تغيير نوع الحساب بعد التسجيل. يجب إنشاء حساب جديد إذا كنت ترغب في تغيير نوعه."
      }
    ]
  },
  {
    id: "payments",
    title: "المدفوعات",
    questions: [
      {
        q: "ما هي طرق الدفع المتاحة؟",
        a: "يمكنك الدفع باستخدام البطاقات الائتمانية أو نقدًا للسائق عند التسليم."
      },
      {
        q: "ما هي رسوم الخدمة؟",
        a: "تبلغ رسوم التشغيل 7٪ من إجمالي قيمة الرحلة."
      },
      {
        q: "هل يمكنني استرداد أموالي؟",
        a: "نعم، يمكنك طلب استرداد الأموال في حالة إلغاء الرحلة قبل بدء السائق في التحرك."
      }
    ]
  },
  {
    id: "drivers",
    title: "معلومات للسائقين",
    questions: [
      {
        q: "كيف أضيف شاحنتي؟",
        a: "بعد تسجيل الدخول كسائق، انتقل إلى صفحة تحرير ملف الشاحنة وأضف تفاصيل شاحنتك وصورها."
      },
      {
        q: "كم تبلغ رسوم التطبيق للسائقين؟",
        a: "يأخذ التطبيق 7٪ من قيمة كل رحلة كرسوم تشغيل."
      },
      {
        q: "كيف أتلقى مدفوعاتي؟",
        a: "ستتلقى مدفوعاتك إما مباشرة من العميل إذا اختاروا الدفع نقدًا، أو خلال 24 ساعة إلى حسابك البنكي إذا تم الدفع بالبطاقة."
      }
    ]
  }
];

const botResponses: Record<string, string> = {
  "مرحبا": "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
  "كيف حالك": "أنا بخير، شكرًا لسؤالك! كيف يمكنني مساعدتك؟",
  "شكرا": "العفو! هل يمكنني مساعدتك في شيء آخر؟",
  "وداعا": "وداعًا! نرجو أن تكون قد وجدت المساعدة التي تحتاجها. نتمنى لك يومًا سعيدًا!",
  "طريقة الدفع": "يمكنك الدفع باستخدام بطاقات الائتمان أو نقدًا للسائق عند التسليم.",
  "كيف أطلب شاحنة": "يمكنك طلب شاحنة بالانتقال إلى صفحة 'البحث عن شاحنات' واختيار موقع الاستلام والتسليم ثم اختيار الشاحنة المناسبة.",
  "كم تكلفة الخدمة": "تختلف التكلفة حسب المسافة ونوع الشاحنة. سعر الكيلومتر الواحد هو 13.5 ريال سعودي بالإضافة إلى رسوم تشغيل 7٪.",
  "كيف أتواصل مع السائق": "يمكنك التواصل مع السائق من خلال صفحة المحادثة بعد قبول العرض.",
  "كيف أتتبع الشاحنة": "يمكنك تتبع الشاحنة في الوقت الحقيقي من خلال صفحة التتبع بعد بدء الرحلة.",
};

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const CustomerSupport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState<typeof faqCategories>(faqCategories);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "مرحبًا بك في خدمة عملاء زكرت! كيف يمكنني مساعدتك اليوم؟",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Search FAQs
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query) {
      setFilteredFAQs(faqCategories);
      return;
    }
    
    const filtered = faqCategories.map(category => ({
      ...category,
      questions: category.questions.filter(
        q => q.q.toLowerCase().includes(query.toLowerCase()) || 
             q.a.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.questions.length > 0);
    
    setFilteredFAQs(filtered);
  };

  // Bot chat
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response
    setTimeout(() => {
      let botResponse = "عذرًا، لا يمكنني فهم سؤالك. هل يمكنك إعادة صياغته أو طرح سؤال آخر؟";
      
      // Check for exact match
      const exactMatch = botResponses[newMessage.trim().toLowerCase()];
      if (exactMatch) {
        botResponse = exactMatch;
      } else {
        // Check for partial matches
        for (const [key, value] of Object.entries(botResponses)) {
          if (newMessage.toLowerCase().includes(key.toLowerCase())) {
            botResponse = value;
            break;
          }
        }
      }
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
    
    setNewMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="ml-2 h-4 w-4" /> العودة
      </Button>

      <h1 className="text-3xl font-bold mb-4">مركز المساعدة</h1>
      <p className="text-muted-foreground mb-8">اعثر على الإجابات على أسئلتك الشائعة أو تحدث إلى مساعدنا الآلي</p>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            الأسئلة الشائعة
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            مساعد خدمة العملاء
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="mt-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="ابحث في الأسئلة الشائعة..." 
                className="pr-10" 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">لم يتم العثور على نتائج</h3>
              <p className="text-muted-foreground">لم نتمكن من العثور على إجابة لسؤالك. جرب مصطلحات بحث مختلفة أو تحدث إلى مساعدنا الآلي.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setFilteredFAQs(faqCategories);
                }}
              >
                مسح البحث
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category) => (
                <div key={category.id}>
                  <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <Card key={`${category.id}-${index}`}>
                        <CardHeader className="py-4">
                          <CardTitle className="text-lg">{faq.q}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{faq.a}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <img src="/placeholder.svg" alt="AI Assistant" />
                </Avatar>
                مساعد خدمة العملاء
              </CardTitle>
              <CardDescription>
                مساعدنا الآلي متاح على مدار الساعة للإجابة على أسئلتك
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-moprd-teal text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <div className="flex w-full">
                <Input
                  placeholder="اكتب رسالتك هنا..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  className="mr-2 bg-moprd-teal hover:bg-moprd-blue"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerSupport;
