import { useChatStore } from "@/stores/useChatStore";
import { ChatWelcomeScreen } from "./ChatWelcomeScreen";
import MessageItem from "./MessageItem";

const ChatWindownBody = () => {
  const {
    activeConversationId,
    conversations,
    messages: allMessages,
  } = useChatStore();
  const messages = allMessages[activeConversationId!]?.items ?? [];
  console.log("Messages in ChatWindownBody:", messages);
  const list: any[] = Array.isArray(conversations)
    ? conversations
    : (conversations as any)?.conversations || [];
  const activeConversation =
    list.find((c) => c._id === activeConversationId) ?? null;
    console.log("Active Conversation in ChatWindownBody:", activeConversation);

  if (!activeConversation) {
    return <ChatWelcomeScreen />;
  }

  if (!messages?.length) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <p>No messages yet</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-full bg-primary-foreground flex flex-col overflow-hidden">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden beautifull-scrollbar">
        {messages.map((m, index) => (
          <MessageItem
            key={m._id ?? `message-${index}`}
            message={m}
            index={index}
            messages={messages}
            selectConvo={activeConversation}
            lastMessageStatus="delivered"
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindownBody;
