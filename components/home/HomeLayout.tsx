"use client";

import { useState } from "react";
import { ChannelSidebar } from "../chat/channel-sidebar";
import { Chat } from "../chat/chat";
import { MemberList } from "../member-list";
import { UserConfig } from "../user/UserConfig";

export default function HomeLayout() {
  const [showUserConfig, setShowUserConfig] = useState(false);
  const [enableAudio, setEnableAudio] = useState(false);
  const [enableMic, setEnableMic] = useState(false);

  const handleOpenUserConfig = () => setShowUserConfig(true);
  const handleCloseUserConfig = () => setShowUserConfig(false);

  const handleEnableAudio = () => {
    setEnableAudio(!enableAudio);
    if (!enableAudio) {
      // Cuando habilitamos el audio, devolvemos el micrófono a su estado anterior
      setEnableMic(enableMic);
    } else {
      // Cuando deshabilitamos el audio, también deshabilitamos el micrófono
      setEnableMic(false);
    }
  };

  const handleEnableMic = () => {
    if (enableAudio) {
      // Si el audio está habilitado, entonces podemos habilitar o deshabilitar el micrófono
      setEnableMic(!enableMic);
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#313338] text-gray-100">
      <ChannelSidebar handleOpenUserConfig={handleOpenUserConfig} handleEnableAudio={handleEnableAudio} handleEnableMic={handleEnableMic} isAudioEnabled={enableAudio} isMicEnabled={enableMic} />
      <Chat />
      <MemberList />

      {/* Modal para User Config */}
      {showUserConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-[#2b2d31] p-4">
            <UserConfig onClose={handleCloseUserConfig} />
          </div>
        </div>
      )}
    </div>
  );
}
