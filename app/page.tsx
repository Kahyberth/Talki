'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Globe, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "Seamless Communication",
      icon: "💬",
      description: "Experience crystal-clear voice, video, and text chat. Stay connected with your community anytime, anywhere.",
      color: "from-blue-400 to-green-400"
    },
    {
      title: "Customizable Spaces",
      icon: "🎨",
      description: "Create and personalize your own channels. Organize your community exactly how you want it.",
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "Advanced Security",
      icon: "🔒",
      description: "Your privacy is our priority. Enjoy end-to-end encryption and robust moderation tools.",
      color: "from-yellow-400 to-red-400"
    },
  ]

  return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1552] via-[#1e1b3d] to-[#0d0b26] overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars"></div>
          <div className="twinkling"></div>
          <div className="clouds"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-white">Talki</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-gray-300">
              <Link href="#" className="nav-link">Download</Link>
              <Link href="#" className="nav-link">Features</Link>
              <Link href="#" className="nav-link">Safety</Link>
              <Link href="#" className="nav-link">Support</Link>
              <Link href="#" className="nav-link">Blog</Link>
            </div>
            <Button variant="outline" className="hidden md:flex bg-white text-black hover:bg-gray-100">
              Login
            </Button>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-30 bg-black bg-opacity-90 flex flex-col items-center justify-center"
              >
                <button className="absolute top-4 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
                <div className="flex flex-col items-center gap-6 text-white text-2xl">
                  <Link href="#" className="hover:text-purple-400 transition-colors">Download</Link>
                  <Link href="#" className="hover:text-purple-400 transition-colors">Features</Link>
                  <Link href="#" className="hover:text-purple-400 transition-colors">Safety</Link>
                  <Link href="#" className="hover:text-purple-400 transition-colors">Support</Link>
                  <Link href="#" className="hover:text-purple-400 transition-colors">Blog</Link>
                  <Button variant="outline" className="mt-4 bg-white text-black hover:bg-gray-100">
                    Login
                  </Button>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <main className="relative z-10 px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-7xl font-bold text-white leading-tight"
              >
                YOUR PERFECT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                CHAT COMMUNITY
              </span>
              </motion.h1>
              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-gray-300 max-w-lg"
              >
                talki is the ideal platform for chatting and having fun with friends, or even creating a community with members from around the world.
              </motion.p>
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download for Windows
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-all duration-300">
                  <Globe className="w-5 h-5 mr-2" />
                  Open in browser
                </Button>
              </motion.div>
            </div>

            {/* App Preview */}
            <div className="relative mt-12 md:mt-0">
              <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <Image
                    src="/image/landing1.jpg"
                    alt="talki app interface preview"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-8 -left-8 w-16 h-16 bg-purple-500 rounded-lg opacity-60"
              />
              <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 -right-8 w-20 h-20 bg-blue-500 rounded-full opacity-60"
              />
              <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-8 left-8 w-12 h-12 bg-pink-500 rounded-lg opacity-60"
              />

              {/* Glowing orb */}
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500 rounded-full opacity-50 animate-pulse"></div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Why Choose talki?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-2 ${index === activeFeature ? 'ring-2 ring-purple-500' : ''}`}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="mt-24 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Join Our Growing Community</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-xl text-gray-300">
                  Connect with millions of users worldwide. Whether you&apos;re into gaming, art, music, or just casual chats, there&apos;s a place for you on talki.
                </p>
                <ul className="space-y-4">
                  {[
                    "Over 10 million active users",
                    "100,000+ unique communities",
                    "24/7 support team",
                    "99.9% uptime guarantee"
                  ].map((item, index) => (
                      <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex items-center text-white"
                      >
                        <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {item}
                      </motion.li>
                  ))}
                </ul>
                <Button size="lg" className="mt-4">Join talki Today</Button>
              </div>
              <div className="relative">
                <Image
                    src="/image/landing2.jpg"
                    alt="talki community illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">Join millions of users and create your perfect chat community today.</p>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              Get Started for Free
            </Button>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-24 bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">talki</h3>
              <p className="text-gray-400">Your perfect chat community awaits.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Download</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Nitro</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Jobs</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Brand</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Safety</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Safety</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Feedback</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2023 talki, Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
  )
}

