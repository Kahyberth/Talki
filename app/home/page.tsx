"use client";
import io, { Socket } from "socket.io-client";
import {
  Users,
  Mic,
  Settings,
  Hash,
  PlusCircle,
  Gift,
  Smile,
  Send,
  Bell,
  ChevronDown,
  Headphones,
  PhoneIncoming,
  Volume2,
  ScreenShare,
} from "lucide-react";
import { SetStateAction, useEffect, useRef, useState, useTransition } from "react";
import { signOut } from "next-auth/react";
import { handlerSession } from "@/actions/handlerSession-action";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { avatar, Button } from "@nextui-org/react";
import { useServerStore } from "@/lib/store";

interface Chat {
  user: string;
  time: string;
  avatarColor: string;
  message: string;
}

const CustomDiscordUI = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string; info: string, avatar: string } | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);

  const [currentChannel, setCurrentChannel] = useState("general");
  const [channelType, setChannelType] = useState("text");
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const { currentServer } = useServerStore();

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const email = await handlerSession();
      setUserEmail(email!);
    });
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      auth: {
        userEmail,
      },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    console.log(currentServer);

    newSocket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    newSocket.on("receiveMessage", (chatMessage: Chat) => {
      setChats((prevChats) => [...prevChats, chatMessage]);
    });

    newSocket.on("participants", (users: string[]) => {
      setParticipants(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isPending, userEmail]);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("sendMessage", { message });
      setMessage("");
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const channels = {
    text: ["general", "proyectos", "equipo", "off-topic"],
    voice: ["General", "Reuniones", "Soporte"],
  };

  const handleChannelChange = (
    name: SetStateAction<string>,
    type: SetStateAction<string>
  ) => {
    setCurrentChannel(name);
    setChannelType(type);
  };

  const handleUserClick = (user: string, event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Usuario seleccionado:", user);
    const userInfo = {
      name: user,
      info: `Información adicional sobre ${user}`,
      avatar : "https://api.adorable.io/avatars/256/${user}.png",
      
    };
    setSelectedUser(userInfo);
    setIsModalOpen(true);

    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top: rect.top, left: rect.left });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {/* Header */}
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

      <div className="flex flex-1 overflow-hidden">
        {/* Channels Sidebar */}
        <div className="bg-gray-850 w-60 flex flex-col p-4 space-y-3 border-r border-gray-700">
          {/* Server Name */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{`Servidor: ${currentServer}`}</h2>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>

          {/* Channel Categories */}
          <div className="flex flex-col space-y-2 overflow-y-auto flex-1">
            {/* Text Channels */}
            <div>
              <div className="flex items-center justify-between text-gray-400 uppercase text-xs font-bold mb-1">
                <span>Texto</span>
                <PlusCircle className="h-4 w-4 hover:text-white cursor-pointer transition-colors duration-200" />
              </div>
              {channels.text.map((channel, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-200 group ${
                    currentChannel === channel && channelType === "text"
                      ? "bg-gray-700"
                      : ""
                  }`}
                  onClick={() => handleChannelChange(channel, "text")}
                >
                  <Hash
                    className={`text-gray-400 h-5 w-5 group-hover:text-indigo-500 ${
                      currentChannel === channel && channelType === "text"
                        ? "text-indigo-500"
                        : ""
                    }`}
                  />
                  <span className="text-sm">{channel}</span>
                </div>
              ))}
            </div>
            {/* Voice Channels */}
            <div>
              <div className="flex items-center justify-between text-gray-400 uppercase text-xs font-bold mb-1 mt-4">
                <span>Voz</span>
                <PlusCircle className="h-4 w-4 hover:text-white cursor-pointer transition-colors duration-200" />
              </div>
              {channels.voice.map((channel, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-200 group ${
                    currentChannel === channel && channelType === "voice"
                      ? "bg-gray-700"
                      : ""
                  }`}
                  onClick={() => handleChannelChange(channel, "voice")}
                >
                  <VoiceIcon
                    className={`text-gray-400 h-5 w-5 group-hover:text-indigo-500 ${
                      currentChannel === channel && channelType === "voice"
                        ? "text-indigo-500"
                        : ""
                    }`}
                  />
                  <span className="text-sm">{channel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="relative mt-absolute pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                  U
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Usuario</span>
                  <span className="text-xs text-gray-400">#1234</span>
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
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm text-white">
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
        </div>

        {/* Chat or Voice Area */}
        <div className="flex flex-col flex-1 bg-gray-800">
          {channelType === "text" ? (
            <>
              {/* Chat Messages */}
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
                    <Smile className="text-gray-400 hover:text-white cursor-pointer h-6 w-6 transition-colors duration-200" />
                    <Send
                      className="text-indigo-500 hover:text-indigo-400 cursor-pointer h-6 w-6 transition-colors duration-200"
                      onClick={sendMessage}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Voice Channel UI
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
          )}
        </div>

        {/* User List */}
        <div className="w-60 bg-gray-850 p-4 border-l border-gray-700">
          <h2 className="text-sm font-bold text-gray-400 mb-2 uppercase">
            Miembros en línea — {participants.length}
          </h2>
          <div className="space-y-2 overflow-y-auto">
            {participants.map((user, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors duration-200"
                onClick={(event) => handleUserClick(user, event)}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-850 rounded-full"></span>
                </div>
                <span className="text-sm">{user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedUser && (
        <Modal
          isOpen={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setSelectedUser(null);
          }}
          backdrop="transparent"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
          style={{
            position: "absolute",
            top: modalPosition ? modalPosition.top - 50 : "50%",
            left: modalPosition ? modalPosition.left - 350 : "50%",
            transform: modalPosition ? "translate(0, 0)" : "translate(-50%, -50%)",
            width: "300px",
            height: "500",
          }}
          ref={modalRef}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  <img src={selectedUser.avatar} alt={`${selectedUser.name} avatar`} className="w-16 h-16 rounded-full mx-auto"/>
                  {selectedUser.name}
                </ModalHeader>
                <ModalBody>
                  <p>{selectedUser.info}</p>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

    </>
  );
};

export default CustomDiscordUI;

// Iconos placeholder
const PinIcon = () => <div className="h-5 w-5 text-gray-400">📌</div>;
const SearchIcon = () => <div className="h-5 w-5 text-gray-400">🔍</div>;
const InboxIcon = () => <div className="h-5 w-5 text-gray-400">📥</div>;
const HelpIcon = () => <div className="h-5 w-5 text-gray-400">❓</div>;
const VoiceIcon = ({ className }: { className: string }) => (
  <Headphones className={className} />
);
