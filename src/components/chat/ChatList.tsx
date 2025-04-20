
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";

interface ChatListProps {
  chats: any[];
  selectedChatId: string | null;
  onChatSelect: (chat: any) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onChatSelect }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();

  if (chats.length === 0) {
    return (
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
    );
  }

  return (
    <div className="divide-y">
      {chats.map((chat) => (
        <Button
          key={chat.id}
          variant="ghost"
          className={`w-full justify-start rounded-none py-3 px-4 h-auto ${
            selectedChatId === chat.id
              ? "bg-moprd-teal/10 border-l-4 border-moprd-teal"
              : ""
          }`}
          onClick={() => onChatSelect(chat)}
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
  );
};

export default ChatList;
