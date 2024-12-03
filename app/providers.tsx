// app/providers.tsx

import { CookieProvider } from "@/contexts/CookieContext";
import { NextUIProvider } from "@nextui-org/react";
import { cookies } from "next/headers";

export async function Providers({ children }: { children: React.ReactNode }) {

  const cookieStore = cookies();
  const initialCookies = (await cookieStore).getAll().reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <NextUIProvider>
      <CookieProvider initialCookies={initialCookies}>
      <main className="dark text-foreground bg-background">{children}</main>
      </CookieProvider>
    </NextUIProvider>
  );
}
