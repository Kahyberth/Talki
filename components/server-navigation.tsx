// components/ServerNavigation.tsx
'use client'

import { Home, Plus, Compass, Download, Folder, Code } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

interface ServerNavigationProps {
  onCompassClick: () => void
}

export function ServerNavigation({ onCompassClick }: ServerNavigationProps) {
  return (
    <div className="flex w-[72px] flex-col items-center gap-2 bg-[#1e1f22] py-3">
      <button className="group flex h-12 w-12 items-center justify-center rounded-[16px] bg-indigo-500 transition-all hover:rounded-[12px]">
        <Home className="h-5 w-5 text-white" />
      </button>
      <Separator className="mx-2 h-[2px] w-8 rounded-full bg-[#2d2f32]" />
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 hover:bg-green-500">
        <Plus className="h-5 w-5 text-white" />
      </button>
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#313338] hover:bg-[#3f4147]"
        onClick={onCompassClick} // Asignamos el manejador de clic
      >
        <Compass className="h-5 w-5 text-green-400" />
      </button>
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#313338] hover:bg-[#3f4147]">
        <Download className="h-5 w-5 text-blue-400" />
      </button>
      <div className="mt-auto flex flex-col gap-2">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#313338] hover:bg-[#3f4147]">
          <Folder className="h-5 w-5 text-yellow-400" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#313338] hover:bg-[#3f4147]">
          <Code className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}
