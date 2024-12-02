import Credentials from "next-auth/providers/credentials";
import { db, users } from "./db/schema";
import { eq } from "drizzle-orm";
import { loginSchema } from "./lib/zod";
import bcrypt from "bcryptjs";


const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials.");
        }

        const usersArray = await db
          .select()
          .from(users)
          .where(eq(users.email, data.email as string));

          
        const user = usersArray[0] || null;

        if (!user) {
          throw new Error(`User not found for email: ${data.email}`);
        }

        const pwHash = await bcrypt.compare(
          data.password as string,
          user.password!
        );

        if (!pwHash) {
          throw new Error("Password does not match.");
        }

        return user;
      },
    }),
  ],
};

export default authOptions;
