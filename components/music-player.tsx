import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2, ListMusic, Mic } from 'lucide-react'

export function MusicPlayer() {

  
  return (
    <div className="flex h-[52px] items-center justify-between border-t border-[#1F2023] bg-[#232428] px-4">
      

      <div className="flex items-center gap-3">
          
        
        <div className="h-10 w-10 rounded bg-[#313338]" />
        <div>
          <div className="text-sm font-semibold text-white">Everything to Me</div>
          <div className="text-xs text-[#949BA4]">by MATT BARRI</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 flex-1 max-w-[40%]">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4] hover:text-white">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4] hover:text-white">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 bg-white text-[#232428] rounded-full hover:bg-[#DCDDDE] hover:text-[#232428]">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4] hover:text-white">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4] hover:text-white">
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-[#949BA4]">1:09</span>
          <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
          <span className="text-xs text-[#949BA4]">3:41</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4] hover:text-white">
          <ListMusic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#949BA4] hover:text-white">
          <Mic className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-[#949BA4]" />
          <Slider defaultValue={[75]} max={100} step={1} className="w-20" />
        </div>
      </div>
    </div>
  )
}

