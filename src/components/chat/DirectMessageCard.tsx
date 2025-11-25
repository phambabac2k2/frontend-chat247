import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
import UnreadCountBadge from "./UnreadCountBadge";

const DirectMessageCard = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversationId, messages, fetchMessages } =
    useChatStore();
  if (!user) return null;

  const otherUser = conversation.participants.find(
    (participant) => participant._id !== user._id
  );
  if (!otherUser) return null;

  const unreadCount = conversation.unreadCounts[user._id] || 0;
  const lastMessage = conversation.lastMessage?.content ?? "";

  const handleSelectConversation = async (conversationId: string) => {
    setActiveConversationId(conversationId);
    if (!messages[conversationId]) {
      await fetchMessages(conversationId);
    }
  };
  return (
    <ChatCard
      className="w-full"
      concersationId={conversation._id}
      name={otherUser.displayName ?? ""}
      timestamp={
        conversation.lastMessage?.createdAt
          ? new Date(conversation.lastMessage.createdAt).toISOString()
          : undefined
      }
      isActive={activeConversationId === conversation._id}
      onSelect={() => handleSelectConversation(conversation._id)}
      unreadCount={unreadCount}
      leftSection={
        <>
          <UserAvatar
            type="siderbar"
            name={otherUser.displayName ?? "User"}
            avatarUrl={otherUser.avatarUrl ?? undefined}
          />
          <StatusBadge status="offline" />
          {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
        </>
      }
      subtitle={
        <p
          className={cn(
            "text-sm truncate",
            unreadCount > 0
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {lastMessage}
        </p>
      }
    />
  );
};

export default DirectMessageCard;
