
import React, { useState, useEffect, useRef } from "react";
import { Send, PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isQuote?: boolean;
  quoteAmount?: number;
  isAccepted?: boolean;
}

interface ChatBoxProps {
  chatId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  initialMessages?: Message[];
  onSendQuote?: (amount: number) => void;
  onAcceptQuote?: (messageId: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  chatId,
  recipientId,
  recipientName,
  recipientAvatar,
  initialMessages = [],
  onSendQuote,
  onAcceptQuote,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || "unknown",
      senderName: user?.name || "Anonymous",
      senderAvatar: user?.profileImage,
      content: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleSendQuote = () => {
    if (!quoteAmount || isNaN(parseFloat(quoteAmount))) return;

    const message: Message = {
      id: `quote-${Date.now()}`,
      senderId: user?.id || "unknown",
      senderName: user?.name || "Anonymous",
      senderAvatar: user?.profileImage,
      content: `أقدم سعراً قدره ${parseFloat(quoteAmount).toFixed(2)} ريال لهذه الرحلة.`,
      timestamp: new Date(),
      isQuote: true,
      quoteAmount: parseFloat(quoteAmount),
    };

    setMessages(prev => [...prev, message]);
    setQuoteAmount("");
    setShowQuoteForm(false);
    
    if (onSendQuote) {
      onSendQuote(parseFloat(quoteAmount));
    }
  };

  const handleAcceptQuote = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isAccepted: true } : msg
      )
    );
    
    if (onAcceptQuote) {
      onAcceptQuote(messageId);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-3 border-b">
        <Avatar className="h-10 w-10 ml-3">
          <img 
            src={recipientAvatar || "/placeholder.svg"} 
            alt={recipientName}
          />
        </Avatar>
        <div>
          <h3 className="font-medium">{recipientName}</h3>
          <span className="text-xs text-muted-foreground">متصل</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === user?.id;
          
          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? "justify-start" : "justify-end"}`}
            >
              <div className="flex items-start max-w-[80%]">
                {!isOwnMessage && (
                  <Avatar className="h-8 w-8 ml-2 mt-1">
                    <img
                      src={message.senderAvatar || "/placeholder.svg"}
                      alt={message.senderName}
                    />
                  </Avatar>
                )}
                <div>
                  <Card 
                    className={`p-3 ${
                      isOwnMessage 
                        ? "bg-moprd-teal text-white" 
                        : "bg-gray-100"
                    } ${message.isQuote ? "border-2 border-moprd-light" : ""}`}
                  >
                    {message.content}
                    
                    {message.isQuote && (
                      <div className="mt-2">
                        <Badge className="bg-white text-moprd-blue">
                          السعر: {message.quoteAmount?.toFixed(2)} ريال
                        </Badge>
                        
                        {!isOwnMessage && !message.isAccepted && (
                          <Button
                            size="sm"
                            onClick={() => handleAcceptQuote(message.id)}
                            className="mt-2 bg-green-600 hover:bg-green-700"
                          >
                            قبول العرض
                          </Button>
                        )}
                        
                        {message.isAccepted && (
                          <Badge className="mt-2 bg-green-500">
                            تم قبول العرض
                          </Badge>
                        )}
                      </div>
                    )}
                  </Card>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {showQuoteForm && user?.role === "driver" ? (
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
                <Button
                  variant="ghost"
                  onClick={() => setShowQuoteForm(false)}
                  className="mr-1"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t p-3">
          <div className="flex items-center">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="اكتب رسالة..."
              className="flex-1 resize-none"
              rows={1}
              dir="rtl"
            />
            <div className="mr-3 flex">
              {user?.role === "driver" && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowQuoteForm(true)}
                  className="ml-2"
                  title="إرسال عرض سعر"
                >
                  <span className="text-lg font-bold">ريال</span>
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="ml-2"
              >
                <PaperclipIcon className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-moprd-teal hover:bg-moprd-blue"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
