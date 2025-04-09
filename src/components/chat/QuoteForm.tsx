
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface QuoteFormProps {
  onSendQuote: (amount: number) => void;
  onCancel: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSendQuote, onCancel }) => {
  const [quoteAmount, setQuoteAmount] = useState<string>("");

  const handleSendQuote = () => {
    if (!quoteAmount || isNaN(parseFloat(quoteAmount))) return;
    onSendQuote(parseFloat(quoteAmount));
    setQuoteAmount("");
  };

  return (
    <div className="border-t p-3">
      <div className="flex items-center">
        <div className="flex-1 ml-2">
          <div className="mb-1 text-sm font-medium">أدخل السعر (ريال)</div>
          <div className="flex">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">ريال</span>
              </div>
              <input
                type="number"
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
                className="pr-14 block w-full rounded-md border-gray-300 shadow-sm focus:border-moprd-teal focus:ring focus:ring-moprd-light focus:ring-opacity-50 py-1.5"
                placeholder="0.00"
                min="0"
                step="0.01"
                dir="ltr"
              />
            </div>
            <Button
              onClick={handleSendQuote}
              className="mr-2 bg-moprd-teal hover:bg-moprd-blue"
              disabled={!quoteAmount || isNaN(parseFloat(quoteAmount))}
            >
              إرسال العرض
            </Button>
            <Button variant="ghost" onClick={onCancel} className="mr-1">
              إلغاء
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
