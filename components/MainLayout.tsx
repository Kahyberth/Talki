// components/MainLayout.tsx
"use client";

import { useState, ReactNode } from "react";
import { ServerNavigation } from "./server-navigation";
import { ServerDiscovery } from "./server-discovery";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  const handleOpenDiscovery = () => {
    setIsDiscoveryOpen(true);
  };

  const handleCloseDiscovery = () => {
    setIsDiscoveryOpen(false);
  };

  return (
    <div className="flex h-screen ">
      {/* Barra de navegación lateral */}
      <ServerNavigation onCompassClick={handleOpenDiscovery} />

      {/* Contenido principal */}
      <div className="flex-1 p-4 overflow-auto">{children}</div>
      {isDiscoveryOpen && (
        <div className="fixed inset-0 z-50 flex items-center overflow-hidden justify-center bg-black bg-opacity-50">
          <div className="relative">
            <ServerDiscovery onClose={handleCloseDiscovery} />
          </div>
        </div>
      )}
    </div>
  );
}
