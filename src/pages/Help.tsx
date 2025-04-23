
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Help = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponses, setAiResponses] = useState<{question: string, answer: string}[]>([]);
  const { toast } = useToast();

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Store the current question
    const currentQuestion = question;
    
    // Add to responses with a placeholder
    setAiResponses(prev => [...prev, {
      question: currentQuestion,
      answer: "Thinking..."
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
                answer: getAIResponse(item.question)
              } 
            : item
        )
      );
      
      toast({
        title: "Assistant responded",
        description: "The AI assistant has answered your question",
      });
    }, 1500);
  };

  // Helper function to generate responses
  const getAIResponse = (q: string) => {
    const questionLower = q.toLowerCase();
    
    if (questionLower.includes("truck") || questionLower.includes("شاحنة")) {
      return "You can request a truck from the main page by selecting the type of truck and specifying your location and destination. Our app offers various types of trucks including refrigerated trucks, flatbed trucks, and specialized equipment.";
    }
    else if (questionLower.includes("price") || questionLower.includes("cost") || questionLower.includes("سعر")) {
      return "Prices are calculated based on truck type, distance, and rental duration. You can get an exact quote after entering your trip details.";
    }
    else if (questionLower.includes("payment") || questionLower.includes("دفع")) {
      return "We accept credit cards, bank transfers, and cash on delivery. You can select your preferred payment method during checkout.";
    }
    else if (questionLower.includes("cancel") || questionLower.includes("إلغاء")) {
      return "You can cancel your order within 14 minutes of placing it without any charges. After that period, cancellation fees may apply.";
    }
    else {
      return "Thanks for your question. Our customer support team will get back to you shortly. If you need immediate assistance, you can call our support line at +966 50 123 4567.";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">المساعدة</h1>
          
          {/* AI Chat Assistant */}
          <div className="mb-8 p-6 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">المساعد الذكي</h2>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="اسأل المساعد الذكي..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                className="flex-1"
              />
              <Button 
                onClick={handleAskQuestion} 
                disabled={!question || isLoading}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                إرسال
              </Button>
            </div>
            
            {/* AI Responses */}
            {aiResponses.length > 0 && (
              <div className="mt-6 space-y-4">
                {aiResponses.map((item, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                    <p className="font-medium text-primary mb-2">سؤالك: {item.question}</p>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Accordion type="single" collapsible className="text-right">
            <AccordionItem value="item-1">
              <AccordionTrigger>كيف أطلب شاحنة؟</AccordionTrigger>
              <AccordionContent>
                يمكنك طلب شاحنة من خلال الصفحة الرئيسية، حدد نوع الشاحنة والموقع والوجهة.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>كيف يتم حساب السعر؟</AccordionTrigger>
              <AccordionContent>
                يتم حساب السعر بناءً على نوع الشاحنة والمسافة ومدة الإيجار.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>ما هي طرق الدفع المتاحة؟</AccordionTrigger>
              <AccordionContent>
                نقبل الدفع عن طريق البطاقات الائتمانية والتحويل البنكي والدفع عند الاستلام.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
