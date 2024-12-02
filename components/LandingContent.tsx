// components/LandingContent.tsx
'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/Hero/Hero'))
const Features = dynamic(() => import('@/components/Features'))
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'))
const CommunitySection = dynamic(() => import('@/components/CommunitySection'))
const CTASection = dynamic(() => import('@/components/CTASection'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function LandingContent() {
  return (
    <>
      <Hero />
      <main className="relative z-10 px-6 py-16 md:py-24">
        <Features />
        <TestimonialsSection />
        <CommunitySection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
