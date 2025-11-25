"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  Moon,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Sun,
} from "lucide-react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "../ui/switch";
import CreateNewChat from "../chat/CreateNewChat";
import NewGroupChatModal from "@/modals/NewGroupChatModal";
// import GroupChatList from "../chat/GroupChatList";
import DirectMessageList from "../chat/DirectMessageList";
import { useThemeStore } from "@/stores/useThemStore";
import GroupChatList from "../chat/GroupChatList";
import { useAuthStore } from "@/stores/useAuthStore";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { user } = useAuthStore();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="bg-gradient-primary"
            >
              <a href="#">
                <div className="flex w-full items-center justify-between px-2">
                  <h1 className="text-xl font-bold text-white">Chat247</h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80" />
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={toggleDarkMode}
                      className="data-[state=checked]:bg-background/80"
                    />

                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="beautifull-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Group Chat
          </SidebarGroupLabel>
          <SidebarGroupAction title="New Group Chat" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Friend
          </SidebarGroupLabel>
          <SidebarGroupAction title="New Add Friend" className="cursor-pointer">
            {/* <AddFriendModal /> */}
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectMessageList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
