
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Search } from "lucide-react";
import ChatBox from "@/components/ChatBox";

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
  driverId: string;
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
  ],
};

const ChatDetail: React.FC<ChatDetailProps> = ({ chatId, driverId }) => {
  // In a real app, we'd fetch messages from API
  const initialMessages = [
    {
      id: "msg-1",
      senderId: "customer-1",
      senderName: "Customer User",
      content: "Hello, I need to transport frozen goods from New York to Boston.",
      timestamp: new Date(Date.now() - 3600000 * 2),
    },
    {
      id: "msg-2",
      senderId: "driver-1",
      senderName: "John Driver",
      senderAvatar: "/placeholder.svg",
      content: "Hi there! I can help with that. When do you need this done?",
      timestamp: new Date(Date.now() - 3600000 * 1.5),
    },
    {
      id: "msg-3",
      senderId: "customer-1",
      senderName: "Customer User",
      content: "This Friday, around noon. The goods need to maintain -5°C.",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "msg-4",
      senderId: "driver-1",
      senderName: "John Driver",
      senderAvatar: "/placeholder.svg",
      content: "That works for me. My truck can maintain that temperature without issues.",
      timestamp: new Date(Date.now() - 3600000 * 0.5),
    },
  ];

  return (
    <div className="h-full">
      <ChatBox
        chatId={chatId}
        recipientId={driverId}
        recipientName="John Driver"
        recipientAvatar="/placeholder.svg"
        initialMessages={initialMessages}
      />
    </div>
  );
};

const Chat = () => {
  const { user } = useAuth();
  const { driverId } = useParams<{ driverId?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

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
      } else {
        // In a real app, we'd create a new chat in the database
        const newChatId = `chat-${Date.now()}`;
        setSelectedChatId(newChatId);
      }
    }
  }, [driverId, user, chats]);

  const filteredChats = chats.filter((chat) =>
    chat.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600">
          Chat with truck drivers or customers about your transportation needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[70vh]">
        <div className="md:col-span-1">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Input
                  placeholder="Search conversations"
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
                      onClick={() => setSelectedChatId(chat.id)}
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
                  <h3 className="text-xl font-medium mb-2">No conversations yet</h3>
                  <p className="text-gray-500">
                    {user?.role === "customer"
                      ? "Find a truck and request a quote to start chatting"
                      : "Wait for customer requests or search for potential jobs"}
                  </p>
                  {user?.role === "customer" && (
                    <Button 
                      className="mt-4 bg-moprd-teal hover:bg-moprd-blue"
                      onClick={() => {/* Navigate to find trucks */}}
                    >
                      Find Trucks
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full overflow-hidden">
            {selectedChatId ? (
              <ChatDetail 
                chatId={selectedChatId} 
                driverId={driverId || filteredChats.find(c => c.id === selectedChatId)?.recipientId || ""}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-medium mb-2">Select a conversation</h3>
                <p className="text-gray-500">
                  Choose a conversation from the list to start chatting
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
