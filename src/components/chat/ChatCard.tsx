import { cn, formatOnlineTime } from "@/lib/utils";
import { Card } from "../ui/card";
import { MoreHorizontal } from "lucide-react";

interface ChatCardProps {
  concersationId: string;
  name: string;
  timestamp?: string;
  isActive: boolean;
  onSelect: (concersationId: string) => void;
  unreadCount?: number;
  leftSection: React.ReactNode;
  subtitle: React.ReactNode;
  className?: string;
}
const ChatCard = ({
  concersationId,
  name,
  timestamp,
  isActive,
  onSelect,
  unreadCount,
  leftSection,
  subtitle,
  className,
}: ChatCardProps) => {
  return (
    <Card
      key={concersationId}
      className={cn(
        "border-none p-3 cursor-pointer transition-smooth glass hover:bg-muted/30",
        isActive &&
          "ring-2 ring-primary/50 bg-linear-to-tr from-primary-glow/10 to-primary-foreground ",
        className
      )}
      onClick={() => onSelect(concersationId)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">{leftSection}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3
              className={cn(
                "font-semibold text-xl truncate",
                unreadCount && unreadCount > 0 && "text-foreground"
              )}
            >
              {name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {timestamp ? formatOnlineTime(new Date(timestamp)) : ""}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {subtitle}
            </div>
            <MoreHorizontal className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 hover:size-5 trasition-smooth" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatCard;
