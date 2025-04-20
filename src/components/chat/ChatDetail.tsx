
import React from 'react';
import { ChatBox } from '@/components/ChatBox';
import { ChatDetailProps } from '@/types/chat';

const ChatDetail: React.FC<ChatDetailProps> = ({ chatId, recipientId }) => {
  const getRecipientName = (id: string) => {
    if (id === "customer-1") return "Customer User";
    if (id === "customer-2") return "Jane Doe";
    if (id === "driver-1") return "John Driver";
    return "Sarah Smith";
  };

  const recipientName = getRecipientName(recipientId);
  const initialMessages = getMockMessages(user?.id || "unknown", recipientId);

  return (
    <div className="h-full">
      <ChatBox
        chatId={chatId}
        recipientId={recipientId}
        recipientName={recipientName}
        recipientAvatar="/placeholder.svg"
        initialMessages={initialMessages}
      />
    </div>
  );
};

export default ChatDetail;
