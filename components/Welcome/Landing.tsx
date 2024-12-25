import Image from "next/image";
import React from "react";

interface WelcomePageProps {
  userName: string;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userName }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-[rgb(17,24,40)] text-white">
      <div className="flex flex-col md:flex-row items-center w-11/12 max-w-5xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
        {/* Imagen o Ilustración */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/image/landing1.jpg"
            width={400}
            height={400}
            alt="Welcome Illustration"
            className="rounded-lg shadow-lg w-full max-w-sm object-cover"
          />
        </div>

        {/* Contenido de Bienvenida */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
            ¡Hola, {userName}!
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl leading-relaxed">
            Bienvenido a <span className="font-semibold text-white">Talki</span>. <br />
            Conéctate, chatea y realiza videollamadas en tiempo real con amigos, familiares y colegas.
          </p>
          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              Ir al Chat
            </button>
            <button className="px-6 py-3 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors">
              Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
