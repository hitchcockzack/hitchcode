import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function TechnologyConsulting() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className={`${jetbrains.className} text-5xl font-bold text-black mb-8`}>
              Technology Consulting
            </h1>
            <p className="text-xl text-black mb-8">
              Strategic guidance to navigate the evolving technology landscape and drive digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${jetbrains.className} text-3xl font-bold text-black mb-8`}>Our Services</h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Technology Strategy</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Develop comprehensive technology roadmaps aligned with your business objectives. We help you make informed decisions about technology investments and implementation timelines.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Digital Transformation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Guide your organization through digital transformation initiatives. We help identify opportunities, mitigate risks, and implement changes that drive business value.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Technology Assessment</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Evaluate your current technology stack and identify areas for improvement. We provide actionable recommendations to enhance efficiency and reduce technical debt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${jetbrains.className} text-3xl font-bold text-black mb-8`}>Our Process</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-none">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">1</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Discovery & Assessment</h3>
                  <p className="text-gray-600">Understand your current state, challenges, and objectives through thorough analysis.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-none">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">2</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Strategy Development</h3>
                  <p className="text-gray-600">Create a tailored roadmap that aligns technology initiatives with business goals.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-none">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">3</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Implementation Planning</h3>
                  <p className="text-gray-600">Define clear steps, timelines, and resources needed for successful execution.</p>
                </div>
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
              Transform Your Business
            </h2>
            <p className="text-gray-400 mb-8">
              Let's discuss how we can help you navigate the technology landscape and drive innovation.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'HitchCode | Technology Consulting',
  description: 'Practical tech advice for real results.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
};
