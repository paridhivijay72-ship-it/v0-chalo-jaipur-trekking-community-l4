"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

const photos = [
  "/images/gallery-1.jpeg", // Group cooking and bonding
  "/images/gallery-2.jpeg", // Trekkers hiking through forest
  "/images/gallery-3.jpeg", // Group on summit rocks
  "/images/gallery-4.jpeg", // Team in matching t-shirts
  "/images/gallery-5.jpeg", // Playing guitar during trek
  "/images/gallery-6.jpeg", // Group relaxing on rocks
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 text-balance">Photo Gallery</h2>

        <div className="relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center">
          {/* Center Logo */}
          <div className="absolute z-10 w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/whatsapp-20image-202025-12-17-20at-2012.jpeg"
              alt="Chalo Jaipur Logo"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rotating Photos */}
          <div className="relative w-full h-full">
            {photos.map((photo, index) => {
              const angle = (index * 360) / photos.length
              const radius = 250
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full overflow-hidden shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 hover:z-20 border-4 border-white cursor-pointer"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  onClick={() => setSelectedImage(photo)}
                >
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Gallery photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl max-h-[85vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-(--color-primary) transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery photo"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
