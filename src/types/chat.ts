
export interface ChatPreview {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

export interface TrackedConversation extends ChatPreview {
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: string;
}

export interface ChatDetailProps {
  chatId: string;
  recipientId: string;
}

export interface ChatBoxProps {
  chatId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  initialMessages: {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: Date;
  }[];
}
