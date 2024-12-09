"use server";

import { signIn } from "@/auth";
import { db, users } from "@/db/schema";
import { loginSchema, registerSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success)
      return {
        error: "Invalid data",
      };

    //Verifica que el usuario exista
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email as string));

    if (user.length) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    //Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    //Crea un nuevo usuario en la base de datos
    await db.insert(users).values({
      name: data?.name,
      email: data?.email,
      password: hashedPassword,
      image: `https://api.dicebear.com/6.x/adventurer/svg?seed=Aneka&backgroundColor=b6e3f4`,
    });

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      error: "Error 500 ",
    };
  }
};
