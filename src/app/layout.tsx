import { type Metadata } from 'next'
import Image from 'next/image'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Clinic Name',
  description: 'Book appointments with our doctors',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.variable} font-sans antialiased bg-white text-black`}>
          <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image 
                  src="/BEVA1.svg" 
                  alt="BEVA Clinic" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto"
                />
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <a 
                  href="/#procedures" 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  Procedures
                </a>
                <a 
                  href="/#about" 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  About
                </a>
                <a 
                  href="/#contact" 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  Contact
                </a>
                <a 
                  href="/#faq" 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  FAQ
                </a>
              </nav>
              
              {/* Desktop Auth */}
              <div className="hidden md:flex items-center gap-4">
                <SignedOut>
                  <Button asChild variant="ghost" className="text-gray-700 hover:text-black">
                    <a href="/sign-in">Sign In</a>
                  </Button>
                  <Button asChild variant="ghost" className="text-gray-700 hover:text-black">
                    <a href="/sign-up">Register</a>
                  </Button>
                  <Button asChild className="bg-black text-white hover:bg-gray-800">
                    <a href="/bookings">My Bookings</a>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Button asChild className="bg-black text-white hover:bg-gray-800">
                    <a href="/bookings">My Bookings</a>
                  </Button>
                  <UserButton />
                </SignedIn>
              </div>
              
              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-black">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] bg-white">
                    <SheetTitle className="text-left text-lg font-bold text-black mb-6">
                      Menu
                    </SheetTitle>
                    
                    {/* Mobile Nav Links */}
                    <nav className="flex flex-col gap-4 mb-8">
                      <a 
                        href="/#procedures" 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        Procedures
                      </a>
                      <a 
                        href="/#about" 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        About
                      </a>
                      <a 
                        href="/#contact" 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        Contact
                      </a>
                      <a 
                        href="/#faq" 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        FAQ
                      </a>
                    </nav>
                    
                    {/* Mobile Auth */}
                    <div className="flex flex-col gap-3">
                      <SignedOut>
                        <Button asChild variant="outline" className="w-full border-black text-black hover:bg-gray-100">
                          <a href="/sign-in">Sign In</a>
                        </Button>
                        <Button asChild variant="outline" className="w-full border-black text-black hover:bg-gray-100">
                          <a href="/sign-up">Register</a>
                        </Button>
                        <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                          <a href="/bookings">My Bookings</a>
                        </Button>
                      </SignedOut>
                      <SignedIn>
                        <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                          <a href="/bookings">My Bookings</a>
                        </Button>
                        <div className="flex items-center justify-center gap-2 py-2">
                          <span className="text-sm text-gray-600">Logged in as</span>
                          <UserButton />
                        </div>
                      </SignedIn>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
