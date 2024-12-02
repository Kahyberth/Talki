'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, Globe, Menu, X } from 'lucide-react'
import AuthComponent from '@/components/Auth/AuthComponent'
import LogoutButton from '@/components/logout'

const Hero = () => {
  const navbarRef = useRef<HTMLDivElement | null>(null)
  const heroContentRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    gsap.from(navbarRef.current, {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: 'bounce',
    })

    gsap.from(heroContentRef.current, {
      duration: 1.5,
      opacity: 0,
      y: 50,
      delay: 0.5,
    })

    // Animación del título con efecto de glitch
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter')
      gsap.fromTo(
        letters,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          delay: 1,
        }
      )

      // Efecto de glitch
      gsap.to(letters, {
        duration: 0.1,
        x: (index) => (Math.random() - 0.5) * 20,
        y: (index) => (Math.random() - 0.5) * 20,
        rotation: (index) => (Math.random() - 0.5) * 20,
        opacity: (index) => Math.random(),
        repeat: -1,
        repeatDelay: Math.random() * 2 + 1,
        yoyo: true,
        ease: "rough({ template: 'none.out', strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })",
        delay: 2,
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo y video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/optimized-background.webm" type="video/webm" />
          <source src="/videos/hero-3.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento video.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Barra de navegación */}
      <nav ref={navbarRef} className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">Talki</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-gray-300">
            <Link href="#" className="nav-link">
              Descargar
            </Link>
            <Link href="#" className="nav-link">
              Características
            </Link>
            <Link href="#" className="nav-link">
              Seguridad
            </Link>
            <Link href="#" className="nav-link">
              Soporte
            </Link>
            <Link href="#" className="nav-link">
              Blog
            </Link>
          </div>
          <AuthComponent />
          {/* Botón del menú móvil (omitido para brevedad) */}
        </div>
      </nav>

      {/* Contenido del Hero */}
      <div ref={heroContentRef} className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold text-white leading-tight uppercase tracking-widest"
            >
              {Array.from('Bienvenido a Talki').map((char, index) => (
                <span key={index} className="letter inline-block">
                  {char}
                </span>
              ))}
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl text-gray-300 max-w-lg"
            >
              La plataforma definitiva para gamers y desarrolladores. Conéctate, desarrolla, juega y comunicate con millones de jugadores y programadores en todo el mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Descargar para Windows
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Globe className="w-5 h-5 mr-2" />
                Abrir en el navegador
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
