import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import { db, users, verificationTokens } from "./db/schema";
import { eq } from "drizzle-orm";
import { loginSchema } from "./lib/zod";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { sendEmailVerification } from "./lib/mail";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        let user = null;

        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) throw new Error("Invalid credentials.");

        user = await db.select().from(users).where(eq(users.email, data.email));

        if (!user || !user[0].password) throw new Error("Invalid credentials.");

        const isValidPassword = await bcrypt.compare(
          data.password!,
          user[0].password
        );

        if (!isValidPassword) throw new Error("Invalid credentials.");

        // if (!user[0].emailVerified) {
        //   console.log("Email not verified yet.");

        //   // Check if there is a verification token for this user
        //   const verifyToken = await db
        //     .select()
        //     .from(verificationTokens)
        //     .where(eq(verificationTokens.identifier, user[0].id));

        //   // If there is a token and it is not expired yet then return a message to the user
        //   if (verifyToken.length > 0 && verifyToken[0].expires > new Date()) {
        //     throw new Error("Email not verified yet.");
        //   }

        //   console.log("Paso la verificacion");

        //   // If there is a token but it is expired then delete it and create a new one
        //   if (verifyToken) {
        //     await db
        //       .delete(verificationTokens)
        //       .where(eq(verificationTokens.identifier, user[0].id));
        //   }

        //   // If there is no token, create one
        //   const token = nanoid(64);
        //   await db.insert(verificationTokens).values({
        //     identifier: user[0].id,
        //     token: token,
        //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        //   });

        //   console.log("Llego aqui");

        //   // Send email with the token
        //   await sendEmailVerification(user[0].email!, token);

        //   throw new Error(
        //     "Email not verified yet. A new verification email has been sent to your email address."
        //   );
        // }

        return user[0];
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/home";
    },
    async signIn({ user, account, profile }) {
      // Si el usuario inicia sesión con Google
      if (account?.provider === "google") {
        const email = user.email!;

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        // if (existingUser.length) {
        //   if (!existingUser[0].emailVerified) {

        //     // Check if there is a verification token for this user
        //     const verifyToken = await db
        //       .select()
        //       .from(verificationTokens)
        //       .where(eq(verificationTokens.identifier, existingUser[0].id));

        //     // If there is a token and it is not expired yet then return a message to the user
        //     if (verifyToken.length > 0 && verifyToken[0].expires > new Date()) {
        //       throw new Error("Email not verified yet.");
        //     }

        //     // If there is a token but it is expired then delete it and create a new one
        //     if (verifyToken) {
        //       await db
        //         .delete(verificationTokens)
        //         .where(eq(verificationTokens.identifier, existingUser[0].id));
        //     }

        //     // If there is no token, create one
        //     const token = nanoid(64);
        //     await db.insert(verificationTokens).values({
        //       identifier: existingUser[0].id,
        //       token: token,
        //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        //     });

        //     // Send email with the token
        //     await sendEmailVerification(existingUser[0].email!, token);

        //     throw new Error(
        //       "Email not verified yet. A new verification email has been sent to your email address."
        //     );
        //   }
        // }
      }

      return true; // Permite el inicio de sesión
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      return session;
    },
  },
});
