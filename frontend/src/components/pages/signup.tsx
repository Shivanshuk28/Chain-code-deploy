import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'

interface SignupProps {
  onSignup: (username: string, email: string, password: string, walletAddress: string) => void
}

export default function Signup({ onSignup }: SignupProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword) {
      onSignup(username, email, password, walletAddress)
    } else {
      alert("Passwords don't match")
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
      <motion.div 
        className="bg-opacity-30 backdrop-blur-sm bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up for ChainCode</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              type="text" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword"
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input 
              id="walletAddress"
              type="text" 
              placeholder="Enter your wallet address" 
              value={walletAddress} 
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-gray-700 text-white"
              required
            />
          </div>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Button variant="link" onClick={() => navigate('/login')} className="text-blue-400 hover:underline p-0">Login</Button>
        </p>
      </motion.div>
    </div>
  )
}