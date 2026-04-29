"use client"

import { Button } from "@/components/ui/button"

interface RegistrationCTAProps {
  onOpenRegistration: () => void
}

export default function RegistrationCTA({ onOpenRegistration }: RegistrationCTAProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[#FFC93C] via-[#6BCF9B] to-[#FFC93C]">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Join Our Trekking Community?
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Register now for our upcoming Sunday treks and be part of an amazing adventure with fellow trekking
            enthusiasts!
          </p>
          <Button
            onClick={onOpenRegistration}
            size="lg"
            className="bg-[#FFC93C] hover:bg-[#ffb700] text-gray-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Register Now - Only ₹50
          </Button>
          <p className="text-sm text-gray-600 mt-4">
            Quick registration • Instant confirmation • Join our WhatsApp group
          </p>
        </div>
      </div>
    </section>
  )
}
