import ChatInput from '@/components/chat/chat-input';
import ChatLoader from '@/components/chat/chat-loader';
import ChatMessage from '@/components/chat/chat-message';
import ToastError from '@/components/toast/toast-error';
import { useEffect, useState, useRef } from 'react';

interface Message {
  role: string
  content: string
}

const STORAGE_KEY = 'chatbot-tk';

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
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
      const data = {
        messages: [...messages, msgUser],
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        const assistantResponse = { role: responseData.role, content: responseData.content };
        setMessages((prevMessages) => [...prevMessages, assistantResponse]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, msgUser, assistantResponse]));
      } else {
        setHasError(true);
      }
      /*await new Promise(resolve => setTimeout(resolve, 2000));
      const msgAssistent = { role: 'assistant', content: 'Uep baby' }
      setMessages((prevMessages) => [...prevMessages, msgAssistent]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, msgUser, msgAssistent]));*/
    } catch(error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return(
    <div className="container mx-auto max-w-screen-xl">
      <div className="flex flex-col h-screen">
        <div className='flex flex-col items-center justify-center mt-10 text-center'>
          <h1 className='text-6xl'>Chatbot</h1>
        </div>
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
      </div>
    </div>
    
  )
  
}