'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import ProblemList from './problemList'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback logout logic if onLogout is not provided
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ChainCode</h1>
      <div className="flex items-center space-x-4">
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <ProblemList />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}