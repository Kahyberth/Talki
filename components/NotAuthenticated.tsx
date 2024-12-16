'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const NotAuthenticated: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current && textRef.current && videoRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      )

      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
      )

      gsap.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center text-white px-6 text-center"
    >
      {/* Video en pantalla completa */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        src="/videos/hero-4.mp4"
        poster="/video/sample-poster.jpg"
      >
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Contenido superpuesto */}
      <div ref={textRef} className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          No estás autenticado
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Por favor inicia sesión para acceder a esta página.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Volver Atrás
        </button>
      </div>
    </div>
  )
}

export default NotAuthenticated
