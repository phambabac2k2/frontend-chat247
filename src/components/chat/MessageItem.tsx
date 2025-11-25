import { cn, formatMessageTime } from "@/lib/utils";
import type { Conversation, Message } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
interface MessageItemProps {
  message: Message;
  index: number;
  messages: Message[];
  selectConvo: Conversation;
  lastMessageStatus: "delivered" | "sent";
}
const MessageItem = ({
  message,
  index,
  selectConvo,
  messages,
  lastMessageStatus,
}: MessageItemProps) => {
  const prev = messages[index - 1];
  const isGroupBreak = index === 0 ||
  message.senderId !== prev?.senderId ||
    new Date(message.createdAt).getTime() -
      new Date(prev?.createdAt || 0).getTime() >
      300000;

  const participant = selectConvo.participants.find(
    (p) => p._id.toString() === message.senderId.toString()
  );
  console.log("Rendering MessageItem:", { message, index, isGroupBreak });

  return (
    <div
      className={cn(
        "flex gap-2 message-bounce",
        message.isOwn ? "justify-end" : "justify-start"
      )}
    >
      {!message.isOwn && (
        <div className="w-8">
          {isGroupBreak && (
            <UserAvatar
              type="chat"
              name={participant?.displayName || ""}
              avatarUrl={participant?.avatarUrl ?? undefined}
            />
          )}
        </div>
      )}
      <div
        className={cn(
          "max-w-ws lg:max-w-md space-y-1 flex flex-col",
          message.isOwn ? "items-end" : "items-start"
        )}
      >
        <Card
          className={cn(
            "p-3",
            message.isOwn
              ? "bg-chat-bubble-sent border-0"
              : "bg-chat-bubble-received"
          )}
        >
          <p
            className={cn(
              "text-sm leading-relaxed break-words",
              message.isOwn ? "text-white" : "text-foreground"
            )}
          >
            {message.content}
          </p>
        </Card>

        {isGroupBreak && (
          <span className="text-xs text-muted-foreground px-1">
            {formatMessageTime(new Date(message.createdAt))}
          </span>
        )}

        {message.isOwn && message._id === selectConvo.lastMessage?._id && (
          <Badge
            variant={"outline"}
            className={cn(
              "text-xs px-1.5 py-0.5 h-4 border-0",
              lastMessageStatus === "sent"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            )}
          >
            {lastMessageStatus}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
