
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import ChatList from "@/components/chat/ChatList";
import ChatSearch from "@/components/chat/ChatSearch";
import ChatDetail from "@/components/chat/ChatDetail";
import { useChatMessages } from '@/components/chat/SaveTrackingMessages';
import Layout from "@/components/Layout";
import { ChatPreview } from "@/types/chat";
import { MOCK_CHATS } from "@/utils/mockChats";

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
          <p className="text-gray-600">{chatContent.subtitle}</p>
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
                  <p className="text-gray-500">{chatContent.selectPrompt}</p>
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
