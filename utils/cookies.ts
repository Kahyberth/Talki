import { cookies } from 'next/headers';

// Obtener una cookie por nombre
export async function getCookie(name: string): Promise<string | null> {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get(name);
  return cookie?.value || null;
}

// Establecer una cookie
export async function setCookie(name: string, value: string, options?: CookieOptions) {
  const cookieStore = cookies();
  (await cookieStore).set(name, value, options);
}

// Eliminar una cookie
export async function deleteCookie(name: string) {
  const cookieStore = cookies();
  (await cookieStore).delete(name);
}

interface CookieOptions {
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  domain?: string;
}
