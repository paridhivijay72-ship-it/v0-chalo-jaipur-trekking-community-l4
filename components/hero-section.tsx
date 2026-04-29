"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroSectionProps {
  onOpenRegistration?: () => void
}

export default function HeroSection({ onOpenRegistration }: HeroSectionProps) {
  const scrollToTracks = () => {
    const element = document.getElementById("tracks")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/amer-fort-jaipur-majestic-view-sunset-golden-hour.jpg"
          alt="Amer Fort Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left Side - Institution Name */}
          <div className="flex-1">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
              Chalo Jaipur
              <br />
              <span className="text-primary">Trekking Community</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
              Explore Jaipur's hidden trails every Sunday with experienced guides, safety first approach, and
              eco-friendly practices.
            </p>
          </div>

          {/* Right Side - Logo */}
          <div className="hidden md:flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/images/whatsapp-20image-202025-12-17-20at-2012.jpeg"
                alt="Chalo Jaipur Logo"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Buttons Below Logo */}
            <div className="flex flex-col gap-3 w-full">
              <Button
                size="lg"
                onClick={scrollToTracks}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Explore Treks
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onOpenRegistration}
                className="w-full border-2 border-secondary text-secondary-foreground hover:bg-secondary hover:text-white font-medium bg-transparent"
              >
                Registration Form
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex flex-col gap-3 mt-8 max-w-md">
          <Button
            size="lg"
            onClick={scrollToTracks}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Explore Treks
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onOpenRegistration}
            className="w-full border-2 border-secondary text-secondary-foreground hover:bg-secondary hover:text-white font-medium bg-transparent"
          >
            Registration Form
          </Button>
        </div>
      </div>
    </section>
  )
}
