import { create } from 'zustand';

interface ServerState {
  currentServer: string;
  setCurrentServer: (server: string) => void;
}

export const useServerStore = create<ServerState>((set) => ({
  currentServer: '',
  setCurrentServer: (server: string) => set({ currentServer: server }),
}));
