import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import UnreadCountBadge from "./UnreadCountBadge";
import GroupChatAvatar from "./GroupChatAvatar";

const GroupChatCard = ({ conversation }: { conversation: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversationId, messages } =
    useChatStore();
  if (!user) return null;

  const unreadCount = conversation.unreadCounts[user._id] || 0;
  const name = conversation.group?.name ?? "Unnamed Group";

  const handleSelectConversation = async (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  return (
    <ChatCard
      className="w-full"
      concersationId={conversation._id}
      name={name}
      isActive={activeConversationId === conversation._id}
      onSelect={() => handleSelectConversation(conversation._id)}
      leftSection={
        <>
          {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
          <GroupChatAvatar
            participants={conversation.participants}
            type="chat"
          />
        </>
      }
      subtitle={
        <p className="text-sm text-muted-foreground truncate">
          {conversation.participants.length} members
        </p>
      }
      timestamp={
        conversation.lastMessage?.createdAt
          ? new Date(conversation.lastMessage.createdAt).toISOString()
          : undefined
      }
      unreadCount={unreadCount}
    />
  );
};

export default GroupChatCard;
