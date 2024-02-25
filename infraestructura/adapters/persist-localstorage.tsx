import Message from "@/domain/message";
import PersistOnClientMessage from "../ports/persist-on-client-message";


const KEY = 'chatbot-tk';

export default class PersistLocalStorageMessage implements PersistOnClientMessage {
  saveMessages(messages: Message[]): void {
    localStorage.setItem(KEY, JSON.stringify(messages));
  }
  loadMessages(): Message[] {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as Message[];
  }
  
}