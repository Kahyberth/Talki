"use client";

import { handlerSession } from "@/actions/handlerSession-action";
import WelcomePage from "@/components/Welcome/Landing";
import React, { startTransition, useEffect, useState } from "react";

export default function Page() {
  interface User {
    email?: string;
    name?: string;
    image?: string;
    id?: string;
  }

  const [user, setUser] = useState<User>({});

  useEffect(() => {
    startTransition(async () => {
      const sessionUser = (await handlerSession()) as User;
      if (sessionUser) {
        setUser(sessionUser);
      }
    });
  }, []);



  return <WelcomePage userName={user.name?.split(' ')[0]} />;
}
