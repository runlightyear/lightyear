export type ChatMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};
