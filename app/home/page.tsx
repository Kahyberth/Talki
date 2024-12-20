"use client";
import io, { Socket } from "socket.io-client";
import {
  ChevronDown,
} from "lucide-react";
import { SetStateAction, useEffect, useRef, useState, useTransition } from "react";
import { signOut } from "next-auth/react";
import { handlerSession } from "@/actions/handlerSession-action";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { useServerStore } from "@/lib/store";
import Image from "next/image";
import Header from "@/components/Home/Header/Header";
import TextChannels from "@/components/Home/Channels/TextChannels";
import UserInfo from "@/components/Home/User/UserInfo";
import ChatArea from "@/components/Home/Channels/ChatArea";
import VoiceArea from "@/components/Home/Channels/VoiceArea";
import UserList from "@/components/Home/User/UserList";
import VoiceChannels from "@/components/Home/Channels/VoiceChannels";
import env from "@/utils/validateEnv";


const CustomDiscordUI = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string; info: string, avatar: string } | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);


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

  const [token, setToken] = useState("");

  // LiveKit Server
  const [livekitUrl, setLivekitUrl] = useState("wss://talki.venecraftserver.top");

  // Backend Server
  const [backendUrl, setBackendUrl] = useState("http://localhost:4000");

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
        setChats([]); // Limpiar el chat al unirse a un nuevo servidor
      }
    });
  
    newSocket.on("message", (data) => {
      setChats((prevChats) => [
        ...prevChats,
        {
          user: data.username,
          time: data.time,
          avatarColor: "bg-indigo-500",
          message: data.message,
          server: currentServer,
        },
      ]);
    });
  
    newSocket.on("participants", (users) => {
      setParticipants(users);
    });
  
    newSocket.on("disconnectedParticipants", (users) => {
      setDisconnectedParticipants(users);
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, [isPending, user, currentServer]); // Escucha cambios en currentServer
  

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("message", { message, server: currentServer });
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
      <Header currentChannel={currentChannel} />

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
            < TextChannels channels={channels} currentChannel={currentChannel} channelType={channelType} handleChannelChange={handleChannelChange} />
            {/* Voice Channels */}
            < VoiceChannels channels={channels?.voice} userId={user.name} serverUrl={livekitUrl} backendUrl={backendUrl} handleChannelChange={handleChannelChange} setToken={setToken} currentChannel={currentChannel}/>
            
          </div>

          {/* User Info */}
          <UserInfo user={user} isOpen={isOpen} toggleDropdown={toggleDropdown} openProfileModal={openProfileModal} signOut={signOut} />
        </div>

        {/* Chat or Voice Area */}
        <div className="flex flex-col flex-1 bg-gray-800">
          {channelType === "text" ? (
            <>
              {/* Chat Messages */}
              <ChatArea 
                chats={chats}
                currentChannel={currentChannel}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                isEmojiPickerOpen={isEmojiPickerOpen}
                setIsEmojiPickerOpen={setIsEmojiPickerOpen}
                handleEmojiClick={handleEmojiClick}
              />
            </>
          ) : (
            <>
            {/* Voice Area */}
            <VoiceArea currentChannel={currentChannel} token={token} serverUrl={livekitUrl} onDisconnect={() => {
                            // Llamar a la función handleDisconnect del componente VoiceChannels
                            const voiceChannel = channels.voice.find(ch => ch.name === currentChannel);
                            if (voiceChannel) {
                                setToken("");
                                setChannelType("text");
                            }
                        }}/>
            </>
          )}
        </div>

         {/* User List */}
         <UserList
          participants={participants}
          disconnectedParticipants={disconnectedParticipants}
          handleUserClick={handleUserClick}
          user={user}
        />
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