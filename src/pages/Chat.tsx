import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import ChatBox from "@/components/ChatBox";
import ChatList from "@/components/chat/ChatList";
import ChatSearch from "@/components/chat/ChatSearch";
import { useChatMessages } from '@/components/chat/SaveTrackingMessages';
import Layout from "@/components/Layout";

interface ChatPreview {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

interface TrackedConversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  messages: { id: string; text: string; timestamp: Date; sender: string; }[];
}

const MOCK_CHATS: { [key: string]: ChatPreview[] } = {
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

const getMockMessages = (senderId: string, recipientId: string) => [
  {
    id: "msg-1",
    senderId: recipientId,
    senderName: "Recipient",
    content: "Hello, I need transportation services.",
    timestamp: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "msg-2",
    senderId: senderId,
    senderName: "Sender",
    content: "Hi there! I can help with that. What do you need?",
    timestamp: new Date(Date.now() - 3600000 * 1.5),
  },
  {
    id: "msg-3",
    senderId: recipientId,
    senderName: "Recipient",
    content: "I need to transport goods from Location A to Location B.",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "msg-4",
    senderId: senderId,
    senderName: "Sender",
    content: "I can do that. When do you need this service?",
    timestamp: new Date(Date.now() - 3600000 * 0.5),
  },
];

const ChatDetail: React.FC<{ chatId: string; recipientId: string }> = ({ chatId, recipientId }) => {
  const { user } = useAuth();
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();
  
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

const Chat = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();
  const { driverId } = useParams<{ driverId?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<TrackedConversation[]>([]);
  const { messages: trackedMessages } = useChatMessages();

  useEffect(() => {
    if (user) {
      setChats(MOCK_CHATS[user.id] || []);
    }
  }, [user]);

  useEffect(() => {
    if (driverId && user) {
      const existingChat = chats.find(chat => chat.recipientId === driverId);
      if (existingChat) {
        setSelectedChatId(existingChat.id);
        setSelectedRecipientId(driverId);
      } else {
        const newChatId = `chat-${Date.now()}`;
        setSelectedChatId(newChatId);
        setSelectedRecipientId(driverId);
        
        const newChat: ChatPreview = {
          id: newChatId,
          recipientId: driverId,
          recipientName: driverId.includes("customer") ? "Customer User" : "John Driver",
          recipientAvatar: "/placeholder.svg",
          lastMessage: "New conversation",
          timestamp: new Date(),
          unread: false
        };
        
        setChats([newChat, ...chats]);
      }
    }
  }, [driverId, user, chats]);

  useEffect(() => {
    if (trackedMessages && trackedMessages.length > 0) {
      const driverIdsWithTrackingMessages = new Set(
        trackedMessages.map(msg => msg.senderId || msg.receiverId)
      );
      
      driverIdsWithTrackingMessages.forEach(driverId => {
        if (driverId) {
          const existingConversation = conversations.find(
            conv => conv.id === driverId || conv.recipientId === driverId
          );
          
          if (existingConversation) {
            const existingMessageIds = new Set(
              existingConversation.messages.map(msg => msg.id)
            );
            
            const newMessages = trackedMessages
              .filter(msg => 
                (msg.senderId === driverId || msg.receiverId === driverId) &&
                !existingMessageIds.has(msg.id)
              )
              .map(msg => ({
                id: msg.id,
                text: msg.text || msg.content || msg.message,
                timestamp: msg.timestamp || new Date(),
                sender: msg.sender || (msg.senderId === user?.id ? 'user' : 'other'),
              }));
              
            if (newMessages.length > 0) {
              existingConversation.messages = [
                ...existingConversation.messages,
                ...newMessages
              ];
            }
          } else {
            const driverMessages = trackedMessages.filter(
              msg => msg.senderId === driverId || msg.receiverId === driverId
            );
            
            if (driverMessages.length > 0) {
              const newConversation: TrackedConversation = {
                id: `conv-${Date.now()}-${driverId}`,
                recipientId: driverId as string,
                recipientName: driverMessages[0].senderName || "Driver",
                recipientAvatar: "/placeholder.svg",
                lastMessage: driverMessages[driverMessages.length - 1].text || 
                             driverMessages[driverMessages.length - 1].content || 
                             driverMessages[driverMessages.length - 1].message,
                timestamp: new Date(),
                unread: true,
                messages: driverMessages.map(msg => ({
                  id: msg.id,
                  text: msg.text || msg.content || msg.message,
                  timestamp: msg.timestamp || new Date(),
                  sender: msg.sender || (msg.senderId === user?.id ? 'user' : 'other'),
                }))
              };
              
              setConversations(prev => [...prev, newConversation]);
            }
          }
        }
      });
    }
  }, [trackedMessages, conversations, user?.id]);

  const filteredChats = chats.filter((chat) =>
    chat.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSelect = (chat: ChatPreview) => {
    setSelectedChatId(chat.id);
    setSelectedRecipientId(chat.recipientId);
    navigate(`/chat/${chat.recipientId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{chatContent.title}</h1>
          <p className="text-gray-600">
            {chatContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[70vh]">
          <div className="md:col-span-1">
            <Card className="h-full flex flex-col">
              <ChatSearch 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <div className="flex-1 overflow-y-auto">
                <ChatList
                  chats={filteredChats}
                  selectedChatId={selectedChatId}
                  onChatSelect={handleChatSelect}
                />
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="h-full overflow-hidden">
              {selectedChatId && selectedRecipientId ? (
                <ChatDetail 
                  chatId={selectedChatId} 
                  recipientId={selectedRecipientId}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-2xl font-medium mb-2">{chatContent.selectConversation}</h3>
                  <p className="text-gray-500">
                    {chatContent.selectPrompt}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
