
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  recipientName: string;
  recipientAvatar?: string;
  onlineStatus?: "online" | "offline" | "away";
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  recipientName, 
  recipientAvatar,
  onlineStatus = "online"
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center p-3 border-b bg-white">
      <button 
        onClick={() => navigate(-1)} 
        className="mr-2 p-2 rounded-full hover:bg-gray-100"
        aria-label="العودة"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      
      <Avatar className="h-10 w-10 ml-3">
        <img src={recipientAvatar || "/placeholder.svg"} alt={recipientName} />
      </Avatar>
      
      <div className="mr-2">
        <h3 className="font-medium">{recipientName}</h3>
        <div className="flex items-center text-xs">
          {onlineStatus === "online" && (
            <>
              <span className="h-2 w-2 bg-green-500 rounded-full ml-1"></span>
              <span className="text-muted-foreground">متصل</span>
            </>
          )}
          {onlineStatus === "offline" && (
            <span className="text-muted-foreground">غير متصل</span>
          )}
          {onlineStatus === "away" && (
            <>
              <span className="h-2 w-2 bg-yellow-500 rounded-full ml-1"></span>
              <span className="text-muted-foreground">بعيد</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
