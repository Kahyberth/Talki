"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface CookieContextType {
  getClientCookie: (name: string) => string | null;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
  initialCookies: Record<string, string>;
}

export const CookieProvider = ({ children, initialCookies }: CookieProviderProps) => {
  const [cookies, setCookies] = useState<Record<string, string>>(initialCookies);

  const getClientCookie = (name: string): string | null => {
    return cookies[name] || null;
  };

  return (
    <CookieContext.Provider value={{ getClientCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = (): CookieContextType => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookie must be used within a CookieProvider");
  }
  return context;
};
