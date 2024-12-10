import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[3];
  try {
    if (!id) {
      return NextResponse.json(
        { error: "ID no proporcionado" },
        { status: 400 }
      );
    }
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al buscar el usuario" },
      { status: 500 }
    );
  }
}
