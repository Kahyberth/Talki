'use client';
import { useLiveKit } from '@/hooks/useLivekitClient';
import { VoiceChannel } from '@/models/VoiceChannels';
import { PlusCircle, PhoneIcon } from 'lucide-react';
import React, { useState } from 'react';

const VoiceChannels = ({ channels }: { channels: VoiceChannel[] }) => {
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);
  const { isConnected, connectToRoom, disconnectFromRoom } = useLiveKit();
  const [loading, setLoading] = useState(false);

  const handleChannelChange = async (channel: VoiceChannel) => {
    if (currentChannel === channel.id) return;

    setCurrentChannel(channel.id);
    setLoading(true);

    const serverUrl = 'ws://192.168.1.80:7880'; // Cambia a tu servidor LiveKit
    const userId = 'user123'; // Esto debería ser el ID del usuario autenticado (por ejemplo, el ID del usuario del JWT)

    try {
      // Paso 1: Solicitar el token al backend
      const response = await fetch('/api/livekit/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: channel.name,  // Nombre del canal de voz
          userName: userId,        // ID del usuario, puede ser dinámico
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token from backend');
      }

      const data = await response.json();
      const token = data.token;

      if (!token) {
        throw new Error('Failed to obtain token');
      }

      // Paso 2: Conectar al canal con el token obtenido
      await connectToRoom(serverUrl, channel.name, token);
      console.log(`Connected to room: ${channel.name}`);
    } catch (error) {
      console.error('Error connecting to room:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await disconnectFromRoom();
      console.log('Disconnected from room');
    } catch (error) {
      console.error('Error disconnecting from room:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between text-gray-400 uppercase text-xs font-bold mb-1 mt-4">
        <span>Voz</span>
        <PlusCircle className="h-4 w-4 hover:text-white cursor-pointer transition-colors duration-200" />
      </div>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-200 group ${
            currentChannel === channel.id ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleChannelChange(channel)}
        >
          <PhoneIcon
            className={`text-gray-400 h-5 w-5 group-hover:text-indigo-500 ${
              currentChannel === channel.id ? 'text-indigo-500' : ''
            }`}
          />
          <span className="text-sm">{channel.name}</span>
        </div>
      ))}
      {isConnected ? (
        <div className="text-green-500 mt-2">
          Conectado al canal de voz
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={handleDisconnect}
            disabled={loading}
          >
            {loading ? 'Desconectando...' : 'Desconectar'}
          </button>
        </div>
      ) : (
        <div className="text-gray-400 mt-2">
          {loading ? 'Conectando...' : 'No conectado'}
        </div>
      )}
    </div>
  );
};

export default VoiceChannels;
