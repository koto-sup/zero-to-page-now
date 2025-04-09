
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface MessageProps {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isQuote?: boolean;
  quoteAmount?: number;
  isAccepted?: boolean;
  isOwnMessage: boolean;
  currentUserId: string;
  showPaymentOptions: string | null;
  onAcceptQuote: (messageId: string) => void;
  onPaymentMethodSelect: (messageId: string, method: 'cash' | 'card') => void;
}

const Message: React.FC<MessageProps> = ({
  id,
  senderId,
  senderName,
  senderAvatar,
  content,
  timestamp,
  isQuote,
  quoteAmount,
  isAccepted,
  isOwnMessage,
  currentUserId,
  showPaymentOptions,
  onAcceptQuote,
  onPaymentMethodSelect,
}) => {
  return (
    <div
      className={`flex ${isOwnMessage ? "justify-start" : "justify-end"}`}
    >
      <div className="flex items-start max-w-[80%]">
        {!isOwnMessage && (
          <Avatar className="h-8 w-8 ml-2 mt-1">
            <img
              src={senderAvatar || "/placeholder.svg"}
              alt={senderName}
            />
          </Avatar>
        )}
        <div>
          <Card
            className={`p-3 ${
              isOwnMessage
                ? "bg-moprd-teal text-white"
                : "bg-gray-100"
            } ${isQuote ? "border-2 border-moprd-light" : ""}`}
          >
            {content}

            {isQuote && (
              <div className="mt-2">
                <Badge className="bg-white text-moprd-blue">
                  السعر: {quoteAmount?.toFixed(2)} ريال
                </Badge>

                {!isOwnMessage && !isAccepted && showPaymentOptions !== id && (
                  <Button
                    size="sm"
                    onClick={() => onAcceptQuote(id)}
                    className="mt-2 bg-green-600 hover:bg-green-700"
                  >
                    قبول العرض
                  </Button>
                )}

                {showPaymentOptions === id && (
                  <div className="mt-2 flex flex-col space-y-2">
                    <div className="text-sm font-medium mb-1">طريقة الدفع:</div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => onPaymentMethodSelect(id, 'card')}
                        className="bg-blue-600 hover:bg-blue-700 ml-2"
                      >
                        بطاقة ائتمان
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPaymentMethodSelect(id, 'cash')}
                      >
                        نقداً للسائق
                      </Button>
                    </div>
                  </div>
                )}

                {isAccepted && (
                  <Badge className="mt-2 bg-green-500">
                    تم قبول العرض
                  </Badge>
                )}
              </div>
            )}
          </Card>
          <div className="text-xs text-muted-foreground mt-1">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
