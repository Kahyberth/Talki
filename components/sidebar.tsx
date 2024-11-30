"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Hash, Volume2, ChevronDown, Plus, Settings, Mic, Headphones } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex w-60 flex-col bg-[#2B2D31]">
      <div className="flex h-12 items-center px-3 font-semibold shadow-sm">
        midnight-discord
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <div className="flex items-center justify-between py-2 text-xs font-semibold uppercase text-gray-400">
            Text Channels
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-[2px]">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-2 text-gray-400 hover:bg-[#35373C] hover:text-gray-100",
                "bg-[#35373C] text-gray-100"
              )}
            >
              <Hash className="mr-2 h-4 w-4" />
              general
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start px-2 text-gray-400 hover:bg-[#35373C] hover:text-gray-100"
            >
              <Hash className="mr-2 h-4 w-4" />
              important
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between py-2 text-xs font-semibold uppercase text-gray-400">
            Voice Channels
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-[2px]">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 text-gray-400 hover:bg-[#35373C] hover:text-gray-100"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              General
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </div>
        </div>
      </ScrollArea>
      <div className="mt-auto flex h-[52px] items-center gap-2 bg-[#232428] px-2">
        <div className="flex items-center gap-2 flex-1">
          <div className="h-8 w-8 rounded-full bg-gray-500" />
          <div className="text-sm font-semibold">Username</div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Mic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Headphones className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

