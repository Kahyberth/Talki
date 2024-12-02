import { auth } from "@/auth";
import { MainLayout } from "@/components/MainLayout";

import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {


  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
