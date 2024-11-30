import { MainLayout } from "@/components/MainLayout";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
