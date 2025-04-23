
import React, { useState } from "react";
import { Send, PaperclipIcon, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageContent } from "@/hooks/useLanguageContent";
import { toast } from "sonner";

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
  const [isRecording, setIsRecording] = useState(false);
  const { language } = useLanguage();
  const { getChatContent } = useLanguageContent();
  const chatContent = getChatContent();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage.trim());
    setNewMessage("");
  };

  const handleVoiceMessage = () => {
    if (isRecording) {
      setIsRecording(false);
      // Here we would normally process the recording
      toast.success(language === 'en' ? "Voice message sent!" : "تم إرسال الرسالة الصوتية!", {
        position: "top-right"
      });
    } else {
      setIsRecording(true);
      toast.info(language === 'en' ? "Recording started..." : "بدأ التسجيل...", {
        position: "top-right"
      });
      // Here we would normally start recording
      // Simulate ending the recording after 3 seconds
      setTimeout(() => {
        if (isRecording) {
          setIsRecording(false);
          toast.success(language === 'en' ? "Voice message sent!" : "تم إرسال الرسالة الصوتية!", {
            position: "top-right"
          });
        }
      }, 3000);
    }
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
            variant="outline"
            size="icon"
            className={`ml-2 ${isRecording ? 'bg-red-100 text-red-600 border-red-400' : ''}`}
            onClick={handleVoiceMessage}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="ml-2 bg-moprd-teal hover:bg-moprd-blue"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
