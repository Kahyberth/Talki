import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Members() {
  const members = [
    { name: "esme", status: "Listening to some music", online: true },
    { name: "refact0r", status: "Listening to Spotify", online: true, crown: true },
    { name: "_Axis_", status: "", online: true },
    { name: "axyie", status: "Playing Neovim", online: true },
    { name: "aykude", status: "Playing Swords and Sand...", online: true },
    { name: "BlueSky", status: "✨ dms open ✨", online: true },
    { name: "cat person", status: "", online: true },
    { name: "HellaEaver", status: "", online: true },
    { name: "Kuma", status: "Playing Dislyte", online: true },
    { name: "Qi", status: "JO!", online: true },
    { name: "タンラン", status: "", online: true },
    { name: "Dieb", status: "", online: true },
  ]

  return (
    <div className="hidden w-60 flex-col bg-[#2B2D31] lg:flex">
      <ScrollArea className="flex-1 py-3">
        <div className="px-3">
          <div className="mb-2 text-xs font-semibold text-[#949BA4]">
            ONLINE — {members.length}
          </div>
          {members.map((member) => (
            <div
              key={member.name}
              className="group flex items-center gap-3 rounded-md px-2 py-1 hover:bg-[#35373C]"
            >
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2B2D31] bg-green-500" />
              </div>
              <div className="flex-1 truncate">
                <div className="flex items-center gap-1">
                  <span className="truncate text-sm font-medium">
                    {member.name}
                  </span>
                  {member.crown && (
                    <span className="text-xs text-yellow-500">👑</span>
                  )}
                </div>
                {member.status && (
                  <div className="truncate text-xs text-[#949BA4]">
                    {member.status}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

