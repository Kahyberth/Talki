// app/providers.tsx

import { AvatarProvider } from "@/contexts/AvatarContext";
import { ServerProvider } from "@/contexts/ServerContext";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ServerProvider>
        <AvatarProvider>
          <main className="dark text-foreground bg-background">{children}</main>
        </AvatarProvider>
      </ServerProvider>
    </NextUIProvider>
  );
}
