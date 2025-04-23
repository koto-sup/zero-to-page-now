
import React from 'react';
import ChatBox from '@/components/ChatBox';
import { useAuth } from '@/contexts/AuthContext';
import { ChatDetailProps, ChatMessage } from '@/types/chat';
import { getMockMessages } from '@/utils/mockMessages';

// Make sure our initialMessages are compatible with what ChatBox expects
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
}

const ChatDetail: React.FC<ChatDetailProps & {
  onSaveMessages?: (conversation: any) => void;
  savedMessages?: ChatMessage[];
}> = ({ 
  chatId, 
  recipientId, 
  onSaveMessages,
  savedMessages = [] 
}) => {
  const { user } = useAuth();
  
  const getRecipientName = (id: string) => {
    if (id === "customer-1") return "Customer User";
    if (id === "customer-2") return "Jane Doe";
    if (id === "driver-1") return "John Driver";
    if (id === "driver-2") return "Ahmed Driver";
    return "Sarah Smith";
  };

  const recipientName = getRecipientName(recipientId);
  
  // Ensure all messages have the required senderName property
  const initialMessages: Message[] = savedMessages.length > 0 
    ? savedMessages.map(msg => ({
        ...msg,
        senderName: msg.senderName || (msg.senderId === user?.id ? "Me" : getRecipientName(msg.senderId))
      }))
    : getMockMessages(user?.id || "unknown", recipientId);

  return (
    <div className="h-full flex flex-col">
      <ChatBox
        chatId={chatId}
        recipientId={recipientId}
        recipientName={recipientName}
        recipientAvatar="/placeholder.svg"
        initialMessages={initialMessages}
        onSaveMessages={onSaveMessages}
      />
    </div>
  );
};

export default ChatDetail;
