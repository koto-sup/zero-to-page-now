
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">من نحن</h1>
          <div className="space-y-4 text-right">
            <p>
              زكرت هي منصة رائدة في مجال خدمات النقل والشاحنات في المملكة العربية السعودية. نحن نربط أصحاب الشاحنات بالعملاء بطريقة سهلة وفعالة.
            </p>
            <p>
              رؤيتنا هي أن نكون المنصة الأولى في المنطقة لخدمات النقل، ونسعى دائماً لتقديم أفضل تجربة ممكنة لعملائنا.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
