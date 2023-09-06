import { ChatMessage } from "./ChatMessage";

export interface ChatChoice {
  index: number;
  message: ChatMessage;
  finishReason: string;
}
