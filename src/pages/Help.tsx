
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">المساعدة</h1>
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
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
