import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceButtonV2 } from "@/components/ui/ice-button-v2";
import { ArrowRight } from "lucide-react";
import Invoice from "@/components/Invoice";
import PaymentForm from "@/components/PaymentForm";
import { toast } from "sonner";
import { IceCard, IceCardContent } from "@/components/ui/ice-card";

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [customerPoints, setCustomerPoints] = useState<number>(225); // For demo, should fetch from user/profile
  const [discountClaimed, setDiscountClaimed] = useState(false);

  useEffect(() => {
    // Simulate loading invoice from API
    setTimeout(() => {
      // Mock data for the selected invoice
      const tripAmount = 350;
      const serviceFee = Math.round(tripAmount * 0.07 * 100) / 100; // 7% service fee
      const subtotal = tripAmount + serviceFee;
      const taxAmount = Math.round(subtotal * 0.15 * 100) / 100; // 15% VAT
      const totalAmount = subtotal + taxAmount;
      
      const mockInvoice = {
        invoiceId: id,
        customerId: "cust-123",
        customerName: "أحمد محمد",
        driverId: "drv-456",
        driverName: "خالد السائق",
        pickupLocation: "الرياض، حي النرجس",
        dropoffLocation: "جدة، حي الشاطئ",
        date: new Date(),
        amount: tripAmount,
        serviceFee: serviceFee,
        subtotal: subtotal,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        isPaid: false,
        items: [
          {
            description: "نقل بضائع مبردة (15 كم)",
            quantity: 1,
            unitPrice: tripAmount,
            total: tripAmount,
          },
          {
            description: "رسوم تشغيلية (7%)",
            quantity: 1,
            unitPrice: serviceFee,
            total: serviceFee,
          }
        ],
      };
      
      setInvoiceData(mockInvoice);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handlePaymentSuccess = () => {
    // In a real app, we'd update the invoice status in the database
    toast.success("تم الدفع بنجاح!", {
      description: "جاري الانتقال إلى شاشة تتبع السائق..."
    });
    
    // Update the invoice status locally
    setInvoiceData({
      ...invoiceData,
      isPaid: true,
    });
    
    // Hide payment form
    setShowPayment(false);
    
    // After successful payment, redirect to tracking page after a short delay
    setTimeout(() => {
      navigate("/truck-tracking");
    }, 1500);
  };

  const handleBackToList = () => {
    navigate("/invoices");
  };

  const handleClaimDiscount = () => {
    if (customerPoints >= 180 && !discountClaimed && !invoiceData?.discountApplied) {
      setDiscountClaimed(true);
      setCustomerPoints(customerPoints - 180);
      // Deduct 48 SAR from invoice totals
      setInvoiceData((prev: any) => ({
        ...prev,
        totalAmount: (prev?.totalAmount ?? 0) - 48,
        discountApplied: true,
      }));
      toast.success("تم تطبيق خصم 48 ريال! سيتم خصم المبلغ مباشرة.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-moprd-teal border-r-moprd-teal border-b-transparent border-l-transparent"></div>
        <p className="mt-4 text-gray-600">جاري تحميل الفاتورة...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center mb-4"
          onClick={handleBackToList}
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للفواتير
        </Button>
        <h1 className="text-3xl font-bold mb-2">تفاصيل الفاتورة</h1>
        <p className="text-gray-600">
          استعراض تفاصيل الفاتورة وإتمام الدفع
        </p>
      </div>

      {showPayment ? (
        <IceCard className="max-w-md mx-auto">
          <IceCardContent>
            <PaymentForm
              amount={invoiceData.totalAmount}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentCancel={() => setShowPayment(false)}
            />
          </IceCardContent>
        </IceCard>
      ) : (
        <>
          <Invoice
            invoiceId={invoiceData.invoiceId || ""}
            customerId={invoiceData.customerId}
            customerName={invoiceData.customerName}
            driverId={invoiceData.driverId}
            driverName={invoiceData.driverName}
            pickupLocation={invoiceData.pickupLocation}
            dropoffLocation={invoiceData.dropoffLocation}
            date={invoiceData.date}
            amount={invoiceData.amount}
            serviceFee={invoiceData.serviceFee}
            subtotal={invoiceData.subtotal}
            taxAmount={invoiceData.taxAmount}
            totalAmount={invoiceData.totalAmount}
            items={invoiceData.items}
            discountApplied={invoiceData?.discountApplied}
          />
          
          {!discountClaimed && customerPoints >= 180 && !invoiceData?.discountApplied && (
            <div className="text-center mb-6">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleClaimDiscount}
              >
                احصل على خصم ٤٨ ريال مقابل ١٨٠ نقطة
              </Button>
            </div>
          )}
          
          {invoiceData.isPaid && (
            <div className="text-center mb-12 mt-6">
              <p className="text-lg text-green-600 font-medium mb-4">
                تم دفع هذه الفاتورة بالكامل
              </p>
              <IceButtonV2
                onClick={() => navigate("/truck-tracking")}
              >
                تتبع السائق
              </IceButtonV2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InvoiceDetail;
