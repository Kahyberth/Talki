'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Server {
  id: string;
  name: string;
  textChannels: string[];
  voiceChannels: string[];
}

interface ServerContextType {
  selectedServerId: string | null;
  selectServer: (id: string) => void;
  selectedServer: Server | undefined;
  serverList: Server[]; // Agregamos la lista de servidores
  setServerList: (servers: Server[]) => void; // Función para actualizar la lista de servidores
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

interface ServerProviderProps {
  children: ReactNode;
}

export const ServerProvider = ({ children }: ServerProviderProps) => {
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [serverList, setServerList] = useState<Server[]>([ // Inicializamos serverList
    {
      id: "1",
      name: "Talki",
      textChannels: ["general", "polls", "snippets", "github", "testing"],
      voiceChannels: ["General"]
    },
    {
      id: "2",
      name: "ChatterBox",
      textChannels: ["lounge", "dev-talk", "music"],
      voiceChannels: ["Hangout", "Games"]
    }
  ]);

  const selectServer = (id: string) => {
    setSelectedServerId(id);
  };

  const selectedServer = serverList.find(server => server.id === selectedServerId);

  return (
    <ServerContext.Provider value={{ selectedServerId, selectServer, selectedServer, serverList, setServerList }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = (): ServerContextType => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
};
