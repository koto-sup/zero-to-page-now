
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, FileText, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  date: Date;
  amount: number;
  status: "مدفوع" | "معلق" | "ملغي";
  customerName?: string;
  driverName?: string;
}

const Invoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading invoices from API
    setTimeout(() => {
      const mockInvoices: InvoiceItem[] = [
        {
          id: "inv-1",
          invoiceNumber: "INV-2025-001",
          date: new Date(2025, 3, 5),
          amount: 450,
          status: "مدفوع",
          customerName: user?.role === "driver" ? "أحمد محمد" : undefined,
          driverName: user?.role === "customer" ? "خالد السائق" : undefined,
        },
        {
          id: "inv-2",
          invoiceNumber: "INV-2025-002",
          date: new Date(2025, 3, 8),
          amount: 320,
          status: "مدفوع",
          customerName: user?.role === "driver" ? "سارة أحمد" : undefined,
          driverName: user?.role === "customer" ? "محمد السائق" : undefined,
        },
        {
          id: "inv-3",
          invoiceNumber: "INV-2025-003",
          date: new Date(2025, 3, 10),
          amount: 780,
          status: "معلق",
          customerName: user?.role === "driver" ? "علي حسن" : undefined,
          driverName: user?.role === "customer" ? "أحمد السائق" : undefined,
        },
      ];
      
      setInvoices(mockInvoices);
      setLoading(false);
    }, 1000);
  }, [user]);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (invoice.customerName &&
        invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (invoice.driverName &&
        invoice.driverName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">الفواتير</h1>
        <p className="text-gray-600">
          {user?.role === "customer"
            ? "استعراض فواتير الرحلات الخاصة بك"
            : "استعراض الفواتير الخاصة بالرحلات التي قمت بها"}
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Input
              placeholder="البحث عن فاتورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-moprd-teal border-r-moprd-teal border-b-transparent border-l-transparent"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الفواتير...</p>
        </div>
      ) : (
        <>
          {filteredInvoices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{invoice.invoiceNumber}</CardTitle>
                        <span className="text-sm text-gray-500">
                          {invoice.date.toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                            invoice.status === "مدفوع"
                              ? "bg-green-100 text-green-700"
                              : invoice.status === "معلق"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid gap-1 mb-4">
                      {user?.role === "driver" && invoice.customerName && (
                        <div className="text-sm">
                          <span className="font-medium">العميل:</span>{" "}
                          {invoice.customerName}
                        </div>
                      )}
                      {user?.role === "customer" && invoice.driverName && (
                        <div className="text-sm">
                          <span className="font-medium">السائق:</span>{" "}
                          {invoice.driverName}
                        </div>
                      )}
                      <div className="text-lg font-bold mt-2">
                        {invoice.amount} ريال
                      </div>
                    </div>
                    <Link to={`/invoice-details/${invoice.id}`}>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                      >
                        <Eye className="ml-2 h-4 w-4" /> عرض التفاصيل
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">لا توجد فواتير متطابقة مع بحثك</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Invoices;
