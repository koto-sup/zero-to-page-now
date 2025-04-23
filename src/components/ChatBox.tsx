
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ChatHeader from "./chat/ChatHeader";
import MessageList from "./chat/MessageList";
import MessageInput from "./chat/MessageInput";
import QuoteForm from "./chat/QuoteForm";
import { toast } from "sonner";

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

// Mock initial messages for demo purposes
const getMockInitialMessages = (recipientId: string, currentUserId: string): Message[] => {
  return [
    {
      id: "msg-1",
      senderId: recipientId,
      senderName: "Customer",
      content: "مرحبا، هل يمكنك نقل بضائعي من الرياض إلى جدة؟",
      timestamp: new Date(Date.now() - 3600000 * 24),
    },
    {
      id: "msg-2",
      senderId: currentUserId,
      senderName: "Driver",
      content: "بالطبع، متى تريد التوصيل؟",
      timestamp: new Date(Date.now() - 3500000 * 24),
    },
    {
      id: "msg-3",
      senderId: recipientId,
      senderName: "Customer",
      content: "يوم الثلاثاء القادم، هل هذا ممكن؟",
      timestamp: new Date(Date.now() - 3400000 * 24),
    },
    {
      id: "msg-4",
      senderId: currentUserId,
      senderName: "Driver",
      content: "نعم، متاح. ما هو حجم الشحنة؟",
      timestamp: new Date(Date.now() - 3300000 * 24),
    }
  ];
};

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
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState<string | null>(null);

  // Load messages (mock or real)
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    } else if (user) {
      // If no messages were provided, use mock data for demo
      const mockMessages = getMockInitialMessages(recipientId, user.id || "unknown");
      setMessages(mockMessages);
    }
  }, [initialMessages, recipientId, user]);

  const handleSendMessage = (content: string) => {
    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || "unknown",
      senderName: user?.name || "Anonymous",
      senderAvatar: user?.profileImage,
      content: content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
  };

  const handleSendQuote = (amount: number) => {
    const quoteText = language === 'en'
      ? `I offer ${amount.toFixed(2)} SAR for this trip.`
      : `أقدم سعراً قدره ${amount.toFixed(2)} ريال لهذه الرحلة.`;

    const message: Message = {
      id: `quote-${Date.now()}`,
      senderId: user?.id || "unknown",
      senderName: user?.name || "Anonymous",
      senderAvatar: user?.profileImage,
      content: quoteText,
      timestamp: new Date(),
      isQuote: true,
      quoteAmount: amount,
    };

    setMessages(prev => [...prev, message]);
    setShowQuoteForm(false);
    
    if (onSendQuote) {
      onSendQuote(amount);
    }
    
    const successMsg = language === 'en'
      ? 'Quote sent successfully'
      : 'تم إرسال العرض بنجاح';
    toast.success(successMsg);
  };

  const handleShowPaymentOptions = (messageId: string) => {
    setShowPaymentOptions(messageId);
  };

  const handlePaymentMethod = (messageId: string, method: 'cash' | 'card') => {
    const paymentMsg = language === 'en'
      ? method === 'cash' ? " (Cash payment selected)" : " (Card payment selected)"
      : method === 'cash' ? " (تم اختيار الدفع نقداً)" : " (تم اختيار الدفع بالبطاقة)";
    
    // Update the message to show it's accepted
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { 
          ...msg, 
          isAccepted: true,
          content: msg.content + paymentMsg
        } : msg
      )
    );
    
    setShowPaymentOptions(null);
    
    if (onAcceptQuote) {
      onAcceptQuote(messageId);
    }
    
    const successMsg = language === 'en'
      ? `Quote accepted with ${method} payment`
      : `تم قبول العرض بالدفع ${method === 'cash' ? 'نقداً' : 'بالبطاقة'}`;
    toast.success(successMsg);
    
    if (method === 'card') {
      // Navigate to payment page or show payment form
      window.location.href = `/invoice-details/${Date.now()}`;
    }
  };

  return (
    <div className="flex flex-col h-full pb-16 md:pb-0"> {/* Added pb-16 to prevent overlap with bottom nav */}
      <ChatHeader 
        recipientName={recipientName}
        recipientAvatar={recipientAvatar}
      />

      <MessageList
        messages={messages}
        currentUserId={user?.id || "unknown"}
        showPaymentOptions={showPaymentOptions}
        onAcceptQuote={handleShowPaymentOptions}
        onPaymentMethodSelect={handlePaymentMethod}
      />

      {showQuoteForm && user?.role === "driver" ? (
        <QuoteForm 
          onSendQuote={handleSendQuote}
          onCancel={() => setShowQuoteForm(false)}
        />
      ) : (
        <MessageInput
          onSendMessage={handleSendMessage}
          onShowQuoteForm={() => setShowQuoteForm(true)}
          showQuoteOption={user?.role === "driver"}
        />
      )}
    </div>
  );
};

export default ChatBox;
