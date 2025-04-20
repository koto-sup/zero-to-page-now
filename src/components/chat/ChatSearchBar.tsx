
import React from 'react';
import { Card } from "@/components/ui/card";
import ChatSearch from '@/components/chat/ChatSearch';
import ChatList from '@/components/chat/ChatList';
import { ChatPreview } from '@/types/chat';

interface ChatSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredChats: ChatPreview[];
  selectedChatId: string | null;
  onChatSelect: (chat: ChatPreview) => void;
}

const ChatSearchBar: React.FC<ChatSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  filteredChats,
  selectedChatId,
  onChatSelect,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <ChatSearch 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
      <div className="flex-1 overflow-y-auto">
        <ChatList
          chats={filteredChats}
          selectedChatId={selectedChatId}
          onChatSelect={onChatSelect}
        />
      </div>
    </Card>
  );
};

export default ChatSearchBar;
