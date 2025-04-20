
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguageContent } from "@/hooks/useLanguageContent";

interface ChatSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ChatSearch: React.FC<ChatSearchProps> = ({ searchQuery, onSearchChange }) => {
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();

  return (
    <div className="p-4 border-b">
      <div className="relative">
        <Input
          placeholder={chatContent.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default ChatSearch;
