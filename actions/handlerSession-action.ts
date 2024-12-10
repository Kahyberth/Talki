"use server";

import { auth } from "@/auth";

export async function handlerSession() {
  const session = await auth();

  return session?.user?.email;
}
