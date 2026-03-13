import Link from "next/link"
import ScrollAnimation from "./animations/scroll-animation"
import Shimmer from "./animations/shimmer"
import Particles from "./animations/particles"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-20 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      <Particles className="z-5" count={50} color="rgba(255, 215, 0, 0.3)" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation variant="fadeInUp">
          <div className="max-w-4xl mx-auto bg-gray-800/70 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 md:p-12 shadow-xl shadow-amber-500/5 transform transition-all duration-500 hover:shadow-amber-500/20 hover:border-amber-500/40">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Stay{" "}
                <Shimmer>
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                    Ahead
                  </span>
                </Shimmer>
                {" "}of the Game
              </h2>
              <p className="text-xl text-gray-300">
                Get the latest scoop on Canadian casino bonuses and new releases.
                Stay informed with <span className="text-amber-400 font-bold">Calcasi Canada</span>!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <ScrollAnimation variant="fadeInLeft" delay={0.2}>
                <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/30">
                  <h3 className="text-xl font-bold mb-3 text-white">Exclusive Bonuses</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-amber-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Latest No-Deposit Offers
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-amber-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Limited Free Spin Campaigns
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-amber-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      High-Value Deposit Bonuses
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variant="fadeInRight" delay={0.2}>
                <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/30">
                  <h3 className="text-xl font-bold mb-3 text-white">Premium Content</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-amber-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Beginner-Friendly Guides
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-amber-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pro Strategies & Odds
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-amber-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      In-Depth Casino Reviews
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>

            <ScrollAnimation variant="fadeInUp" delay={0.4}>
              <div className="text-center">
                <Link
                  href="/latest-news"
                  className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-10 py-4 rounded-md transition-all duration-300 shadow-lg shadow-amber-500/20 text-lg transform hover:scale-105 active:scale-95"
                >
                  Check Latest News
                </Link>
                <p className="text-gray-400 mt-4 text-sm">*Information is updated frequently. Please verify terms on the official casino sites.</p>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
