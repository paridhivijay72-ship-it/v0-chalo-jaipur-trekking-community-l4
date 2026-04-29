"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import TreksSection from "@/components/treks-section"
import GallerySection from "@/components/gallery-section"
import SafetySection from "@/components/safety-section"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import BirdAnimation from "@/components/bird-animation"
import RegistrationModal from "@/components/registration-modal"
import RegistrationCTA from "@/components/registration-cta"

export default function Home() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BirdAnimation />
      <Navigation />
      <HeroSection onOpenRegistration={() => setIsRegistrationOpen(true)} />
      <TreksSection />
      <GallerySection />
      <SafetySection />
      <AboutSection />
      <RegistrationCTA onOpenRegistration={() => setIsRegistrationOpen(true)} />
      <Footer />
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
    </main>
  )
}
