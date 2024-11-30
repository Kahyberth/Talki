import { CircleUserRound } from 'lucide-react'

export function MemberList() {
  return (
    <div className="hidden w-60 flex-col bg-[#2b2d31] lg:flex">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-2">
          <h3 className="mb-1 px-2 text-xs font-semibold uppercase text-gray-400">Contributor — 2</h3>
          <div className="space-y-2">
            <button className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-[#35373C]">
              <div className="relative">
                <img
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                  src="/placeholder.svg?height=32&width=32"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2b2d31] bg-emerald-500" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-rose-400">esme</span>
                </div>
                <div className="text-xs text-gray-400">Listening to some music</div>
              </div>
            </button>
            <button className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-[#35373C]">
              <div className="relative">
                <img
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                  src="/placeholder.svg?height=32&width=32"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2b2d31] bg-emerald-500" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-indigo-400">refact0r</span>
                  <span className="text-xs text-yellow-500">👑</span>
                </div>
                <div className="text-xs text-gray-400">Listening to Spotify</div>
              </div>
            </button>
          </div>
        </div>
        <div className="mb-2">
          <h3 className="mb-1 px-2 text-xs font-semibold uppercase text-gray-400">Online — 10</h3>
          <div className="space-y-2">
            <button className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-[#35373C]">
              <div className="relative">
                <img
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                  src="/placeholder.svg?height=32&width=32"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2b2d31] bg-emerald-500" />
              </div>
              <span className="font-medium">_Axis_</span>
            </button>
            {/* Add more online users here */}
          </div>
        </div>
        <div>
          <h3 className="mb-1 px-2 text-xs font-semibold uppercase text-gray-400">Offline — 16</h3>
          <div className="space-y-2">
            <button className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-[#35373C]">
              <CircleUserRound className="h-8 w-8 text-gray-500" />
              <span className="font-medium text-gray-500">Offline User</span>
            </button>
            {/* Add more offline users here */}
          </div>
        </div>
      </div>
    </div>
  )
}

