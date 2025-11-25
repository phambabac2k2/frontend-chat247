import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatState } from "@/types/store";
import { chatService } from "@/services/chatService";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: {},
      activeConversationId: null,
      convoLoading: false,
      messageLoading: false,
      reset: () =>
        set({
          conversations: [],
          messages: {},
          activeConversationId: null,
          convoLoading: false,
        }),
      setActiveConversationId: (conversationId: string | null) =>
        set({ activeConversationId: conversationId }),
      fetchConversations: async () => {
        set({ convoLoading: true });
        try {
          const conversations = await chatService.fetchConversations();
          set({ conversations, convoLoading: false });
        } catch (error) {
          console.error("Failed to fetch conversations:", error);
        } finally {
          set({ convoLoading: false });
        }
      },
      fetchMessages: async (conversationId: string) => {
        const { activeConversationId, messages } = get();
        const { user } = useAuthStore.getState();
        console.log("Fetching messages for conversationId:", conversationId);

        const convoId = conversationId ?? activeConversationId;
        if (!convoId) return;

        const current = messages?.[convoId];
        const nextCursor =
          current?.nextCursor === undefined ? "" : current?.nextCursor;

        if (nextCursor === null) return; // no more messages

        set({ messageLoading: true });
        try {
          const { messages: newMessages, cursor } = await chatService.fetchMessages(convoId, nextCursor);
          const processed = newMessages.map((msg) => ({
            ...msg,
            isOwn: msg.senderId === user?._id,
          }));

          set((state) => {
            const prev = state.messages[convoId]?.items ?? [];
            const merged =
              prev.length > 0 ? [...prev, ...processed] : processed;

            return {
              messages: {
                ...state.messages,
                [convoId]: {
                  items: merged,
                  hasMore: !!cursor,
                  nextCursor: cursor ?? null,
                },
              },
            };
          });
        } finally {
          set({ messageLoading: false });
        }
      },
    }),
    {
      name: "chat-storage", // unique name
      partialize: (state) => ({
        conversations: state.conversations,
      }),
    }
  )
);
