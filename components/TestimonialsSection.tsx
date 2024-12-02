// components/TestimonialsSection.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Guerrero',
    avatar: '/image/carlos.jpg',
    feedback: 'Talki me ha permitido conectar con amigos y crear una comunidad increíble alrededor de mis juegos favoritos.',
  },
  {
    id: 2,
    name: 'Ana Gómez',
    avatar: '/image/ana.jpg',
    feedback: 'La calidad de audio y video es excelente. Es mi plataforma favorita para chatear mientras juego.',
  },
  {
    id: 3,
    name: 'Luis Rodríguez',
    avatar: '/image/camilo.jpg',
    feedback: 'Las herramientas de moderación son muy efectivas. Puedo administrar mi comunidad sin problemas.',
  },
]

const TestimonialsSection = () => {
  return (
    <section className="mt-24 bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Lo Que Dicen Nuestros Usuarios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: testimonial.id * 0.2 }}
              className="bg-gray-900 p-6 rounded-lg"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                <p className="text-gray-400 mt-4">"{testimonial.feedback}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
