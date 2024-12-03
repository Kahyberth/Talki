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
      redirect: false,
      ...values,
    });

    return {
      success: true,
      message: "Login successful",
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

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { data } = registerSchema.safeParse(values);

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

    const hashedPassword = await bcrypt.hash(data?.password as string, 10);
     
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
    throw new Error(
      `Error 500: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
