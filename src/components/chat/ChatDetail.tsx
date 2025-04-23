
import React from 'react';
import ChatBox from '@/components/ChatBox';
import { useAuth } from '@/contexts/AuthContext';
import { ChatDetailProps, ChatMessage } from '@/types/chat';
import { getMockMessages } from '@/utils/mockMessages';

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
  
  // Use saved messages if available, otherwise use mock messages
  const initialMessages = savedMessages.length > 0 
    ? savedMessages 
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
