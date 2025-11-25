import { SidebarTrigger } from "../ui/sidebar";
import type { Conversation } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import StatusBadge from "./StatusBadge";
import GroupChatAvatar from "./GroupChatAvatar";
import { Separator } from "../ui/separator";

const ChatWindownHeader = ({chat}: {chat?: Conversation}) => {
  const {conversations, activeConversationId} = useChatStore();
  const { user } = useAuthStore();

  let otherUser;

  const list: any[] = Array.isArray(conversations)
     ? conversations
     : (conversations as any)?.conversations || [];
  chat = chat ?? list.find((c) => c._id === activeConversationId) ?? null;

  if(!chat) {
    return (
      <header className="md:hidden sticky top-0 z-10 flex items-center gap-2 px-4 py-2 w-full">
        <SidebarTrigger className="-ml-1 text-foreground" />
      </header>
    )
  }

  if(chat.type === 'direct') {
   const otherUsers = chat.participants.filter((p) => p._id !== user?._id);
    otherUser = otherUsers.length > 0 ? otherUsers[0] : null;
    if(!user || !otherUser) return;
  }



  return (
    <header className="sticky top-0 px-4 py-2 flex items-center bg-background">
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="p-2 w-full flex items-center gap-3">
          <div className="relative">
            {chat?.type === "direct" ? (
              <>
                <UserAvatar
                  type={"siderbar"}
                  name={otherUser?.displayName || "Chat247"}
                  avatarUrl={otherUser?.avatarUrl || undefined}
                />
                <StatusBadge status="offline" />
              </>
            ) : (
              <GroupChatAvatar
                participants={chat.participants}
                type={"siderbar"}
              />
            )}
          </div>
          <h2 className="font-semibold text-foreground">
            {chat?.type === "direct"
              ? otherUser?.displayName || "Chat247"
              : chat.group?.name || "Group Chat"}
          </h2>
        </div>
      </div>
    </header>
  );
}

export default ChatWindownHeader