import ChatEmpty from "@/components/chat/chat-empty";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import ToastError from "@/components/toast/toast-error";
import Message from "@/domain/message";
import ChatApiFetch from "@/infraestructura/adapters/chat-api-fetch";
import PersistLocalStorageMessage from "@/infraestructura/adapters/persist-localstorage";
import ChatApi from "@/infraestructura/ports/chat-api";
import PersistOnClientMessage from "@/infraestructura/ports/persist-on-client-message";
import { FC, useEffect, useRef, useState } from "react";

const Chatbot: FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  
  const chatApi: ChatApi = new ChatApiFetch();
  const persistOnClientMessage: PersistOnClientMessage = new PersistLocalStorageMessage();

  useEffect(() => {
    const storedMessages = persistOnClientMessage.loadMessages();
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  const handleCallApi = async (content: string) => {
    setIsLoading(true);
    setHasError(false);
    const msgUser = { role: 'user', content };
    setMessages((prevMessages) => [...prevMessages, msgUser]);

    try {
      const newMessage =  [...messages, msgUser];
      const msgAssistent: Message = await chatApi.sendMessage(newMessage);
      setMessages((prevMessages) => [...prevMessages, msgAssistent]);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full justify-between">
      {messages.length === 0 && (<ChatEmpty />)}
      {messages.length !== 0 && (<ChatMessages messages={messages} isLoading={isLoading}/>)}
      <ChatInput callApi={handleCallApi}/>
      {hasError && <ToastError>Ooops!</ToastError>}
    </div>

  )
}

export default Chatbot;