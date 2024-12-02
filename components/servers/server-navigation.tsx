'use client'

import { Home, Plus, Compass, Download, Folder } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useServer } from '@/contexts/ServerContext'

interface ServerNavigationProps {
  onCompassClick: () => void
  onPlusClick: () => void
  serverList: { id: string, name: string }[] // Lista de servidores
}

export function ServerNavigation({ onCompassClick, onPlusClick, serverList }: ServerNavigationProps) {
  const { selectedServerId, selectServer } = useServer()

  return (
    <div className="flex w-[72px] flex-col items-center gap-2 bg-[#1e1f22] py-3">
      <button className="group flex h-12 w-12 items-center justify-center rounded-[16px] bg-indigo-500 transition-all hover:rounded-[12px]">
        <Home className="h-5 w-5 text-white" />
      </button>
      <Separator className="mx-2 h-[2px] w-8 rounded-full bg-[#2d2f32]" />
      
      {serverList.map(server => (
        <button
          key={server.id}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            selectedServerId === server.id ? 'bg-[#4d5357]' : 'bg-[#313338]'
          } hover:bg-[#3f4147]`}
          onClick={() => selectServer(selectedServerId === server.id ? "" : server.id)} // Seleccionamos o deseleccionamos el servidor
        >
          <Folder className="h-5 w-5 text-white" />
        </button>
      ))}
      
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 hover:bg-green-500"
        onClick={onPlusClick}
      >
        <Plus className="h-5 w-5 text-white" />
      </button>
      
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#313338] hover:bg-[#3f4147]"
        onClick={onCompassClick}
      >
        <Compass className="h-5 w-5 text-green-400" />
      </button>
      
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#313338] hover:bg-[#3f4147]">
        <Download className="h-5 w-5 text-blue-400" />
      </button>
    </div>
  )
}
