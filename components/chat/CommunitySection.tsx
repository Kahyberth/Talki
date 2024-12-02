// components/CommunitySection.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

const videos = [
  { id: 1, src: '/videos/feature-1.mp4', title: 'Gameplay Épico 1' },
  { id: 2, src: '/videos/feature-2.mp4', title: 'Gameplay Épico 2' },
  { id: 3, src: '/videos/feature-3.mp4', title: 'Gameplay Épico 3' },
  { id: 4, src: '/videos/feature-4.mp4', title: 'Gameplay Épico 4' },
  { id: 5, src: '/videos/feature-5.mp4', title: 'Gameplay Épico 5' },
  { id: 6, src: '/videos/hero-3.mp4', title: 'Gameplay Épico 6' },
]

const CommunitySection = () => {
  return (
    <section className="mt-24 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Explora Nuestra Comunidad
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <video
              src={video.src}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <h3 className="text-lg font-semibold text-white">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CommunitySection
