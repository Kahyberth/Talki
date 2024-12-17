import { PhoneIncoming, Mic, ScreenShare, Volume2 } from 'lucide-react'
import React from 'react'

interface VoiceAreaProps {
    currentChannel: string
}

const VoiceArea = ({ currentChannel }: VoiceAreaProps) => {
    return (
        <div className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Canal de Voz: {currentChannel}
                </h2>
                <div className="flex items-center space-x-2">
                    <PhoneIncoming className="text-red-500 hover:text-red-400 cursor-pointer h-6 w-6 transition-colors duration-200" />
                </div>
            </div>
            <div className="flex-1 bg-gray-750 rounded-lg p-4 overflow-y-auto border border-gray-700">
                <h3 className="text-lg font-semibold mb-2">
                    Usuarios Conectados
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                U
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-750 rounded-full"></span>
                        </div>
                        <span className="text-sm">Usuario (Tú)</span>
                    </div>
                    {["Alice", "Bob"].map((user, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {user.charAt(0).toUpperCase()}
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-750 rounded-full"></span>
                            </div>
                            <span className="text-sm">{user}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-6">
                <button className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 border border-gray-600">
                    <Mic className="h-5 w-5" />
                    <span>Silenciar</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 border border-gray-600">
                    <ScreenShare className="h-5 w-5" />
                    <span>Compartir Pantalla</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 border border-gray-600">
                    <Volume2 className="h-5 w-5" />
                    <span>Panel de Sonido</span>
                </button>
            </div>
        </div>
    )
}

export default VoiceArea