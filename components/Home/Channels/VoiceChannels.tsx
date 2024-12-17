import { useState } from "react";
import { useLiveKit } from "@/hooks/useLivekitRoom";
import { PlusCircle, PhoneIcon } from "lucide-react";
import { VoiceChannel } from "@/models/VoiceChannels";

interface VoiceChannelsProps {
    channels: VoiceChannel[];
    userId: string | undefined;
    serverUrl: string;
    backendUrl: string;
    handleChannelChange: (channel: string, type: string) => void;
    setToken: (token: string) => void;
    currentChannel: string;
}

const VoiceChannels: React.FC<VoiceChannelsProps> = ({ channels, userId, serverUrl, backendUrl, handleChannelChange, setToken, currentChannel }) => {
    const [currentVideoChannel, setCurrentVideoChannel] = useState<string | null>(null);
    const { isConnected, connectToRoom, disconnectFromRoom } = useLiveKit();
    const [loading, setLoading] = useState(false);

    const handleChannel = async (channel: VoiceChannel) => {
        if (currentVideoChannel === channel.id) return;

        setCurrentVideoChannel(channel.id);
        setLoading(true);

        try {
            const response = await fetch(backendUrl + '/livekit/generate-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomName: channel.name, userName: userId }),
            });

            if (!response.ok) throw new Error('Failed to fetch token from backend');

            const data = await response.json();
            const token = data.token;
            if (!token) throw new Error('Failed to obtain token');

            await connectToRoom(serverUrl, channel.name, token);
            console.log(`Connected to room: ${channel.name}`);
            setToken(token);
            handleChannelChange(channel.name, "voice");
        } catch (error) {
            console.error('Error connecting to room:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        setLoading(true);
        try {
            await disconnectFromRoom();
            setCurrentVideoChannel(null);
            handleChannelChange(currentChannel, "text");
            console.log('Disconnected from room');
        } catch (error) {
            console.error('Error disconnecting from room:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between text-gray-400 uppercase text-xs font-bold mb-1 mt-4">
                <span>Voz</span>
                <PlusCircle className="h-4 w-4 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
            {channels.map((channel) => (
                <div
                    key={channel.id}
                    className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-200 group ${
                        currentVideoChannel === channel.id ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => handleChannel(channel)}
                >
                    <PhoneIcon className={`text-gray-400 h-5 w-5 group-hover:text-indigo-500 ${
                        currentVideoChannel === channel.id ? 'text-indigo-500' : ''
                    }`} />
                    <span className="text-sm">{channel.name}</span>
                </div>
            ))}
            {isConnected ? (
                <div className="text-green-500 mt-2">
                    Conectado al canal de voz
                    <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={handleDisconnect}
                        disabled={loading}
                    >
                        {loading ? 'Desconectando...' : 'Desconectar'}
                    </button>
                </div>
            ) : (
                <div className="text-gray-400 mt-2">
                    {loading ? 'Conectando...' : 'No conectado'}
                </div>
            )}
        </div>
    );
};

export default VoiceChannels;
