
export const getMockMessages = (senderId: string, recipientId: string) => [
  {
    id: "msg-1",
    senderId: recipientId,
    senderName: "Recipient",
    content: "Hello, I need transportation services.",
    timestamp: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "msg-2",
    senderId: senderId,
    senderName: "Sender",
    content: "Hi there! I can help with that. What do you need?",
    timestamp: new Date(Date.now() - 3600000 * 1.5),
  },
  {
    id: "msg-3",
    senderId: recipientId,
    senderName: "Recipient",
    content: "I need to transport goods from Location A to Location B.",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "msg-4",
    senderId: senderId,
    senderName: "Sender",
    content: "I can do that. When do you need this service?",
    timestamp: new Date(Date.now() - 3600000 * 0.5),
  },
];
