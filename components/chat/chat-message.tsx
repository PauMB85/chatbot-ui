interface Message {
  
}

interface ChatMessageProps {
  role: string;
  children: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, children }) => {
  const chatClass = role === 'user' ? 'chat-end' : 'chat-start';
  const bubbleClass = role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary';

  return (
    <div className={`chat ${chatClass}`}>
      <div className={`chat-bubble ${bubbleClass}`}>
        {children}
      </div>
    </div>
  );
};

export default ChatMessage;
