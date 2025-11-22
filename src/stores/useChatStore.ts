import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {ChatState} from '@/types/store';   
import { chatService } from '@/services/chatService';

export const useChatStore = create<ChatState>()(
    persist((set, get) => ({
        conversations: [],
        messages: {},
        activeConversationId: null,
        loading: false,
        reset: () => set({
            conversations: [],
            messages: {},
            activeConversationId: null,
            loading: false,
        }),
        setActiveConversationId: (conversationId: string | null) => set({activeConversationId: conversationId}),
        fetchConversations: async () => {
            set({loading: true});
            try {
                const conversations = await chatService.fetchConversations();
                set({conversations, loading: false});
            } catch (error) {
                console.error("Failed to fetch conversations:", error);
            } finally {
                set({loading: false});
            }
        },
    }),{
        name: 'chat-storage', // unique name
        partialize: (state) => ({
            conversations: state.conversations,
        })
    })
)