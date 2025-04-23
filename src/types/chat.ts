
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
  text?: string;
  content?: string;
  timestamp: Date;
  sender?: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  isQuote?: boolean;
  quoteAmount?: number;
  isAccepted?: boolean;
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
    senderAvatar?: string;
    content: string;
    timestamp: Date;
  }[];
}
