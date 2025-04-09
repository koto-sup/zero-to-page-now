
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

interface InvoiceProps {
  invoiceId: string;
  customerId: string;
  customerName: string;
  driverId: string;
  driverName: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: Date;
  amount: number;
  serviceFee?: number;
  subtotal?: number;
  taxAmount: number;
  totalAmount: number;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceId,
  customerId,
  customerName,
  driverId,
  driverName,
  pickupLocation,
  dropoffLocation,
  date,
  amount,
  serviceFee = 0,
  subtotal = 0,
  taxAmount,
  totalAmount,
  items,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    console.log("Downloading invoice as PDF");
  };

  const actualSubtotal = subtotal || amount + serviceFee;

  return (
    <Card className="invoice-card max-w-4xl mx-auto my-8 print:shadow-none">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl mb-2">فاتورة</CardTitle>
            <p className="text-sm text-gray-500">رقم الفاتورة: {invoiceId}</p>
            <p className="text-sm text-gray-500">
              تاريخ: {date.toLocaleDateString("ar-SA")}
            </p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-xl">زكرت</h2>
            <p className="text-sm text-gray-500">خدمات تأجير الشاحنات المبردة</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">العميل</h3>
            <p>{customerName}</p>
            <p className="text-sm text-gray-500">معرف العميل: {customerId}</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">السائق</h3>
            <p>{driverName}</p>
            <p className="text-sm text-gray-500">معرف السائق: {driverId}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold mb-2">تفاصيل الرحلة</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">موقع الاستلام:</p>
              <p className="text-sm text-gray-600">{pickupLocation}</p>
            </div>
            <div>
              <p className="text-sm font-medium">موقع التسليم:</p>
              <p className="text-sm text-gray-600">{dropoffLocation}</p>
            </div>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-right">الوصف</th>
              <th className="py-2 px-4 text-right">الكمية</th>
              <th className="py-2 px-4 text-right">السعر</th>
              <th className="py-2 px-4 text-right">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">{item.unitPrice.toFixed(2)} ريال</td>
                <td className="py-2 px-4">{item.total.toFixed(2)} ريال</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span>خدمة النقل:</span>
              <span>{amount.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between py-2">
              <span>رسوم تشغيلية (7%):</span>
              <span>{serviceFee.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2">
              <span>المجموع الفرعي:</span>
              <span>{actualSubtotal.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between py-2">
              <span>الضريبة (15%):</span>
              <span>{taxAmount.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between py-2 font-bold border-t border-gray-300 mt-2 pt-2">
              <span>الإجمالي:</span>
              <span>{totalAmount.toFixed(2)} ريال</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end print:hidden gap-3">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="ml-2 h-4 w-4" />
            طباعة الفاتورة
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="ml-2 h-4 w-4" />
            تحميل كـ PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Invoice;
