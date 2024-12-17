import { ChevronDown, Bell,  Users, Hash, Headphones} from 'lucide-react'
import React from 'react'

interface HeaderProps {
    currentChannel: string
}

const Header: React.FC<HeaderProps> = ({ currentChannel }) => {
    return (
        <div className="bg-gray-750 h-12 px-4 flex items-center justify-between shadow-md border-b border-gray-700">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors duration-200">
                <Hash className="text-gray-400" />
                <h1 className="text-lg font-semibold">{currentChannel}</h1>
                <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-3">
                <Bell className="text-gray-400 hover:text-white cursor-pointer h-5 w-5 transition-colors duration-200" />
                <PinIcon />
                <Users className="text-gray-400 hover:text-white cursor-pointer h-5 w-5 transition-colors duration-200" />
                <SearchIcon />
                <InboxIcon />
                <HelpIcon />
            </div>
        </div>
    )
}

export default Header

const HelpIcon = () => <div className="h-5 w-5 text-gray-400">❓</div>;
const PinIcon = () => <div className="h-5 w-5 text-gray-400">📌</div>;
const SearchIcon = () => <div className="h-5 w-5 text-gray-400">🔍</div>;
const InboxIcon = () => <div className="h-5 w-5 text-gray-400">📥</div>;

const VoiceIcon = ({ className }: { className: string }) => (
  <Headphones className={className} />
);
