import { useState, useCallback } from "react";
import { Room, RoomOptions } from "livekit-client";

interface UseLiveKitResult {
  room: Room | null;
  isConnected: boolean;
  error: string | null;
  connectToRoom: (url: string, roomName: string, token: string) => void;
  disconnectFromRoom: () => void;
}

export const useLiveKit = (): UseLiveKitResult => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Conectar al canal de voz
  const connectToRoom = useCallback(async (url: string, roomName: string, token: string) => {
    try {
      const newRoom = new Room();
      await newRoom.connect(url, token);
      setRoom(newRoom);
      setIsConnected(true);
      setError(null); // Limpiar errores si la conexión es exitosa
    } catch (err: any) {
      setError(err.message || "Error al conectar");
      setIsConnected(false);
    }
  }, []);

  // Desconectar del canal de voz
  const disconnectFromRoom = useCallback(() => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setIsConnected(false);
    }
  }, [room]);

  return { room, isConnected, error, connectToRoom, disconnectFromRoom };
};
