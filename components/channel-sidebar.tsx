import { ChevronDown, Hash, Volume2, Settings, Plus, Headphones, Mic, Search } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export function ChannelSidebar() {
  return (
    <div className="flex w-60 flex-col bg-[#2b2d31] overflow-hidden">
      <button className="flex h-12 items-center px-4 font-semibold hover:bg-[#35373C]">
        Talki
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
        <div className="mb-2">
          <button className="flex w-full items-center gap-1 rounded px-1 py-1 text-xs font-semibold uppercase text-gray-400 hover:text-gray-100">
            <ChevronDown className="h-3 w-3" /> Text Channels
          </button>
          <div className="mt-1 space-y-0.5">
            <button className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-100 bg-[#35373C]">
              <Hash className="h-5 w-5 text-gray-400" /> general
            </button>
            <button className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-400 hover:bg-[#35373C] hover:text-gray-100">
              <Hash className="h-5 w-5 text-gray-400" /> polls
            </button>
            <button className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-400 hover:bg-[#35373C] hover:text-gray-100">
              <Hash className="h-5 w-5 text-gray-400" /> snippets
            </button>
            <button className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-400 hover:bg-[#35373C] hover:text-gray-100">
              <Hash className="h-5 w-5 text-gray-400" /> github
            </button>
            <button className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-400 hover:bg-[#35373C] hover:text-gray-100">
              <Hash className="h-5 w-5 text-gray-400" /> testing
            </button>
          </div>
        </div>
        <div>
          <button className="flex w-full items-center gap-1 rounded px-1 py-1 text-xs font-semibold uppercase text-gray-400 hover:text-gray-100">
            <ChevronDown className="h-3 w-3" /> Voice Channels
            <Plus className="ml-auto h-4 w-4" />
          </button>
          <div className="mt-1 space-y-0.5">
            <button className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-gray-400 hover:bg-[#35373C] hover:text-gray-100">
              <Volume2 className="h-5 w-5 text-green-400" /> General
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-[52px] items-center gap-2 bg-[#232428] p-2">
        <img
          alt="User avatar"
          className="h-8 w-8 rounded-full"
          src="/placeholder.svg?height=32&width=32"
        />
        <div className="flex-1 text-sm">
          <div className="font-semibold">User</div>
          <div className="text-xs text-gray-400">#0000</div>
        </div>
        <button className="hover:text-gray-100">
          <Mic className="h-5 w-5" />
        </button>
        <button className="hover:text-gray-100">
          <Headphones className="h-5 w-5" />
        </button>
        <button className="hover:text-gray-100">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

