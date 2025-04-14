
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">سياسة الخصوصية</h1>
          <div className="space-y-4 text-right">
            <p>
              نحن في زكرت نلتزم بحماية خصوصية مستخدمينا. تصف هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-2">جمع المعلومات</h2>
            <p>
              نقوم بجمع المعلومات التي تقدمها مباشرة عند التسجيل واستخدام خدماتنا.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;
