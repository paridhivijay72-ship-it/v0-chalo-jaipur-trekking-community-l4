import { Users2, ShieldCheck, IndianRupee, Leaf } from "lucide-react"

const features = [
  {
    icon: Users2,
    title: "Community Focus",
    description: "Build lasting friendships",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Guided",
    description: "Expert trek leaders",
  },
  {
    icon: IndianRupee,
    title: "Affordable",
    description: "Just ₹50 per trek",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Respect for nature",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-balance">About Community</h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty leading-relaxed">
            Chalo Jaipur Trekking Community ek eco-friendly aur affordable trekking group hai jo har Sunday Jaipur ke
            best trails explore karta hai. Hamara focus safety, fun aur nature ke respect par hai. Join us for an
            unforgettable adventure where you'll meet like-minded explorers, discover hidden gems of Jaipur, and create
            memories that last a lifetime.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold mb-1 text-balance">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
