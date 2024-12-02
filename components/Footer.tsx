// components/Footer.tsx
'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Talki</h3>
          <p className="text-gray-400">Tu comunidad de chat perfecta te espera.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Producto</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Descargar</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Funciones</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Precios</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Compañía</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Acerca de</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Empleos</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Prensa</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Recursos</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Ayuda</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2023 Talki, Inc. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
