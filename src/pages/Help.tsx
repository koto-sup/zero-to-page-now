
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";

const Help = () => {
  const [question, setQuestion] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAskQuestion = async () => {
    setIsLoading(true);
    // Here you would integrate with an AI service
    setTimeout(() => {
      setIsLoading(false);
      setQuestion("");
    }, 1000);
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
