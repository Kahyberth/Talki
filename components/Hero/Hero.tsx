'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, Globe, Music, VolumeX } from 'lucide-react'
import AuthComponent from '@/components/Auth/AuthComponent'
import Image from 'next/image'

const Hero = () => {
  const navbarRef = useRef<HTMLDivElement | null>(null)
  const heroContentRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Array de videos
  const videoSources = [
    { src: '/videos/hero-4.mp4', type: 'video/mp4' },
    { src: '/videos/hero-3.mp4', type: 'video/mp4' },
    { src: '/videos/hero-2.mp4', type: 'video/mp4' },
    { src: '/videos/hero-1.mp4', type: 'video/mp4' },
    { src: '/videos/not-auth.mp4', type: 'video/mp4' },
  ];

  // Estados
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Iniciar en falso para evitar reproducción automática
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Animaciones del navbar y contenido
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

    // Animación del título con efecto de glitch simplificado
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

      gsap.to(letters, {
        duration: 0.1,
        x: () => (Math.random() - 0.5) * 5, // Reducido para mejor rendimiento
        y: () => (Math.random() - 0.5) * 5,
        rotation: () => (Math.random() - 0.5) * 5,
        opacity: () => Math.random(),
        repeat: -1,
        repeatDelay: () => Math.random() * 5 + 2, // Mayor delay entre repeticiones
        yoyo: true,
        ease: 'none',
        delay: 2,
      })
    }

    // Listener para el fin del video
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoEnd = () => {
        gsap.to(videoElement, {
          duration: 1,
          opacity: 0,
          onComplete: () => {
            setCurrentVideoIndex((prevIndex) => {
              const nextIndex = (prevIndex + 1) % videoSources.length;
              return nextIndex;
            });
          },
        });
      };

      videoElement.addEventListener('ended', handleVideoEnd);

      // Evento para saber cuándo el video ha cargado
      videoElement.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });

      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [])

  // Actualiza el video al cambiar el índice
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      gsap.set(videoElement, { opacity: 0 });
      videoElement.load();

      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          gsap.to(videoElement, { duration: 1, opacity: 1 });
        }).catch((error) => {
          console.error('Error al reproducir el video:', error);
        });
      }
    }
  }, [currentVideoIndex])

  // Función para controlar el audio
  const toggleAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isAudioPlaying) {
        audioElement.pause();
        setIsAudioPlaying(false);
      } else {
        audioElement.play();
        setIsAudioPlaying(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo y video */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Imagen de fondo mientras carga el video */}
        {!isVideoLoaded && (
          <Image
            src="/image/loading.jpg"
            alt="Fondo estático"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          className={`absolute top-0 left-0 w-full h-full object-cover ${isVideoLoaded ? '' : 'hidden'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{ opacity: 1 }}
        >
          <source src={videoSources[currentVideoIndex].src} type={videoSources[currentVideoIndex].type} />
          Tu navegador no soporta el elemento video.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Elemento de audio */}
      <audio ref={audioRef} src="/audio/loop.mp3" loop />

      {/* Botón para controlar el audio */}
      <button
        onClick={toggleAudio}
        className="absolute top-4 right-4 z-30 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition"
        aria-label={isAudioPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isAudioPlaying ? <VolumeX size={24} /> : <Music size={24} />}
      </button>

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
              La plataforma definitiva para gamers y desarrolladores. Conéctate, desarrolla, juega y comunícate con millones de jugadores y programadores en todo el mundo.
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
