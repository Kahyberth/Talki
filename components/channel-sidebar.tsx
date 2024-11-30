import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Hash, Volume2, Settings, Mic, Headphones, Lock, Megaphone, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function ChannelSidebar() {
  return (
    <div className="flex w-60 flex-col bg-[#2B2D31]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-full justify-start rounded-none border-b border-[#1F2023] px-4 font-semibold text-white hover:bg-[#34373C]">
            Midnight Discord
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>Server Boost</DropdownMenuItem>
          <DropdownMenuItem>Invite People</DropdownMenuItem>
          <DropdownMenuItem>Server Settings</DropdownMenuItem>
          <DropdownMenuItem>Create Channel</DropdownMenuItem>
          <DropdownMenuItem>Create Category</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Leave Server</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ScrollArea className="flex-1 px-2">
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between px-2 text-xs font-semibold uppercase text-[#949BA4]">
            <span>Information</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="space-y-[2px]">
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Megaphone className="h-4 w-4" />
              Announcements
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Lock className="h-4 w-4" />
              Rules
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between px-2 text-xs font-semibold uppercase text-[#949BA4]">
            <span>Text Channels</span>
            <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-[2px]">
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Hash className="h-4 w-4" />
              general
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm bg-[#404249] px-2 text-white">
              <Hash className="h-4 w-4" />
              development
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Hash className="h-4 w-4" />
              design
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Hash className="h-4 w-4" />
              memes
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between px-2 text-xs font-semibold uppercase text-[#949BA4]">
            <span>Voice Channels</span>
            <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-[2px]">
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Volume2 className="h-4 w-4" />
              General
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Volume2 className="h-4 w-4" />
              Meeting Room
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-sm px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
              <Volume2 className="h-4 w-4" />
              Chill Zone
            </Button>
          </div>
        </div>
      </ScrollArea>
      <div className="mt-auto flex h-[52px] items-center justify-between bg-[#232428] px-2">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/placeholder-user.jpg" alt="User avatar" className="rounded-full" />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#232428] bg-green-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">johndoe</div>
            <div className="text-xs text-[#949BA4]">#1234</div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4]">
            <Mic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4]">
            <Headphones className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4]">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

