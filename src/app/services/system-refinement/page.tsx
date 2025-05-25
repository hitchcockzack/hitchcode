import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function SystemRefinement() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className={`${jetbrains.className} text-5xl font-bold text-black mb-8`}>
              System Refinement
            </h1>
            <p className="text-xl text-black mb-8">
              Elevate your existing systems to peak performance through strategic optimization and modernization.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${jetbrains.className} text-3xl font-bold text-black mb-8`}>Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl border border-black/5">
                <h3 className="text-xl font-semibold mb-4 text-black">Enhanced Performance</h3>
                <p className="text-gray-600">
                  Optimize system speed and responsiveness through advanced performance tuning and architecture improvements.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-black/5">
                <h3 className="text-xl font-semibold mb-4 text-black">Improved Reliability</h3>
                <p className="text-gray-600">
                  Strengthen system stability and reduce downtime through robust error handling and failover mechanisms.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-black/5">
                <h3 className="text-xl font-semibold mb-4 text-black">Modern Architecture</h3>
                <p className="text-gray-600">
                  Update legacy systems with modern design patterns and technologies while maintaining business continuity.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-black/5">
                <h3 className="text-xl font-semibold mb-4 text-black">Scalable Solutions</h3>
                <p className="text-gray-600">
                  Prepare your systems for growth with architectures that scale efficiently with your business needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${jetbrains.className} text-3xl font-bold text-black mb-8`}>Our Approach</h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">System Analysis</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Comprehensive evaluation of your current system's architecture, performance bottlenecks, and potential areas for improvement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Strategic Planning</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Development of a detailed optimization plan that prioritizes improvements based on impact and business requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Iterative Implementation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Careful execution of improvements in phases, ensuring minimal disruption to your business operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${jetbrains.className} text-3xl font-bold mb-6`}>
              Ready to Optimize Your Systems?
            </h2>
            <p className="text-gray-400 mb-8">
              Let's discuss how we can enhance your existing systems for better performance and reliability.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'HitchCode | System Refinement',
  description: 'Make your systems faster, stronger, and ready for more.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
};
