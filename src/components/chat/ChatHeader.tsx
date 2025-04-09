
import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface ChatHeaderProps {
  recipientName: string;
  recipientAvatar?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ recipientName, recipientAvatar }) => {
  return (
    <div className="flex items-center p-3 border-b">
      <Avatar className="h-10 w-10 ml-3">
        <img src={recipientAvatar || "/placeholder.svg"} alt={recipientName} />
      </Avatar>
      <div>
        <h3 className="font-medium">{recipientName}</h3>
        <span className="text-xs text-muted-foreground">متصل</span>
      </div>
    </div>
  );
};

export default ChatHeader;
