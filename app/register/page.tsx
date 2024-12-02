'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MinecraftCharacter from '../../components/AuthForm'
import Link from 'next/link'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isCoveringEyes, setIsCoveringEyes] = useState(false)
  const [isWaving, setIsWaving] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordFocus = () => setIsCoveringEyes(true)
  const handlePasswordBlur = () => setIsCoveringEyes(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    console.log('Registration attempted with:', { username, email, password })
    setIsWaving(true)
    setTimeout(() => setIsWaving(false), 2000)
  }

  const emailProgress = email.length > 0 ? Math.min(email.length / 20, 1) : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Card className="sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 shadow-lg border-gray-700">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-bold text-center text-white">Join the Adventure!</CardTitle>
          <CardDescription className="text-center text-gray-400">Create your Minecraft-inspired account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex justify-center bg-gradient-to-b from-gray-700 to-gray-800 p-4 rounded-lg">
            <MinecraftCharacter 
              isCoveringEyes={isCoveringEyes} 
              emailProgress={emailProgress}
              isWaving={isWaving}
            />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            >
              Create Account
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/login" className="text-sm text-indigo-400 hover:text-indigo-300">
              Already have an account? Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

