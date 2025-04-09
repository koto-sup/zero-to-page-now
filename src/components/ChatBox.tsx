
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ChatHeader from "./chat/ChatHeader";
import MessageList from "./chat/MessageList";
import MessageInput from "./chat/MessageInput";
import QuoteForm from "./chat/QuoteForm";

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
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState<string | null>(null);

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
    const message: Message = {
      id: `quote-${Date.now()}`,
      senderId: user?.id || "unknown",
      senderName: user?.name || "Anonymous",
      senderAvatar: user?.profileImage,
      content: `أقدم سعراً قدره ${amount.toFixed(2)} ريال لهذه الرحلة.`,
      timestamp: new Date(),
      isQuote: true,
      quoteAmount: amount,
    };

    setMessages(prev => [...prev, message]);
    setShowQuoteForm(false);
    
    if (onSendQuote) {
      onSendQuote(amount);
    }
  };

  const handleShowPaymentOptions = (messageId: string) => {
    setShowPaymentOptions(messageId);
  };

  const handlePaymentMethod = (messageId: string, method: 'cash' | 'card') => {
    // Update the message to show it's accepted
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { 
          ...msg, 
          isAccepted: true,
          content: method === 'cash' ? 
            msg.content + " (تم اختيار الدفع نقداً)" : 
            msg.content + " (تم اختيار الدفع بالبطاقة)" 
        } : msg
      )
    );
    
    setShowPaymentOptions(null);
    
    if (onAcceptQuote) {
      onAcceptQuote(messageId);
    }
    
    if (method === 'card') {
      // Navigate to payment page or show payment form
      window.location.href = `/invoice-details/${Date.now()}`;
    }
  };

  return (
    <div className="flex flex-col h-full">
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
