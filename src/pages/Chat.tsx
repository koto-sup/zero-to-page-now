
import React, { useState, useEffect, useRef } from "react";
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
import { Trash2, MessageSquare, ArrowLeft, Share2, MapPin, Phone, Image, Send } from "lucide-react";
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
  const [showChatList, setShowChatList] = useState(true);
  const chatDetailRef = useRef<HTMLDivElement>(null);

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
      
      // Add customer service chat if it doesn't exist
      const hasCustomerService = userChats.some(c => c.recipientId === 'customer-service');
      if (!hasCustomerService) {
        userChats.push({
          id: 'chat-customer-service',
          recipientId: 'customer-service',
          recipientName: language === 'en' ? 'Customer Support' : 'خدمة العملاء',
          recipientAvatar: "/lovable-uploads/f066d5bd-c116-472c-9f62-b548da60b0d2.png",
          lastMessage: language === 'en' ? 'How can we help you?' : 'كيف يمكننا مساعدتك؟',
          timestamp: new Date(),
          unread: false,
        });
      }
      
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
  }, [user, storedMessages, language]);

  useEffect(() => {
    if (driverId && user) {
      // Hide chat list on mobile when a specific chat is opened
      setShowChatList(window.innerWidth >= 768);
      
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
    // Hide chat list on mobile
    if (window.innerWidth < 768) {
      setShowChatList(false);
    }
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
        // Show chat list on mobile
        setShowChatList(true);
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

  const handleBackToList = () => {
    setShowChatList(true);
    navigate('/chat');
    setSelectedChatId(null);
    setSelectedRecipientId(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-24 max-w-full overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">{chatContent.title}</h1>
          <p className="text-gray-600 dark:text-gray-300">{chatContent.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[70vh]">
          {(showChatList || window.innerWidth >= 768) && (
            <div className="md:col-span-1 md:block">
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
          )}

          <div className={`${showChatList && window.innerWidth < 768 ? 'hidden' : 'block'} md:col-span-2`}>
            {selectedChatId && selectedRecipientId ? (
              <div ref={chatDetailRef} className="relative h-full">
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 flex items-center border-b">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleBackToList}
                    className="md:hidden mr-2 dark:text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex-1">
                    {chats.find(c => c.id === selectedChatId)?.recipientName || "Chat"}
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="dark:text-white">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="dark:text-white">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <ChatDetail 
                  chatId={selectedChatId} 
                  recipientId={selectedRecipientId}
                  onSaveMessages={(conversation) => handleSaveMessages(selectedChatId, conversation)}
                  savedMessages={storedMessages[selectedChatId]?.messages || []}
                />
                
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-3 border-t flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="dark:text-white">
                    <MapPin className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="dark:text-white">
                    <Image className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder={language === 'en' ? "Type a message..." : "اكتب رسالة..."}
                      className="w-full border rounded-full px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </div>
                  <Button size="icon" className="rounded-full bg-moprd-teal hover:bg-moprd-blue dark:bg-accent">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <ChatWelcome />
            )}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="dark:bg-gray-800 dark:text-white">
            <DialogHeader>
              <DialogTitle>
                {language === 'en' ? "Delete Conversation" : "حذف المحادثة"}
              </DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                {language === 'en' 
                  ? "Are you sure you want to delete this conversation? This action cannot be undone."
                  : "هل أنت متأكد أنك تريد حذف هذه المحادثة؟ لا يمكن التراجع عن هذا الإجراء."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteDialogOpen(false)}
                className="dark:text-white dark:border-gray-600"
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
