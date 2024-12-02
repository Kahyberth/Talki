import { useEffect, useState } from 'react'
import Image from 'next/image'

const BackgroundMedia = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <div className="absolute inset-0">
        <Image
          src="/image/optimized-background.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/image/blur-background.jpg"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/hero-2.mp4" type="video/webm" />
        <source src="/videos/hero-1.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento video.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  )
}

export default BackgroundMedia
