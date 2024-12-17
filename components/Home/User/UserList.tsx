import React from 'react'

interface UserListProps {
    participants: Participants[];
    handleUserClick: (id: string) => void;
    disconnectedParticipants: Participants[];
    user: User
}


const UserList = ({ participants, handleUserClick, disconnectedParticipants, user }: UserListProps) => {
    return (
        <div className="w-60 bg-gray-850 p-4 border-l border-gray-700">
            <h2 className="text-sm font-bold text-gray-400 mb-2 uppercase">
                Miembros en línea — {participants.length}
            </h2>
            <div className="space-y-2 overflow-y-auto">
                {participants.map((pUser, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors duration-200"
                        onClick={() => handleUserClick(user.id!)}
                    >
                        <div className="relative">
                            <div className={`w-8 h-8 ${pUser.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                                {pUser.username?.charAt(0).toUpperCase()}
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-850 rounded-full"></span>
                        </div>
                        <span className="text-sm">
                            {pUser.username?.length! >= 9
                                ? pUser.username?.split(" ")[0]
                                : pUser.username}
                        </span>
                    </div>
                ))}
            </div>

            {/* Miembros desconectados */}
            <h2 className="text-sm font-bold text-gray-400 mt-4 mb-2 uppercase">
                Miembros desconectados — {disconnectedParticipants.length}
            </h2>
            <div className="space-y-2 overflow-y-auto">
                {disconnectedParticipants.map((dUser, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded"
                    >
                        <div className="relative">
                            <div className={`w-8 h-8 ${dUser.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                                {dUser.username?.charAt(0).toUpperCase()}
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-gray-850 rounded-full"></span>
                        </div>
                        <span className="text-sm text-gray-400">{dUser.username?.length! >= 9
                            ? dUser.username?.split(" ")[0]
                            : dUser.username}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserList