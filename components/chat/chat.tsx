import { Bell, Hash, Pin, Users, Gift, Sticker, GiftIcon, PlusCircle, Send, MessageSquare } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Chat() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Encabezado */}
      <header className="flex h-12 items-center px-4 shadow-md">
        <Hash className="mr-2 h-6 w-6 text-gray-400" />
        <h2 className="font-semibold">general</h2>
        <Separator orientation="vertical" className="mx-4 h-6" />
        <p className="text-sm text-gray-400">General chat for general things</p>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pin className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <Users className="h-5 w-5 text-gray-400" />
          </Button>
          <Input
            className="h-6 w-36 bg-[#1e1f22]"
            placeholder="Search"
          />
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Contenedor de mensajes */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Aquí van los mensajes */}
        <div className="flex items-start gap-4 py-2">
          <img
            alt="User avatar"
            className="h-10 w-10 rounded-full"
            src="/placeholder.svg?height=40&width=40"
          />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-indigo-400">yean</span>
              <span className="text-xs text-gray-400">Today at 2:40 PM</span>
            </div>
            <p>i changed some variables to link the status indicator colors to the window control colors</p>
          </div>
        </div>
        {/* Más mensajes... */}
      </div>

      {/* Contenedor de entrada */}
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-lg bg-[#383a40] p-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Input
            className="border-0 bg-transparent focus-visible:ring-0"
            placeholder="Message #general"
          />
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="icon">
              <Gift className="h-5 w-5 text-pink-400" />
            </Button>
            <Button variant="ghost" size="icon">
              <GiftIcon className="h-5 w-5 text-blue-400" />
            </Button>
            <Button variant="ghost" size="icon">
              <Sticker className="h-5 w-5 text-yellow-400" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-5 w-5 text-indigo-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


