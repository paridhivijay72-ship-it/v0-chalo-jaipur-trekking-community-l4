"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, IndianRupee } from "lucide-react"
import Image from "next/image"

const treks = [
  {
    name: "Jal Mahal View Point",
    image: "/jal-mahal-water-palace-jaipur-scenic-view.jpg",
    time: "7:00 AM - 11:00 AM",
  },
  {
    name: "Jhalana Leopard Trek",
    image: "/jhalana-leopard-safari-forest-trail-jaipur.jpg",
    time: "6:30 AM - 11:00 AM",
  },
  {
    name: "Nahargarh Fort Twin Tower",
    image: "/nahargarh-fort-twin-towers-sunset-jaipur.jpg",
    time: "6:00 AM - 10:30 AM",
  },
  {
    name: "Bhankrota Trek",
    image: "/bhankrota-hills-trekking-trail-jaipur.jpg",
    time: "7:00 AM - 11:30 AM",
  },
  {
    name: "San Valley Trek",
    image: "/san-valley-nature-trail-green-mountains.jpg",
    time: "6:30 AM - 11:00 AM",
  },
  {
    name: "Jaigarh Fort Trek",
    image: "/jaigarh-fort-mountain-trek-jaipur-panoramic-view.jpg",
    time: "6:00 AM - 10:00 AM",
  },
]

export default function TreksSection() {
  return (
    <section id="tracks" className="py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Our Sunday Treks</h2>
        <p className="text-center text-muted-foreground mb-12 text-pretty">
          Join us every Sunday for an adventure of a lifetime
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {treks.map((trek) => (
            <Card
              key={trek.name}
              className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-x-2 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={trek.image || "/placeholder.svg"}
                  alt={trek.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-3 text-balance">{trek.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{trek.time}</span>
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold text-secondary">
                  <IndianRupee className="w-5 h-5" />
                  <span>50 with Refreshment</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
