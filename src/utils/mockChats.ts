
import { ChatPreview } from '@/types/chat';

export const MOCK_CHATS: { [key: string]: ChatPreview[] } = {
  "customer-1": [
    {
      id: "chat-1",
      recipientId: "driver-1",
      recipientName: "John Driver",
      recipientAvatar: "/placeholder.svg",
      lastMessage: "I can help you transport your goods.",
      timestamp: new Date(),
      unread: false
    }
  ],
  "driver-1": [
    {
      id: "chat-2",
      recipientId: "customer-1",
      recipientName: "Customer User",
      recipientAvatar: "/placeholder.svg",
      lastMessage: "I need transportation services.",
      timestamp: new Date(),
      unread: true
    }
  ],
  "customer-2": [
    {
      id: "chat-3",
      recipientId: "driver-2",
      recipientName: "Sarah Smith",
      recipientAvatar: "/placeholder.svg",
      lastMessage: "What's your availability?",
      timestamp: new Date(),
      unread: false
    }
  ]
};
