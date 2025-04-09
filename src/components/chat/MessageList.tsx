
import React, { useRef, useEffect } from "react";
import Message from "./Message";

interface MessageData {
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

interface MessageListProps {
  messages: MessageData[];
  currentUserId: string;
  showPaymentOptions: string | null;
  onAcceptQuote: (messageId: string) => void;
  onPaymentMethodSelect: (messageId: string, method: 'cash' | 'card') => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  showPaymentOptions,
  onAcceptQuote,
  onPaymentMethodSelect,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          senderId={message.senderId}
          senderName={message.senderName}
          senderAvatar={message.senderAvatar}
          content={message.content}
          timestamp={message.timestamp}
          isQuote={message.isQuote}
          quoteAmount={message.quoteAmount}
          isAccepted={message.isAccepted}
          isOwnMessage={message.senderId === currentUserId}
          currentUserId={currentUserId}
          showPaymentOptions={showPaymentOptions}
          onAcceptQuote={onAcceptQuote}
          onPaymentMethodSelect={onPaymentMethodSelect}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
