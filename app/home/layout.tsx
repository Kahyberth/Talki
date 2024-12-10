"use client";
import Sidebar from "@/components/Home/Sidebar";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  

  return (
    <div className="bg-gray-800 text-gray-100 h-screen w-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenido del hijo */}
      <div className="flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
