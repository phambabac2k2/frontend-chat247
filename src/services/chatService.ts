import api from "../lib/axios";
import type { Conversation, ConversationResponse, Message } from "@/types/chat";
interface FetchMessagesProps {
  messages: Message[];
  cursor?: string;
}

const MESSAGE_LIMIT = 20;
export const chatService = {
  async fetchConversations(): Promise<Conversation[]> {
    const res = await api.get("/conversations");
    return res.data;
  },

  async fetchMessages(
    conversationId: string,
    cursor?: string
  ): Promise<FetchMessagesProps> {
    const res: any = await api.get<ConversationResponse>(
      `/conversations/${conversationId}/messages?limit=${MESSAGE_LIMIT}&cursor=${cursor}`
    );
    return {
      messages: res.data.messages,
      cursor: res.data.nextCursor,
    }
  },
};
