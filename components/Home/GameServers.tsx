import React from "react";
import { Users } from "react-feather";

const servers = [
  {
    name: "Marvel Rivals",
    description:
      "The official Discord server of the game Marvel Rivals! Find the latest news and discuss the upcoming game!",
    online: "484,602 en línea",
    members: "1,222,770 miembros",
    image: "https://via.placeholder.com/400x200",
    badge: "¡Nuevo!",
  },
  {
    name: "Genshin Impact Official",
    description:
      "Welcome to Teyvat, Traveler! This is the place to discuss with others about your favorite game: Genshin Impact!",
    online: "434,955 en línea",
    members: "2,007,239 miembros",
    image: "https://via.placeholder.com/400x200",
    badge: "Popular",
  },
  {
    name: "HELLDIVERS™ Official Discord",
    description: "The official Discord for HELLDIVERS and HELLDIVERS 2!",
    online: "333,917 en línea",
    members: "888,665 miembros",
    image: "https://via.placeholder.com/400x200",
  },
  {
    name: "Honkai: Star Rail Official",
    description:
      "Honkai: Star Rail is a space fantasy RPG by HoYoverse. Hop aboard the Astral Express and explore the galaxy’s wonders!",
    online: "331,434 en línea",
    members: "1,260,046 miembros",
    image: "https://via.placeholder.com/400x200",
    badge: "¡Destacado!",
  },
];

const GameServers = () => {
  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 py-12 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold text-white tracking-wide">
          JUEGOS
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Conéctate con jugadores y descubre nuevos mundos.
        </p>
      </header>

      {/* Grid de Servidores */}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {servers.map((server, index) => (
          <div
            key={index}
            className="relative group bg-gray-850 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {/* Imagen con Overlay */}
            <div className="relative h-48">
              <img
                src={server.image}
                alt={server.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              {/* Badge */}
              {server.badge && (
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {server.badge}
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-5">
              <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition duration-300">
                {server.name}
              </h2>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {server.description}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex items-center space-x-1 text-green-400">
                  <Users className="h-5 w-5" />
                  <span>{server.online}</span>
                </div>
                <span className="text-gray-400">{server.members}</span>
              </div>
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
  );
};

export default GameServers;
