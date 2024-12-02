'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const NotFoundComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      )
      gsap.fromTo(
        textRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'bounce.out' }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 text-center"
    >
      <div ref={textRef}>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400">
          Lo sentimos, la página que buscas no existe.
        </p>
      </div>
      <button
        onClick={() => window.history.back()}
        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        Volver Atrás
      </button>
    </div>
  )
}

export default NotFoundComponent;
