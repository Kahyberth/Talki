import React, { useState } from "react";
import { PlusCircle } from "lucide-react";




  const servers = ["🏠", "🔥", "🌟", "🎮", "🎵", "📚"];

  const Sidebar = () => {
  const [currentServer, setCurrentServer] = useState("Servidor 1");
  const [currentChannel, setCurrentChannel] = useState("general");
  const [channelType, setChannelType] = useState("text");

  // Función para cambiar de servidor
  const handleServerChange = (index: number) => {
    setCurrentServer(`Servidor ${index + 1}`);
    setCurrentChannel("general");
    setChannelType("text");
  };

  

  return (
    <>
      {/* Server List Sidebar */}
      <div className="flex flex-col bg-gray-900 w-16 py-3 items-center space-y-2 border-r border-gray-700">
        {/* Servers */}
        {servers.map((icon, index) => (
          <div
            key={index}
            className={`${
              currentServer === `Servidor ${index + 1}`
                ? "bg-indigo-500"
                : "bg-gray-700"
            } h-12 w-12 rounded-full flex items-center justify-center text-2xl hover:bg-indigo-500 cursor-pointer transition-colors duration-200`}
            onClick={() => handleServerChange(index)}
          >
            {icon}
          </div>
        ))}
        {/* Add Server */}
        <div className="bg-gray-700 h-12 w-12 rounded-full flex items-center justify-center hover:bg-green-500 cursor-pointer transition-colors duration-200">
          <PlusCircle className="h-6 w-6" />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
