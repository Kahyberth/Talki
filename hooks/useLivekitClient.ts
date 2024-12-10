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
        console.log("Disconnecting from current room...");
        await currentRoom.disconnect();
      }

      console.log("Connecting to room...");
      const newRoom = new Room();
      await newRoom.connect(serverUrl, token, options);

      // Set up event listeners for participants
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
      setIsConnected(false);
    }
  };

  const disconnectFromRoom = async (): Promise<void> => {
    if (currentRoom) {
      try {
        console.log("Disconnecting from room...");
        await currentRoom.disconnect();
        setCurrentRoom(null);
        setIsConnected(false);
      } catch (error) {
        console.error('Failed to disconnect from room:', error);
      }
    }
  };

  return { currentRoom, isConnected, connectToRoom, disconnectFromRoom };
};
