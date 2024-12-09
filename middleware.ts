import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = auth?.user;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl.toString()));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/home",
    "/profile",
    "/settings",
    "/account",
  ],
};
