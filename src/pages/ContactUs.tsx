
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">اتصل بنا</h1>
          <form className="space-y-4">
            <div>
              <label className="block mb-2 text-right">الاسم</label>
              <Input type="text" placeholder="أدخل اسمك" className="text-right" />
            </div>
            <div>
              <label className="block mb-2 text-right">البريد الإلكتروني</label>
              <Input type="email" placeholder="أدخل بريدك الإلكتروني" className="text-right" />
            </div>
            <div>
              <label className="block mb-2 text-right">الرسالة</label>
              <Textarea placeholder="اكتب رسالتك هنا" className="text-right" />
            </div>
            <Button className="w-full">إرسال</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
