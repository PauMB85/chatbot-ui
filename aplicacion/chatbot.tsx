import ChatInput from "@/components/chat/chat-input";
import ChatLoader from "@/components/chat/chat-loader";
import ChatMessage from "@/components/chat/chat-message";
import ToastError from "@/components/toast/toast-error";
import Message from "@/domain/message";
import ChatApiFetch from "@/infraestructura/adapters/chat-api-fetch";
import PersistLocalStorageMessage from "@/infraestructura/adapters/persist-localstorage";
import PersistOnClientMessage from "@/infraestructura/ports/persist-on-client-message";
import { FC, useEffect, useRef, useState } from "react";

const Chatbot: FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const chatApi = new ChatApiFetch();
  const persistOnClientMessage: PersistOnClientMessage = new PersistLocalStorageMessage();

  useEffect(() => {
    const storedMessages = persistOnClientMessage.loadMessages();
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCallApi = async (content: string) => {
    setIsLoading(true);
    setHasError(false);
    const msgUser = { role: 'user', content };
    setMessages((prevMessages) => [...prevMessages, msgUser]);

    try {
      const newMessage =  [...messages, msgUser];
      /*await new Promise(resolve => setTimeout(resolve, 2000));
      const msgAssistent = { role: 'assistant', content: 'Uep baby' }
      setMessages((prevMessages) => [...prevMessages, msgAssistent]);
      localStorage.setItem('chatbot-tk', JSON.stringify([...messages, msgUser, msgAssistent]));*/
      const msgAssistent: Message = await chatApi.sendMessage(newMessage);
      setMessages((prevMessages) => [...prevMessages, msgAssistent]);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="overflow-auto flex-1">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage role={message.role} >{message.content}</ChatMessage>
          </div>
        ))}
        {isLoading && <ChatLoader />}
        <div ref={divRef}></div>
      </div>
      <ChatInput callApi={handleCallApi}/>
      {hasError && <ToastError>Ooops!</ToastError>}
    </>
  )
}

export default Chatbot;