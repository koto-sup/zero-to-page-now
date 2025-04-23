
import React from 'react';
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDistanceToNow } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { Trash2 } from "lucide-react";

interface ChatPreview {
  id: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  onDelete?: (e: React.MouseEvent) => void;
}

interface ChatSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredChats: ChatPreview[];
  selectedChatId: string | null;
  onChatSelect: (chat: any) => void;
}

const ChatSearchBar = ({
  searchQuery,
  onSearchChange,
  filteredChats,
  selectedChatId,
  onChatSelect
}: ChatSearchBarProps) => {
  const { language } = useLanguage();
  
  const formatTimestamp = (timestamp: Date) => {
    return formatDistanceToNow(new Date(timestamp), { 
      addSuffix: true,
      locale: language === 'ar' ? arSA : undefined 
    });
  };
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b">
        <Input
          type="text"
          placeholder={language === 'en' ? "Search conversations..." : "البحث في المحادثات..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          <div>
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChatId === chat.id ? "bg-blue-50" : ""
                }`}
                onClick={() => onChatSelect(chat)}
              >
                <div className="relative mr-3">
                  <img
                    src={chat.recipientAvatar || "/placeholder.svg"}
                    alt={chat.recipientName}
                    className="w-12 h-12 rounded-full"
                  />
                  {chat.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{chat.recipientName}</h3>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(new Date(chat.timestamp))}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.onDelete && (
                  <button 
                    onClick={chat.onDelete}
                    className="ml-2 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
            <p>
              {language === 'en' 
                ? "No conversations found" 
                : "لم يتم العثور على محادثات"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSearchBar;
