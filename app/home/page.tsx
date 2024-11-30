// pages/discord-clone.tsx (o donde esté ubicada tu página)
import { ChannelSidebar } from "@/components/channel-sidebar";
import { Chat } from "@/components/chat";
import { MemberList } from "@/components/member-list";

export default function DiscordClone() {
  return (
    <div className="flex h-screen overflow-hidden	 bg-[#313338] text-gray-100">
      <ChannelSidebar />
      <Chat />
      <MemberList />
    </div>
  )
}
