
import React, { useState } from "react";
import { Send, PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onShowQuoteForm: () => void;
  showQuoteOption: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onShowQuoteForm, 
  showQuoteOption 
}) => {
  const [newMessage, setNewMessage] = useState("");
  const { language } = useLanguage();
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="border-t p-3 bg-white dark:bg-gray-900 z-10">
      <div className="flex items-center">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={chatContent.messageInput}
          className="flex-1 resize-none bg-white border border-gray-300 text-black dark:bg-gray-800 dark:text-white"
          rows={1}
        />
        <div className="mr-3 flex">
          {showQuoteOption && (
            <Button
              variant="outline"
              size="icon"
              onClick={onShowQuoteForm}
              className="ml-2"
              title="إرسال عرض سعر"
            >
              <span className="text-lg font-bold">ريال</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="ml-2"
          >
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-moprd-teal hover:bg-moprd-blue"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
