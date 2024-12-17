import { Headphones, Mic, Settings } from 'lucide-react'
import React from 'react'

interface UserInfoProps {
    user: any;
    isOpen: boolean;
    toggleDropdown: () => void;
    openProfileModal: () => void;
    signOut: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, isOpen, toggleDropdown, openProfileModal, signOut }) => {
    return (
        <div className="relative mt-absolute pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">{user.name?.split(' ')[0]}</span>
                        <span className="text-xs text-gray-400">#{user.id?.slice(0, 4)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <Mic className="text-gray-400 hover:text-white cursor-pointer h-5 w-5 transition-colors duration-200" />
                    <Headphones className="text-gray-400 hover:text-white cursor-pointer h-5 w-5 transition-colors duration-200" />
                    <div className="relative">
                        <Settings
                            className="text-gray-400 hover:text-white cursor-pointer h-5 w-5 transition-colors duration-200"
                            onClick={toggleDropdown}
                        />
                        {isOpen && (
                            <div className="absolute right-0 bottom-10 -translate-y-half mb-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                                <ul className="py-2">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm text-white"
                                        onClick={openProfileModal}
                                    >
                                        Perfil
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm text-white">
                                        Ajuste
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-red-600 cursor-pointer text-sm text-white"
                                        onClick={() => signOut()}
                                    >
                                        Cerrar sesión
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo