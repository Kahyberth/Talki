// store.ts
import { create } from 'zustand';
import axios from 'axios';

interface Server {
  name: string;
  icon: string;
}

interface ServerState {
  currentServer: string;
  setCurrentServer: (server: string) => void;
  servers: Server[];
  fetchServers: () => Promise<void>;
}

export const useServerStore = create<ServerState>((set) => ({
  currentServer: '',
  setCurrentServer: (server: string) => set({ currentServer: server }),
  servers: [],
  fetchServers: async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/servers`);
      const servers = response.data.map((server: any) => ({
        name: server.name,
        icon: server.icon,
      }));
      set({ servers });
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  },
}));
