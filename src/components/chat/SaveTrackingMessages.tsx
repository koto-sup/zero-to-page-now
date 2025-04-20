
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

// This is a context to store chat messages across pages
const ChatMessagesContext = React.createContext<{
  messages: any[];
  addMessages: (messages: any[]) => void;
}>({
  messages: [],
  addMessages: () => {},
});

export const useChatMessages = () => useContext(ChatMessagesContext);

export const ChatMessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = React.useState<any[]>([]);

  const addMessages = (newMessages: any[]) => {
    setMessages((prevMessages) => {
      // Combine messages, avoid duplicates by checking IDs
      const existingIds = new Set(prevMessages.map(msg => msg.id));
      const uniqueNewMessages = newMessages.filter(msg => !existingIds.has(msg.id));
      return [...prevMessages, ...uniqueNewMessages];
    });
  };

  // Persist messages in localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Load messages from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('chat_messages');
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Error parsing stored messages', error);
      }
    }
  }, []);

  return (
    <ChatMessagesContext.Provider value={{ messages, addMessages }}>
      {children}
    </ChatMessagesContext.Provider>
  );
};

// Component that saves tracking page messages to the chat context
const SaveTrackingMessages: React.FC<{ messages: any[] }> = ({ messages }) => {
  const { addMessages } = useChatMessages();
  const location = useLocation();
  
  // Check if we're on a tracking page
  const isTrackingPage = location.pathname.includes('/truck-tracking/');
  
  useEffect(() => {
    if (isTrackingPage && messages && messages.length > 0) {
      // Add tracking page messages to the chat context
      addMessages(messages);
    }
  }, [messages, isTrackingPage, addMessages]);
  
  return null; // This component doesn't render anything
};

export default SaveTrackingMessages;
