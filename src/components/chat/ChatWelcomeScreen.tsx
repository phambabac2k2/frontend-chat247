import { SidebarInset } from "../ui/sidebar";

export const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="flex h-full w-full bg-transparent">
      <div className="flex bg-primary-foreground rounded-2xl flex-1 items-center justify-center">
        <div className="text-center">
          <div className="size-24 mx-auto mb-6 bg-gradient-chat rounded-full flex items-center justify-center shadow-glow pulse-ring">
            <span className="text-3xl">💬</span>
          </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-chat bg-clip-text text-transparent">Welcome to Chat247</h2>
            <p className="text-muted-foreground">Select a conversation or start a new chat to begin messaging.</p>
        </div>
      </div>
    </SidebarInset>
  );
};
