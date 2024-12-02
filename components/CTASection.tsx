// components/CTASection.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Rocket, DownloadCloud } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="mt-24 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ¡Únete a la Revolución del Gaming!
        </motion.h2>
        <motion.p
          className="text-xl text-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Únete a millones de jugadores que ya están disfrutando de la mejor experiencia de chat y comunidad.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
          >
            <DownloadCloud className="w-5 h-5 mr-2" />
            Descargar Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Comenzar Gratis
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
