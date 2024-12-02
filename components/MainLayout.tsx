"use client";

import { useState, ReactNode } from "react";
import { ServerNavigation } from "./servers/server-navigation";
import { ServerDiscovery } from "./servers/server-discovery";
import { CreateServerModal } from "./servers/server-creation";
import serverlist from "./servers/serverlist.json";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);

  const handleOpenDiscovery = () => {
    setIsDiscoveryOpen(true);
  };

  const handleCloseDiscovery = () => {
    setIsDiscoveryOpen(false);
  };

  const handleOpenPlus = () => {
    setIsPlusOpen(true);
  };

  const handlePlusClose = () => {
    setIsPlusOpen(false);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Barra de navegación lateral */}
      <ServerNavigation onCompassClick={handleOpenDiscovery} onPlusClick={handleOpenPlus} serverList={serverlist}  />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">{children}</div>

      {/* Modal para Server Discovery */}
      {isDiscoveryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-lg">
            <ServerDiscovery onClose={handleCloseDiscovery} />
          </div>
        </div>
      )}

      {/* Modal para Create Server */}
      {isPlusOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg">
            <CreateServerModal onClose={handlePlusClose} onCreate={(serverName) => console.log(serverName)} />
          </div>
        </div>
      )}
    </div>
  );

}
