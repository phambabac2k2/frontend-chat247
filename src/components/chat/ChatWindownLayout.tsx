import { useChatStore } from "@/stores/useChatStore";
import { ChatWelcomeScreen } from "./ChatWelcomeScreen";
import ChatWindownSkeleton from "./ChatWindownSkeleton";
import { SidebarInset } from "../ui/sidebar";
import ChatWindownHeader from "./ChatWindownHeader";
import ChatWindownBody from "./ChatWindownBody";
import MessageInput from "./MessageInput";

const ChatWindownLayout = () => {
  const {activeConversationId, conversations, messageLoading: loading, messages} = useChatStore();
   const list: any[] = Array.isArray(conversations)
     ? conversations
     : (conversations as any)?.conversations || [];
  const activeConversation = list.find((c) => c._id === activeConversationId) ?? null;

  if(!activeConversation) {
    return <ChatWelcomeScreen />
  }

  if(loading){
    return <ChatWindownSkeleton />
  }
  return (
    <SidebarInset className="flex flex-col h-full flex-1 overflow-hidden rounded-sm shadow-md">
      <ChatWindownHeader /> 
      <div className="flex-1 overflow-y-auto bg-primary-foreground">
        <ChatWindownBody />
      </div>
      <MessageInput />
    </SidebarInset>
  )
}

export default ChatWindownLayout