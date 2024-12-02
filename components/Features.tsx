// components/Features.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Users, ShieldAlert, Sparkles, Globe2, MessageCircle } from 'lucide-react'

const featuresData = [
  {
    id: 1,
    title: 'Conexión Global',
    description: 'Conecta con jugadores de todo el mundo y amplía tu red de contactos.',
    icon: <Globe2 className="w-12 h-12 text-purple-500" />,
  },
  {
    id: 2,
    title: 'Chat en Tiempo Real',
    description: 'Comunícate al instante con voz y texto sin interrupciones.',
    icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
  },
  {
    id: 3,
    title: 'Comunidades Personalizadas',
    description: 'Crea y personaliza tus propios canales y servidores.',
    icon: <Users className="w-12 h-12 text-green-500" />,
  },
  {
    id: 4,
    title: 'Seguridad Avanzada',
    description: 'Tu privacidad es nuestra prioridad. Disfruta de una experiencia segura.',
    icon: <ShieldAlert className="w-12 h-12 text-red-500" />,
  },
  {
    id: 5,
    title: 'Integración de Juegos',
    description: 'Conéctate con tus juegos favoritos y comparte tus logros.',
    icon: <Gamepad2 className="w-12 h-12 text-yellow-500" />,
  },
  {
    id: 6,
    title: 'Actualizaciones Constantes',
    description: 'Siempre estamos mejorando para ofrecerte nuevas funcionalidades.',
    icon: <Sparkles className="w-12 h-12 text-pink-500" />,
  },
]

const Features = () => {
  return (
    <section className="mt-24 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Características Destacadas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature) => (
          <motion.div
            key={feature.id}
            className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            whileHover={{ translateY: -5 }}
          >
            <div className="flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Features
