import { useAvatar } from "@/contexts/AvatarContext"
import { Mic, Headphones, Settings } from "lucide-react"
interface UserSidebarFooterProps {
    handleOpenUserConfig: () => void
    handleEnableAudio: () => void
    handleEnableMic: () => void
    isAudioEnabled: boolean
    isMicEnabled: boolean
}

export function UserSidebarFooter({ handleOpenUserConfig, handleEnableAudio, handleEnableMic, isAudioEnabled, isMicEnabled }: UserSidebarFooterProps) {
    const {avatarUrl} = useAvatar();
    return (
        <div className="flex h-[52px] items-center gap-2 bg-[#232428] p-2">
            <img
                alt="User avatar"
                className="h-8 w-8 rounded-full"
                src={avatarUrl}
            />
            <div className="flex-1 text-sm">
                <div className="font-semibold">User</div>
                <div className="text-xs text-gray-400">#0000</div>
            </div>
            {/* Micrófono */}
            <button
                onClick={handleEnableMic}
                className={`hover:text-gray-100 ${isMicEnabled ? "text-green-500" : "text-red-500"}`}
            >
                <Mic className={`h-5 w-5 ${isMicEnabled ? "text-green-500" : "text-red-500"}`} />
            </button>

            {/* Audio */}
            <button
                onClick={handleEnableAudio}
                className={`hover:text-gray-100 ${isAudioEnabled ? "text-green-500" : "text-red-500"}`}
            >
                <Headphones
                    className={`h-5 w-5 ${isAudioEnabled ? "text-green-500" : "text-red-500"}`}
                />
            </button>
            <button
                className="hover:text-gray-100"
                onClick={handleOpenUserConfig}>
                <Settings className="h-5 w-5" />
            </button>
        </div>
    );
}