'use client'

import { ChevronDown, Hash, Volume2, Plus, Search } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { UserSidebarFooter } from '../user/UserSidebarFooter'
import { useState, useEffect } from 'react'
import { useServer } from '@/contexts/ServerContext' // Importamos el contexto

interface ChannelSidebarProps {
  handleOpenUserConfig: () => void
  handleEnableAudio: () => void
  isAudioEnabled: boolean
  handleEnableMic: () => void
  isMicEnabled: boolean
}

interface Channel {
  id: string;
  name: string;
  textChannels: string[];
  voiceChannels: string[];
}

export function ChannelSidebar({
  handleOpenUserConfig,
  handleEnableAudio,
  handleEnableMic,
  isAudioEnabled,
  isMicEnabled,
}: ChannelSidebarProps) {
  const { selectedServerId, serverList } = useServer() // Accedemos a serverList desde el contexto
  const [channels, setChannels] = useState<Channel | null>(null)

  // Efecto para actualizar los canales según el servidor seleccionado
  useEffect(() => {
    const selectedServer = serverList.find((server: { id: string | null }) => server.id === selectedServerId)
    if (selectedServer) {
      setChannels({
        id: selectedServer.id,
        name: selectedServer.name,
        textChannels: selectedServer.textChannels,
        voiceChannels: selectedServer.voiceChannels,
      })
    }
  }, [selectedServerId, serverList])

  if (!channels) {
    return null // Si no hay canales (ningún servidor seleccionado), no renderizamos nada
  }

  return (
    <div className="flex w-60 flex-col bg-[#2b2d31] overflow-hidden">
      <button className="flex h-12 items-center px-4 font-semibold hover:bg-[#35373C]">
        {channels.name}
        <ChevronDown className="ml-auto h-4 w-4" />
      </button>
      <Separator className="h-[2px] bg-[#1e1f22]" />
      <div className="mx-2 my-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded bg-[#1e1f22] py-1 pl-8 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {/* Mostramos los canales de texto */}
        {channels.textChannels.map((textChannel, index) => (
          <button
            key={index}
            className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-100 bg-[#35373C]"
          >
            <Hash className="h-5 w-5 text-gray-400" /> {textChannel}
          </button>
        ))}
        <div className="mt-4">
          {/* Mostramos los canales de voz */}
          <button className="flex w-full items-center gap-1 rounded px-1 py-1 text-xs font-semibold uppercase text-gray-400 hover:text-gray-100">
            <ChevronDown className="h-3 w-3" /> Voice Channels
            <Plus className="ml-auto h-4 w-4" />
          </button>
          <div className="mt-1 space-y-0.5">
            {channels.voiceChannels.map((voiceChannel, index) => (
              <button
                key={index}
                className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-400 hover:bg-[#35373C] hover:text-gray-100"
              >
                <Volume2 className="h-5 w-5 text-green-400" /> {voiceChannel}
              </button>
            ))}
          </div>
        </div>
      </div>
      <UserSidebarFooter
        handleOpenUserConfig={handleOpenUserConfig}
        handleEnableAudio={handleEnableAudio}
        handleEnableMic={handleEnableMic}
        isAudioEnabled={isAudioEnabled}
        isMicEnabled={isMicEnabled}
      />
    </div>
  )
}
