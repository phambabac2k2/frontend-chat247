import type { Participant } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { Ellipsis } from "lucide-react";

interface GroupChatAvatarProps {
  participants: Participant[];
  type: "siderbar" | "chat" | "profile";
}

const GroupChatAvatar = ({ participants, type }: GroupChatAvatarProps) => {
  const visibleParticipants = participants.slice(0, 4);

  return (
    <div className="relative flex -space-x-2 *data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2">
      {visibleParticipants.map((member, index) => (
        <UserAvatar
          key={member._id || `participant-${index}`}
          name={member.displayName}
          type={type}
          avatarUrl={member.avatarUrl ?? undefined}
        />
      ))}

      {participants.length > 4 && (
        <div className="flex items-center z-10 justify-center size-8 rounded-full bg-muted ring-2 ring-background text-muted-foreground">
          <Ellipsis className="size-4" />
        </div>
      )}
    </div>
  );
};

export default GroupChatAvatar;
