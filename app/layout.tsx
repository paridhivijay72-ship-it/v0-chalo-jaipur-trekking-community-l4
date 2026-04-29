import type React from "react"
import type { Metadata } from "next"
import { Poppins, Roboto } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Chalo Jaipur Trekking Community - Explore Jaipur's Best Trails",
  description:
    "Join Chalo Jaipur Trekking Community for affordable, safe, and eco-friendly Sunday treks around Jaipur. Explore Nahargarh, Jaigarh, Jhalana and more!",
  generator: "v0.app",
  keywords: ["Jaipur trekking", "Sunday treks", "Nahargarh Fort", "Jhalana leopard trek", "eco-friendly trekking"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
