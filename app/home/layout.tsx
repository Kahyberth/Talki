import { auth } from "@/auth";
import { MainLayout } from "@/components/MainLayout";
import NotAuthenticated from "@/components/NotAuthenticated";

import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {

  const session = await auth();

  if (!session) {
    return <NotAuthenticated />;
  }


  console.log(session);

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
