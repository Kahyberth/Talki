import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Hash, Gift, Sticker, ImagePlus, Smile, Bell, Pin, Users, Inbox, HelpCircle, AtSign, Bookmark, LinkIcon as ThreadIcon, PlusCircle } from 'lucide-react'
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Chat() {
  return (
    <div className="flex flex-1 flex-col bg-[#313338]">
      <header className="flex h-12 items-center justify-between border-b border-[#1F2023] px-4">
        <div className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-[#949BA4]" />
          <span className="font-semibold text-white">general</span>
          <span className="text-sm text-[#949BA4]">Welcome to #general!</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
            <ThreadIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
            <Pin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
            <Users className="h-5 w-5" />
          </Button>
          <Input className="h-6 w-36 bg-[#1E1F22] text-xs text-white" placeholder="Search" />
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
            <Inbox className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[#DBDEE1]">yean</span>
                <span className="text-xs text-[#949BA4]">Today at 2:40 PM</span>
              </div>
              <p className="text-[#DBDEE1]">i changed some variables to link the status indicator colors to the window control colors</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>E</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[#D381E9]">esme</span>
                <span className="text-xs text-[#949BA4]">Today at 2:40 PM</span>
              </div>
              <p className="text-[#DBDEE1]">yeah i figured as much cuz it doesn't work on the original either</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>E</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[#D381E9]">esme</span>
                <span className="text-xs text-[#949BA4]">Today at 2:40 PM</span>
              </div>
              <div className="rounded-md bg-[#2B2D31] p-4">
                <div className="flex items-center gap-2 text-[#949BA4]">
                  <span>@refact0r</span>
                  <span>i changed some variables to link the status indicator colors to the window control colors</span>
                </div>
              </div>
              <p className="mt-1 text-[#DBDEE1]">i was wondering why the status indicator plugin doesn't overwrite correctly</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[#5865F2]">refact0r</span>
                <span className="text-xs text-[#949BA4]">Today at 2:41 PM</span>
              </div>
              <p className="text-[#DBDEE1]">yep im fixing all the flavors rn</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>E</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[#D381E9]">esme</span>
                <span className="text-xs text-[#949BA4]">Today at 2:41 PM</span>
              </div>
              <p className="text-[#DBDEE1]">alrighty</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[#5865F2]">refact0r</span>
                <span className="text-xs text-[#949BA4]">Today at 2:51 PM</span>
              </div>
              <p className="text-[#DBDEE1]">
                <span className="text-[#D381E9]">@esme</span> how did you get these decimal hsl colors? i assume you're converting them from the rgb hex somehow
              </p>
              <div className="mt-1 rounded-md bg-[#2B2D31] p-2">
                <code className="text-[#DBDEE1]">hsl(343.6,46.7%,67.6%);</code>
              </div>
            </div>
          </div>
          {/* New typing indicator */}
          <div className="flex items-center gap-2 text-sm text-[#949BA4]">
            <div className="flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce delay-100">•</span>
              <span className="animate-bounce delay-200">•</span>
            </div>
            <span>Someone is typing...</span>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4">
        <div className="relative">
          <Input
            className="bg-[#383A40] border-none pl-4 pr-24 py-3 text-[#DBDEE1] placeholder-[#949BA4]"
            placeholder="Message #general"
          />
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
              <PlusCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
              <Gift className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
              <ImagePlus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
              <Sticker className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-[#949BA4]">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#949BA4]">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
            <AtSign className="mr-1 h-4 w-4" />
            Mention
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[#949BA4] hover:bg-[#35373C] hover:text-white">
            <Bookmark className="mr-1 h-4 w-4" />
            Saved Messages
          </Button>
        </div>
      </div>
    </div>
  )
}

