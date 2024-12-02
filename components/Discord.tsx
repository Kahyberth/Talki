import { Users, Music, Mic, Settings, MessageSquare } from "lucide-react";

const DiscordUI = () => {
  return (
    <div className="bg-[#1e1f2b] text-gray-300 h-screen w-screen flex">
      {/* Sidebar */}
      <div className="flex flex-col bg-[#272a37] p-2 space-y-2">
        {/* Icon Groups */}
        {["#", "🌀", "📁", "⚙️", "🎮"].map((icon, index) => (
          <div
            key={index}
            className="bg-[#3b3f52] h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold hover:bg-[#45495d] transition-all duration-300"
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-[#2d303d] h-12 px-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-200">Midnight-Discord</h1>
          <div className="flex items-center space-x-3">
            <Settings className="text-gray-400 hover:text-gray-300 cursor-pointer" />
            <Music className="text-gray-400 hover:text-gray-300 cursor-pointer" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Channels Sidebar */}
          <div className="bg-[#272a37] w-64 flex flex-col p-4 space-y-3">
            <div className="text-gray-400 font-bold text-sm">TEXT CHANNELS</div>
            {["important", "polls", "snippets", "general"].map((channel, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-[#3b3f52] cursor-pointer"
              >
                <MessageSquare className="text-gray-400" />
                <span className="text-gray-200">{channel}</span>
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className="flex flex-col flex-1 bg-[#1e1f2b] p-4 space-y-3">
            {/* Chat Messages */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-start space-x-3">
                <div className="bg-gray-500 w-8 h-8 rounded-full"></div>
                <div>
                  <p className="text-gray-200 text-sm font-semibold">refact0r</p>
                  <p className="text-gray-400 text-sm">i changed some variables...</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
                <div>
                  <p className="text-gray-200 text-sm font-semibold">esme</p>
                  <p className="text-gray-400 text-sm">how did you get these decimal...</p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center space-x-2 bg-[#2d303d] p-2 rounded-lg">
              <input
                type="text"
                placeholder="Message #general"
                className="bg-transparent text-gray-200 flex-1 outline-none"
              />
              <Mic className="text-gray-400 hover:text-gray-300 cursor-pointer" />
            </div>
          </div>

          {/* User List */}
          <div className="w-64 bg-[#272a37] p-4">
            <div className="text-gray-400 font-bold text-sm">ONLINE — 10</div>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 py-2 hover:bg-[#3b3f52] rounded-lg px-2 cursor-pointer"
              >
                <Users className="text-gray-400" />
                <span className="text-gray-200">User {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordUI;
