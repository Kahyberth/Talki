import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Moon, FileIcon, Code, Plus, Music, Gamepad2, Clapperboard, Compass } from 'lucide-react'

interface ServerNavProps {
  onToggleDiscovery: () => void;
}

export function ServerNav({ onToggleDiscovery }: ServerNavProps) {
  const servers = [
    { name: "Midnight", icon: Moon, color: "#5865F2" },
    { name: "Documents", icon: FileIcon, color: "#3BA55C" },
    { name: "Coding", icon: Code, color: "#EC4245" },
    { name: "Gaming", icon: Gamepad2, color: "#FAA61A" },
    { name: "Music", icon: Music, color: "#ED4245" },
    { name: "Movies", icon: Clapperboard, color: "#3BA55C" },
  ]

  return (
    <div className="flex w-[72px] flex-col items-center gap-2 bg-[#1E1F22] py-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="group h-12 w-12 rounded-[16px] bg-[#5865F2] p-0 transition-all hover:rounded-[12px] hover:bg-[#5865F2]">
              <Moon className="h-5 w-5 text-white transition-all" />
              <span className="sr-only">Home</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            Home
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="h-[2px] w-8 bg-[#35373C]" />
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center gap-2 px-2">
          {servers.map((server) => (
            <TooltipProvider key={server.name} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group relative h-12 w-12 overflow-hidden rounded-[16px] bg-[#313338] p-0 transition-all hover:rounded-[12px] hover:bg-[#5865F2]"
                    style={{ backgroundColor: server.color }}
                  >
                    <server.icon className="h-5 w-5 text-white transition-all" />
                    <span className="sr-only">{server.name}</span>
                    <div className="absolute -left-3 h-2 w-2 rounded-full bg-white opacity-0 transition-all group-hover:h-5 group-hover:opacity-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  {server.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
      <div className="h-[2px] w-8 bg-[#35373C]" />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-12 w-12 rounded-full bg-[#313338] p-0 text-[#3BA55D] hover:bg-[#3BA55D] hover:text-white">
              <Plus className="h-6 w-6" />
              <span className="sr-only">Add a Server</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            Add a Server
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-12 w-12 rounded-full bg-[#313338] p-0 text-[#3BA55D] hover:bg-[#3BA55D] hover:text-white"
              onClick={onToggleDiscovery}
            >
              <Compass className="h-6 w-6" />
              <span className="sr-only">Explore Public Servers</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            Explore Public Servers
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

