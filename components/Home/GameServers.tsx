'use client';

import { useServerStore } from "@/lib/store";
import Image from "next/image";
import React, { useEffect } from "react";






const GameServers = () => {

  const { servers, fetchServers } = useServerStore();


  return (
    <div className="bg-gray-800 text-gray-100 h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 py-12 text-center shadow-lg flex-shrink-0">
        <h1 className="text-5xl font-extrabold text-white tracking-wide">
          Servidores
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Conéctate con jugadores, programadores, haz amigos y descubre nuevos mundos.
        </p>
      </header>

      {/* Contenedor con scroll */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Grid de Servidores */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {servers.map((server, index) => (
            <div
              key={index}
              className="relative group bg-gray-850 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              {/* Imagen con Overlay */}
              <div className="relative h-48">
                <Image
                  src={"/image/server/juegos.jpg"}
                  alt={server.name}
                  width={400}
                  height={200}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                {/* Badge */}
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {"Nuevo!!!"}
                  </div>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition duration-300">
                  {server.name}
                </h2>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {"Servidores de la comunidad 🙌"}
                </p>
              </div>

              {/* Botón */}
              <div className="absolute bottom-4 right-4">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm shadow-md transform transition-all duration-300 group-hover:translate-y-1">
                  Únete ahora
                </button>
              </div>

              {/* Borde Decorativo */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameServers;
