
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import Layout from "@/components/Layout";
import { ChatPreview, TrackedConversation } from "@/types/chat";
import { MOCK_CHATS } from "@/utils/mockChats";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatWelcome from "@/components/chat/ChatWelcome";
import ChatDetail from "@/components/chat/ChatDetail";
import { toast } from "sonner";
import { Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

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
  const [storedMessages, setStoredMessages] = useState<{[key: string]: TrackedConversation}>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  // Load saved conversations from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem('savedConversations');
    if (savedConversations) {
      setStoredMessages(JSON.parse(savedConversations));
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(storedMessages).length > 0) {
      localStorage.setItem('savedConversations', JSON.stringify(storedMessages));
    }
  }, [storedMessages]);

  useEffect(() => {
    if (user) {
      // Load chats from saved conversations if available
      let userChats = [...MOCK_CHATS[user.id] || []];
      
      // Add stored conversations that aren't already in the mock chats
      Object.values(storedMessages).forEach(conversation => {
        const existingChatIndex = userChats.findIndex(c => c.recipientId === conversation.recipientId);
        
        if (existingChatIndex === -1) {
          userChats.push({
            id: conversation.id,
            recipientId: conversation.recipientId,
            recipientName: conversation.recipientName,
            recipientAvatar: conversation.recipientAvatar,
            lastMessage: conversation.lastMessage,
            timestamp: new Date(conversation.timestamp),
            unread: conversation.unread,
          });
        }
      });
      
      // Sort chats by timestamp (newest first)
      userChats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setChats(userChats);
    }
  }, [user, storedMessages]);

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

  const handleDeleteChat = (chatId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setChatToDelete(chatId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteChat = () => {
    if (chatToDelete) {
      // Remove from chats list
      const updatedChats = chats.filter(chat => chat.id !== chatToDelete);
      setChats(updatedChats);
      
      // Remove from stored messages
      const updatedStoredMessages = {...storedMessages};
      delete updatedStoredMessages[chatToDelete];
      setStoredMessages(updatedStoredMessages);
      
      // If the deleted chat was selected, clear selection
      if (selectedChatId === chatToDelete) {
        setSelectedChatId(null);
        setSelectedRecipientId(null);
        navigate('/chat');
      }
      
      toast.success(language === 'en' ? "Conversation deleted" : "تم حذف المحادثة");
      setDeleteDialogOpen(false);
      setChatToDelete(null);
    }
  };

  const handleSaveMessages = (chatId: string, conversation: TrackedConversation) => {
    setStoredMessages(prev => ({
      ...prev,
      [chatId]: conversation
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{chatContent.title}</h1>
          <p className="text-gray-600">{chatContent.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[70vh]">
          <div className="md:col-span-1">
            <ChatSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredChats={filteredChats.map(chat => ({
                ...chat,
                onDelete: (e) => handleDeleteChat(chat.id, e)
              }))}
              selectedChatId={selectedChatId}
              onChatSelect={handleChatSelect}
            />
          </div>

          <div className="md:col-span-2">
            {selectedChatId && selectedRecipientId ? (
              <ChatDetail 
                chatId={selectedChatId} 
                recipientId={selectedRecipientId}
                onSaveMessages={(conversation) => handleSaveMessages(selectedChatId, conversation)}
                savedMessages={storedMessages[selectedChatId]?.messages || []}
              />
            ) : (
              <ChatWelcome />
            )}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === 'en' ? "Delete Conversation" : "حذف المحادثة"}
              </DialogTitle>
              <DialogDescription>
                {language === 'en' 
                  ? "Are you sure you want to delete this conversation? This action cannot be undone."
                  : "هل أنت متأكد أنك تريد حذف هذه المحادثة؟ لا يمكن التراجع عن هذا الإجراء."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteDialogOpen(false)}
              >
                {language === 'en' ? "Cancel" : "إلغاء"}
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteChat}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {language === 'en' ? "Delete" : "حذف"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Chat;
