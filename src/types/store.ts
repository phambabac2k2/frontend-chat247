import type { Conversation, Message } from "./chat";
import type { User } from "./user";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string) => void;
  clearState: () => void;
  signUp: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;

  signIn: (username: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logOut: () => Promise<void>;
  refresh: () => Promise<void>;

}

export interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setTheme: (isDark: boolean) => void;
}

export interface ChatState {
  conversations: Conversation[];
  messages: Record<string, {
    items: Message[];
    hasMore: boolean;
    nextCursor?: string | null;
  }>; // key = conversationId
  activeConversationId: string | null;
  convoLoading: boolean;
  messageLoading: boolean;
  reset: () => void;
  setActiveConversationId: (conversationId: string | null) => void;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string, cursor?: string) => Promise<void>;
}
