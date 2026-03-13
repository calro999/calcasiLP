import { Dice5, Shield, CreditCard, Trophy, Clock, Gift } from "lucide-react"
import ScrollAnimation from "./animations/scroll-animation"
import Floating from "./animations/floating"

export default function Features() {
  const features = [
    {
      icon: <Dice5 size={28} className="text-amber-400" />,
      title: "Wide Variety of Games",
      description: "Enjoy over 500+ games including slots, poker, blackjack, and live roulette from top providers.",
    },
    {
      icon: <Shield size={28} className="text-amber-400" />,
      title: "Safe & Secure Environment",
      description: "Your safety is our priority. We only list casinos with the latest encryption and strict regulations.",
    },
    {
      icon: <CreditCard size={28} className="text-amber-400" />,
      title: "Fast Deposits & Withdrawals",
      description: "Supports major payment methods including Interac, credit cards, and crypto for seamless transactions.",
    },
    {
      icon: <Trophy size={28} className="text-amber-400" />,
      title: "Tiered VIP Rewards",
      description: "Unlock exclusive perks, higher limits, and personalized bonuses as you climb the VIP ranks.",
    },
    {
      icon: <Clock size={28} className="text-amber-400" />,
      title: "24/7 Expert Support",
      description: "Pro support teams are available around the clock to help with any questions or issues.",
    },
    {
      icon: <Gift size={28} className="text-amber-400" />,
      title: "Massive Welcome Bonuses",
      description: "Get the best value with exclusive welcome offers, free spins, and reload bonuses for Canadians.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                Hand-Picked
              </span>
              {" "}Top Casinos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the most lucrative bonuses and secure platforms in Canada.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation key={index} variant="fadeInUp" delay={0.1 * index} className="h-full">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/10 h-full transform hover:translate-y-[-5px] hover:scale-[1.02]">
                <Floating amplitude={5} duration={3} delay={index * 0.5}>
                  <div className="w-14 h-14 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                </Floating>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
