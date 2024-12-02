'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define el tipo de avatar
interface AvatarContextType {
  avatarUrl: string; // URL del avatar generado
  setAvatarUrl: (url: string) => void; // Función para actualizar el avatar
  generateAvatar: (seed: string) => void; // Función para generar un nuevo avatar
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider = ({ children }: AvatarProviderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  // Genera un avatar usando DiceBear
  const generateAvatar = (seed: string) => {
    const diceBearUrl = `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`;
    setAvatarUrl(diceBearUrl);
  };

  useEffect(() => {
    generateAvatar('Aneka');
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl, generateAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
