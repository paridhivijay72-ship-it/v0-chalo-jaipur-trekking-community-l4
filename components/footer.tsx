import { Instagram, Facebook, MessageCircle, Youtube, Mail, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-primary via-secondary to-primary py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white/30">
              <Image
                src="/images/whatsapp-20image-202025-12-17-20at-2012.jpeg"
                alt="Chalo Jaipur Logo"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description */}
          <h3 className="font-heading text-2xl font-bold mb-3">Chalo Jaipur Trekking Community</h3>
          <p className="text-white/90 mb-2 text-pretty">Explore Jaipur's hidden trails every Sunday</p>
          <p className="text-white/90 mb-8 text-pretty">Safe, affordable, and eco-friendly trekking experiences</p>

          {/* Contact Details */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Mail className="w-5 h-5" />
              <a href="mailto:somyakhandelwal300@gmail.com" className="hover:text-white transition-colors">
                somyakhandelwal300@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Phone className="w-5 h-5" />
              <a href="tel:+918824344598" className="hover:text-white transition-colors">
                +91 88243 44598
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Instagram className="w-5 h-5" />
              <a
                href="https://www.instagram.com/chalo.jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @chalo.jaipur
              </a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.instagram.com/chalo.jaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-secondary transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-destructive transition-all duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()} Chalo Jaipur Trekking Community. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
