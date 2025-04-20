
import React from 'react';
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useLanguageContent } from "@/hooks/useLanguageContent";

const ChatWelcome: React.FC = () => {
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();

  return (
    <Card className="h-full overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-2xl font-medium mb-2">{chatContent.selectConversation}</h3>
        <p className="text-gray-500">{chatContent.selectPrompt}</p>
      </div>
    </Card>
  );
};

export default ChatWelcome;
