"use client";

import { useEffect } from "react";
import { useServerStore } from "@/lib/store";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { currentServer, setCurrentServer, servers, fetchServers } =
    useServerStore();

  useEffect(() => {
    // Obtener servidores desde el backend al montar el componente
    fetchServers();
  }, [fetchServers]);

  const handleServerChange = (server: { name: string }) => {
    router.push(`/home`);
    setCurrentServer(server.name);
  };

  return (
    <>
      {/* Server List Sidebar */}
      <div className="flex flex-col bg-gray-900 w-16 py-3 items-center space-y-2 border-r border-gray-700">
        {/* Inicio */}
        <div
          className={`${
            currentServer === "Inicio" ? "bg-indigo-500" : "bg-gray-700"
          } h-12 w-12 rounded-full flex items-center justify-center text-2xl hover:bg-indigo-500 cursor-pointer transition-colors duration-200`}
          onClick={() => router.push("/home/welcome")}
        >
          🏠
        </div>

        {/* Servers */}
        {servers.map((server, index) => (
          <div
            key={index}
            className={`${
              currentServer === server.name ? "bg-indigo-500" : "bg-gray-700"
            } h-12 w-12 rounded-full flex items-center justify-center text-2xl hover:bg-indigo-500 cursor-pointer transition-colors duration-200`}
            onClick={() => handleServerChange(server)}
          >
            {server.icon}
          </div>
        ))}

        {/* Add Server */}
        <div className="bg-gray-700 h-12 w-12 rounded-full flex items-center justify-center hover:bg-green-500 cursor-pointer transition-colors duration-200">
          <PlusCircle
            className="h-6 w-6"
            onClick={() => router.push("/home/search")}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
