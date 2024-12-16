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
// import VoiceChannels from "@/components/VoiceChannels";
// import { VoiceChannel as ModelVoiceChannels } from "@/models/VoiceChannels";
import  EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { string } from "zod";


const CustomDiscordUI = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string; info: string, avatar: string } | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);


  interface User {
    email?: string;
    name?: string;
    image?: string;
    id?: string;
  }


  interface Chat {
    user: string;
    time: string;
    avatarColor: string;
    message: string;
    server: string;
  }


  interface Participants {
    username: string;
    avatarColor: string;
    email: string;
  }

  const [currentChannel, setCurrentChannel] = useState("general");
  const [channelType, setChannelType] = useState("text");
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user, setUser] = useState<User>({});
  const [disconnectedParticipants, setDisconnectedParticipants] = useState<
  Participants[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const { currentServer } = useServerStore();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", avatar: "" });
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const handleEmojiClick = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    setIsEmojiPickerOpen(false);
  };

  useEffect(() => {
    startTransition(async () => {
      const sessionUser = (await handlerSession()) as User;
      if (sessionUser) {
        setUser(sessionUser);
      }
    });
  }, []);

  useEffect(() => {
    if (!user?.id) return; // Esperar a tener ID del usuario para conectar el socket

    const newSocket = io("http://localhost:4000", {
      auth: {
        id: user.id,
      },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
      // Unirse a la sala del servidor actual
      if (currentServer) {
        newSocket.emit("join", { server: currentServer });
      }
    });

    newSocket.on("receiveMessage", (chatMessage: Chat) => {
      // Verificar que el mensaje pertenece al servidor actual
      if (chatMessage.server === currentServer) {
        setChats((prevChats) => [...prevChats, chatMessage]);
      }
    });

    newSocket.on("participants", (users: Participants[]) => {
      console.log("Participantes conectados", users);
      setParticipants(users);
    });

    newSocket.on("disconnectedParticipants", (users: Participants[]) => {
      setDisconnectedParticipants(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isPending, user, currentServer]);

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
    text: ["general"],
    voice: [
      { name: "general", id: "1" },
      { name: "proyectos", id: "2" },
      { name: "equipo", id: "3"},
      { name: "off-topic", id: "4" },
    ],
  };

  const handleChannelChange = (
    name: SetStateAction<string>,
    type: SetStateAction<string>
  ) => {
    setCurrentChannel(name);
    setChannelType(type);
  };

  const handleUserClick = (username: string) => {
      const userInfo = {
        name: username,
        info: `Información adicional sobre ${username}`,
        avatar: "default-avatar-url", // Replace with actual avatar URL if available
      };
      setSelectedUser(userInfo);
      setIsModalOpen(true);
    };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const displayUserName = () => {
    if (!user?.name) return "Usuario";
    // Si el nombre es largo, tomar la primera palabra
    if (user.name.length >= 9) {
      return user.name.split(" ")[0];
    }
    return user.name;
  };

  const displayUserId = () => {
    if (!user?.id) return "#00000";
    // Tomar primeros 5 caracteres del id
    return "#" + user.id.slice(0, 5);
  };

  const handleProfileUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };
  
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
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
            {/* Voice Channels
            
              <VoiceChannels channels={channels.voice} />
            */}
            
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
                  <Image
                    src={selectedUser.avatar}
                    alt={`${selectedUser.name} avatar`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mx-auto"
                  />
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

      {isProfileModalOpen && (
        <Modal
          isOpen={isProfileModalOpen}
          onOpenChange={(open) => setIsProfileModalOpen(open)}
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Editar Perfil
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      value={profileData.name}
                      onChange={handleProfileUpdate}
                      className="bg-gray-700 text-white p-2 rounded"
                    />
                    <input
                      type="text"
                      name="avatar"
                      placeholder="URL de la imagen de perfil"
                      value={profileData.avatar}
                      onChange={handleProfileUpdate}
                      className="bg-gray-700 text-white p-2 rounded"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={closeProfileModal}>Guardar</Button>
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
