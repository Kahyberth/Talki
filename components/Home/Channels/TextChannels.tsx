import { Hash, PlusCircle } from 'lucide-react'
import React from 'react'

interface TextChannelsProps {
    channels: {
        text: string[]
    }
    currentChannel: string
    channelType: string
    handleChannelChange: (channel: string, type: string) => void
}

const TextChannels = ({ channels, currentChannel, channelType, handleChannelChange }: TextChannelsProps) => {
    return (
        <div>
            <div className="flex items-center justify-between text-gray-400 uppercase text-xs font-bold mb-1">
                <span>Texto</span>
                <PlusCircle className="h-4 w-4 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
            {channels.text.map((channel, index) => (
                <div
                    key={index}
                    className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-200 group ${currentChannel === channel && channelType === "text"
                            ? "bg-gray-700"
                            : ""
                        }`}
                    onClick={() => handleChannelChange(channel, "text")}
                >
                    <Hash
                        className={`text-gray-400 h-5 w-5 group-hover:text-indigo-500 ${currentChannel === channel && channelType === "text"
                                ? "text-indigo-500"
                                : ""
                            }`}
                    />
                    <span className="text-sm">{channel}</span>
                </div>
            ))}
        </div>
    )
}

export default TextChannels