// components/ServerDiscovery.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, X, Compass, Gamepad2, Music, Film, Book, Coffee } from 'lucide-react'
import Image from "next/image"

interface ServerDiscoveryProps {
  onClose: () => void
}

export function ServerDiscovery({ onClose }: ServerDiscoveryProps) {
  const categories = [
    { name: "Gaming", icon: Gamepad2 },
    { name: "Music", icon: Music },
    { name: "Entertainment", icon: Film },
    { name: "Education", icon: Book },
    { name: "Science & Tech", icon: Compass },
    { name: "Hangout", icon: Coffee },
  ];

  const featuredServers = [
    { name: "Drawing Club", members: 450000, image: "/image/Drawing Club.jpg" },
    { name: "Anime Club", members: 200000, image: "/image/anime-club.jpg" },
  ];

  return (
    <div className="w-[800px] max-w-[95%] h-[85vh] flex-col bg-[#2B2D31] rounded-lg shadow-lg overflow-hidden">
      <div className="flex h-12 items-center justify-between border-b border-[#1F2023] px-4">
        <h2 className="text-lg font-semibold text-white">Discover</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#B5BAC1]" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#B5BAC1]" />
          <Input
            className="pl-10 bg-[#1E1F22] border-none text-white placeholder-[#B5BAC1]"
            placeholder="Explore communities"
          />
        </div>
      </div>
      <ScrollArea className="flex-1 h-full overflow-y-auto">
        <div className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-[#B5BAC1]">Featured Communities</h3>
          <div className="grid grid-cols-2 gap-6">
            {featuredServers.map((server) => (
              <div key={server.name} className="rounded-lg bg-[#232428] p-5">
                <Image
                  src={server.image}
                  alt={server.name}
                  className="mb-3 h-21 w-full rounded-md object-cover"
                  width={600}
                  height={600}
                />
                <h4 className="text-base font-semibold text-white">{server.name}</h4>
                <p className="text-sm text-[#B5BAC1]">{server.members.toLocaleString()} members</p>
              </div>
            ))}
          </div>
          <h3 className="mb-2 mt-6 text-sm font-semibold text-[#B5BAC1]">Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="justify-start gap-2 text-[#B5BAC1] hover:bg-[#35373C] hover:text-white w-full"
              >
                <category.icon className="h-5 w-5" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}


