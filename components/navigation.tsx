"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import AuthModal from "./auth-modal"
import { User } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-white/80" : "backdrop-blur-sm bg-white/60"
        } rounded-full shadow-lg px-8 py-3`}
      >
        <div className="flex items-center gap-8">
          <Image
            src="/images/whatsapp-20image-202025-12-17-20at-2012.jpeg"
            alt="Chalo Jaipur Logo"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full"
          />
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <button onClick={() => scrollToSection("home")} className="hover:text-primary transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
                About
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("tracks")} className="hover:text-primary transition-colors">
                Tracks
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("gallery")} className="hover:text-primary transition-colors">
                Gallery
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">
                Contact
              </button>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={() => openAuthModal("login")}
                    className="px-4 py-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-full transition-colors"
                  >
                    Signup
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/profile">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-full transition-colors">
                    <User className="w-4 h-4" />
                    My Account
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}
