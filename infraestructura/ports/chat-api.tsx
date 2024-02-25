import Message from "@/domain/message";

export default interface ChatApi {
  sendMessage(messages: Message[]): Promise<Message>;
}