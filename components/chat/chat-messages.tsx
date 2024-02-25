import Message from "@/domain/message";
import { FC, useEffect, useRef } from "react";
import ChatLoader from "./chat-loader";
import ChatMessage from "./chat-message";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
} 

const ChatMessages: FC<ChatMessagesProps> = ({messages, isLoading}) => {

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col justify-end h-full">
      <div className="overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage role={message.role}>{message.content}</ChatMessage>
          </div>
        ))}
        {isLoading && <ChatLoader />}
        <div ref={divRef}></div>
      </div>
    </div>
  )
}

export default ChatMessages;