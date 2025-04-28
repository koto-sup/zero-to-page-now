
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [initialScrollDone, setInitialScrollDone] = React.useState(false);

  // Scroll to bottom on initial load and when new messages are added
  useEffect(() => {
    if (!initialScrollDone && messages.length > 0) {
      scrollToBottom();
      setInitialScrollDone(true);
    } else if (initialScrollDone) {
      // Only auto-scroll for new messages if we're already near the bottom
      const container = messagesContainerRef.current;
      if (container) {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        if (isNearBottom) {
          scrollToBottom();
        }
      }
    }
  }, [messages, initialScrollDone]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4 dark:bg-gray-800">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">لا توجد رسائل بعد</p>
          <p className="text-sm text-muted-foreground">ابدأ محادثة جديدة الآن</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800"
    >
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
