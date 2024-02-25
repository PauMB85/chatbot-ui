import Message from "@/domain/message";

export default interface PersistOnClientMessage {
  saveMessages(messages: Message[]): void;
  loadMessages(): Message[];
}