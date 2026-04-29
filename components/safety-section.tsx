import { Shield, Heart, Users, Wrench, Leaf, Gamepad2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const safetyFeatures = [
  {
    icon: Shield,
    title: "Experienced Trek Leaders",
    description: "Certified guides with years of trekking experience",
  },
  {
    icon: Heart,
    title: "First Aid Kit",
    description: "Complete medical supplies for emergencies",
  },
  {
    icon: Users,
    title: "Group Discipline Plan",
    description: "Organized group management for safety",
  },
  {
    icon: Wrench,
    title: "Proper Equipment",
    description: "Quality gear and safety equipment provided",
  },
  {
    icon: Leaf,
    title: "Environment Friendly",
    description: "Leave no trace, respect nature practices",
  },
  {
    icon: Gamepad2,
    title: "Post Trek Games",
    description: "Fun activities and team building exercises",
  },
]

export default function SafetySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Safety Guidelines</h2>
        <p className="text-center text-muted-foreground mb-12 text-pretty">Your safety is our top priority</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {safetyFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-balance">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
