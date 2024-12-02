"use client";

import React, { useEffect, useState } from "react";

const Background = () => {
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  // Generar posiciones aleatorias para las estrellas y figuras geométricas
  useEffect(() => {
    const generatePositions = () => {
      const newPositions = Array.from({ length: 30 }, () => ({
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
      }));
      setPositions(newPositions);
    };

    generatePositions();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-700">
      {/* Floating Shapes */}
      <div className="absolute w-32 h-32 bg-purple-500 rounded-full opacity-30 blur-xl top-10 left-20 animate-float"></div>
      <div className="absolute w-20 h-20 bg-indigo-400 rounded-full opacity-40 blur-lg top-1/3 left-1/4 animate-float-reverse"></div>
      <div className="absolute w-40 h-40 bg-pink-500 rounded-xl opacity-20 blur-2xl top-1/2 left-2/3 animate-float"></div>
      <div className="absolute w-24 h-24 bg-blue-500 rounded-full opacity-30 blur-xl bottom-20 right-10 animate-float-reverse"></div>
      <div className="absolute w-16 h-16 bg-indigo-300 rounded-lg opacity-50 blur-md bottom-32 left-40 animate-float"></div>
      <div className="absolute w-14 h-14 bg-purple-300 rounded-full opacity-40 blur-lg top-10 right-20 animate-float"></div>

      {/* Star-like particles */}
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-white rounded-full opacity-50 blur-sm ${
            i % 2 === 0 ? "animate-twinkle" : "animate-twinkle-delay"
          }`}
          style={{
            top: pos.top,
            left: pos.left,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Background;
