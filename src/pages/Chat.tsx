import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import { MessageSquare, Search } from "lucide-react";
import ChatBox from "@/components/ChatBox";
import { useChatMessages } from '@/components/chat/SaveTrackingMessages';

interface ChatPreview {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

interface ChatDetailProps {
  chatId: string;
  recipientId: string;
}

// Mock data
const MOCK_CHATS: Record<string, ChatPreview[]> = {
  "customer-1": [
    {
      id: "chat-1",
      recipientId: "driver-1",
      recipientName: "John Driver",
      recipientAvatar: "/placeholder.svg",
      lastMessage: "Yes, I can pick up your goods at 3pm",
      timestamp: new Date(),
      unread: true,
    },
    {
      id: "chat-2",
      recipientId: "driver-2",
      recipientName: "Sarah Smith",
      recipientAvatar: "/placeholder.svg",
      lastMessage: "The price would be $120 for that distance",
      timestamp: new Date(Date.now() - 3600000),
      unread: false,
    },
  ],
  "driver-1": [
    {
      id: "chat-1",
      recipientId: "customer-1",
      recipientName: "Customer User",
      lastMessage: "Yes, I can pick up your goods at 3pm",
      timestamp: new Date(),
      unread: true,
    },
    {
      id: "chat-2",
      recipientId: "customer-2",
      recipientName: "Jane Doe",
      lastMessage: "When will you arrive?",
      timestamp: new Date(Date.now() - 3600000),
      unread: false,
    },
  ],
};

// Mock messages for any chat
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

const ChatDetail: React.FC<ChatDetailProps> = ({ chatId, recipientId }) => {
  const { user } = useAuth();
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();
  
  // Generate mock messages based on current user and recipient
  const initialMessages = getMockMessages(user?.id || "unknown", recipientId);

  return (
    <div className="h-full">
      <ChatBox
        chatId={chatId}
        recipientId={recipientId}
        recipientName={recipientId === "customer-1" ? "Customer User" : 
                      recipientId === "customer-2" ? "Jane Doe" : 
                      recipientId === "driver-1" ? "John Driver" : "Sarah Smith"}
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
  const [conversations, setConversations] = useState<ChatPreview[]>([]);
  const { messages: trackedMessages } = useChatMessages();
  
  useEffect(() => {
    // In a real app, fetch chats from API
    if (user) {
      setChats(MOCK_CHATS[user.id] || []);
    }
  }, [user]);

  useEffect(() => {
    // If driverId is provided, find or create a chat for this driver
    if (driverId && user) {
      const existingChat = chats.find(chat => chat.recipientId === driverId);
      if (existingChat) {
        setSelectedChatId(existingChat.id);
        setSelectedRecipientId(driverId);
      } else {
        // In a real app, we'd create a new chat in the database
        const newChatId = `chat-${Date.now()}`;
        setSelectedChatId(newChatId);
        setSelectedRecipientId(driverId);
        
        // Add the new chat to the list
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
      // Find conversations that may already contain tracked messages
      const driverIdsWithTrackingMessages = new Set(
        trackedMessages.map(msg => msg.senderId || msg.receiverId)
      );
      
      // Add tracked messages to existing conversations or create new ones
      driverIdsWithTrackingMessages.forEach(driverId => {
        if (driverId) {
          const existingConversation = conversations.find(
            conv => conv.id === driverId || conv.participantId === driverId
          );
          
          if (existingConversation) {
            // Add messages to existing conversation if not already there
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
            // Create a new conversation for this driver
            const driverMessages = trackedMessages.filter(
              msg => msg.senderId === driverId || msg.receiverId === driverId
            );
            
            if (driverMessages.length > 0) {
              const newConversation = {
                id: `conv-${Date.now()}-${driverId}`,
                participantId: driverId as string,
                participantName: driverMessages[0].senderName || "Driver",
                participantImage: "/placeholder.svg",
                lastMessage: driverMessages[driverMessages.length - 1].text || 
                             driverMessages[driverMessages.length - 1].content || 
                             driverMessages[driverMessages.length - 1].message,
                timestamp: new Date(),
                online: false,
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
    // Update URL to include the recipient ID
    navigate(`/chat/${chat.recipientId}`);
  };

  return (
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
            <div className="p-4 border-b">
              <div className="relative">
                <Input
                  placeholder={chatContent.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length > 0 ? (
                <div className="divide-y">
                  {filteredChats.map((chat) => (
                    <Button
                      key={chat.id}
                      variant="ghost"
                      className={`w-full justify-start rounded-none py-3 px-4 h-auto ${
                        selectedChatId === chat.id
                          ? "bg-moprd-teal/10 border-l-4 border-moprd-teal"
                          : ""
                      }`}
                      onClick={() => handleChatSelect(chat)}
                    >
                      <div className="flex items-center w-full">
                        <div className="relative">
                          <img
                            src={chat.recipientAvatar || "/placeholder.svg"}
                            alt={chat.recipientName}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          {chat.unread && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-moprd-teal rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex justify-between">
                            <span className="font-medium">{chat.recipientName}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(chat.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {chat.lastMessage}
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">{chatContent.noConversations}</h3>
                  <p className="text-gray-500">
                    {user?.role === "customer"
                      ? chatContent.findTrucksPrompt
                      : chatContent.waitCustomers}
                  </p>
                  {user?.role === "customer" && (
                    <Button 
                      className="mt-4 bg-moprd-teal hover:bg-moprd-blue"
                      onClick={() => navigate("/find-trucks")}
                    >
                      {chatContent.title}
                    </Button>
                  )}
                </div>
              )}
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
  );
};

export default Chat;
