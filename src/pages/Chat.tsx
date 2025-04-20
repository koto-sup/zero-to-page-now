
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import Layout from "@/components/Layout";
import { ChatPreview } from "@/types/chat";
import { MOCK_CHATS } from "@/utils/mockChats";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatWelcome from "@/components/chat/ChatWelcome";
import ChatDetail from "@/components/chat/ChatDetail";

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
            <ChatSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredChats={filteredChats}
              selectedChatId={selectedChatId}
              onChatSelect={handleChatSelect}
            />
          </div>

          <div className="md:col-span-2">
            {selectedChatId && selectedRecipientId ? (
              <ChatDetail 
                chatId={selectedChatId} 
                recipientId={selectedRecipientId}
              />
            ) : (
              <ChatWelcome />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
