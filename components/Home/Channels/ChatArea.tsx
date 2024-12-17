import EmojiPicker from 'emoji-picker-react';
import { PlusCircle, Gift, Smile, Send } from 'lucide-react';
import React from 'react'

interface ChatAreaProps {
    chats: {
        user: string;
        message: string;
        avatarColor: string;
        time: string;
    }[];
    currentChannel: string;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sendMessage: () => void;
    isEmojiPickerOpen: boolean;
    handleEmojiClick: (emoji: any) => void;
}

const ChatArea = ({chats, currentChannel, message, setMessage, setIsEmojiPickerOpen, sendMessage, isEmojiPickerOpen, handleEmojiClick}: ChatAreaProps) => {
    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chats.map((msg, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                        <div
                            className={`${msg.avatarColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}
                        >
                            {msg.user.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                {msg.user}{" "}
                                <span className="text-xs text-gray-500">
                                    {msg.time}
                                </span>
                            </p>
                            <p className="text-gray-300 group-hover:text-gray-100">
                                {msg.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="bg-gray-750 p-4 border-t border-gray-700">
                <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                    <PlusCircle className="text-gray-400 hover:text-white cursor-pointer h-6 w-6 transition-colors duration-200" />
                    <input
                        type="text"
                        placeholder={`Mensaje #${currentChannel}`}
                        className="bg-transparent flex-1 mx-2 text-gray-200 placeholder-gray-400 outline-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                    />
                    <div className="flex items-center space-x-3">
                        <Gift className="text-gray-400 hover:text-white cursor-pointer h-6 w-6 transition-colors duration-200" />
                        <Smile
                            className="text-gray-400 hover:text-white cursor-pointer h-6 w-6 transition-colors duration-200"
                            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                        />
                        {isEmojiPickerOpen && (
                            <div className="absolute bottom-16 right-60">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                        <Send
                            className="text-indigo-500 hover:text-indigo-400 cursor-pointer h-6 w-6 transition-colors duration-200"
                            onClick={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatArea