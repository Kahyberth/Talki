'use client'

import { useState } from 'react'
import { ServerNav } from "@/components/server-nav"
import { ChannelSidebar } from "@/components/channel-sidebar"
import { Chat } from "@/components/chat"
import { Members } from "@/components/members"
import { MusicPlayer } from "@/components/music-player"
import { ServerDiscovery } from "@/components/server-discovery"


export default function Home() {
  const [showDiscovery, setShowDiscovery] = useState(false)

  return (
    <div className="flex h-screen bg-[#313338] text-[#DBDEE1]">
      <ServerNav onToggleDiscovery={() => setShowDiscovery(!showDiscovery)} />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 overflow-hidden">
          <ChannelSidebar />
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1">
              <Chat />
              <Members />
            </div>
            <MusicPlayer />
          </div>
        </div>
      </div>
      {showDiscovery && <ServerDiscovery onClose={() => setShowDiscovery(false)} />}
    </div>
  )
}

