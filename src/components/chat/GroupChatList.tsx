import { useChatStore } from "@/stores/useChatStore";
import GroupChatCard from "./GroupChatCard";
const GroupChatList = () => {
  const { conversations } = useChatStore();
  if (!conversations) return;
  console.log("GroupChatList conversations:", conversations);

  const list: any[] = Array.isArray(conversations)
    ? conversations
    : (conversations as any)?.conversations || [];
  const groupConversations = list.filter((c: any) => c.type === "group");
  console.log("GroupChatList groupConversations:", groupConversations);

  return (
    <div className="flex overflow-auto space-y-2 p-2">
      {groupConversations.map((conversation) => (
        <GroupChatCard key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default GroupChatList;
