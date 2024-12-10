import { useState } from 'react';
import { Room, RoomEvent, RoomConnectOptions } from 'livekit-client';

interface UseLiveKit {
  currentRoom: Room | null;
  isConnected: boolean;
  connectToRoom: (serverUrl: string, token: string, options?: RoomConnectOptions) => Promise<void>;
  disconnectFromRoom: () => Promise<void>;
}

export const useLiveKit = (): UseLiveKit => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectToRoom = async (
    serverUrl: string,
    token: string,
    options?: RoomConnectOptions
  ): Promise<void> => {
    try {
      if (currentRoom) {
        await currentRoom.disconnect();
      }

      const newRoom = new Room();
      await newRoom.connect(serverUrl, token, options);

      newRoom.on(RoomEvent.ParticipantConnected, (participant) => {
        console.log('Participant connected:', participant.identity);
      });

      newRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
        console.log('Participant disconnected:', participant.identity);
      });

      setCurrentRoom(newRoom);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to room:', error);
    }
  };

  const disconnectFromRoom = async (): Promise<void> => {
    if (currentRoom) {
      await currentRoom.disconnect();
      setCurrentRoom(null);
      setIsConnected(false);
    }
  };

  return { currentRoom, isConnected, connectToRoom, disconnectFromRoom };
};
