import Message from "@/domain/message";
import ChatApi from "../ports/chat-api";
import PersistOnClientMessage from "../ports/persist-on-client-message";
import PersistLocalStorageMessage from "./persist-localstorage";

class ChatApiFetch implements ChatApi {

  private persistOnClientMessage: PersistOnClientMessage;

  constructor() {
    this.persistOnClientMessage = new PersistLocalStorageMessage();
  }

  async sendMessage(messages: Message[]): Promise<Message> {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });
  
      if (!response.ok) {
        console.error('Error en la petición');
        return Promise.reject('Error en la petición');
      }
  
      const responseData = await response.json();
      const assistantResponse: Message = { role: responseData.role, content: responseData.content };
      this.persistOnClientMessage.saveMessages([...messages, assistantResponse]);
      return assistantResponse;
    } catch (error) {
      console.error('Error en la petición', error);
      return Promise.reject(error);
    }
  }
}

export default ChatApiFetch;