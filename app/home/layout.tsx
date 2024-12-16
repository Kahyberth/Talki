import Sidebar from "@/components/Home/Sidebar";
import NotAuthenticated from "@/components/NotAuthenticated";
import { auth } from "@/auth";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  console.log("Session", session);

  return (
    <div className="w-screen h-screen bg-[rgb(17,24,40)]">
      {session === null ? (
        <div className="w-full h-full">
          <NotAuthenticated />
        </div>
      ) : (
        <div className="flex h-full w-full">
          {/* Sidebar */}
          <Sidebar />

          {/* Contenido */}
          <div className="flex-1 flex flex-col">{children}</div>
        </div>
      )}
    </div>
  );
}
