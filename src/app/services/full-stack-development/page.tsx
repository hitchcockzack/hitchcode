import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function FullStackDevelopment() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className={`${jetbrains.className} text-5xl font-bold text-black mb-8`}>
              Full-Stack Development
            </h1>
            <p className="text-xl text-black mb-8">
              End-to-end solutions that bring your vision to life, from concept to deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${jetbrains.className} text-3xl font-bold text-black mb-8`}>Our Approach</h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Modern Technology Stack</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We leverage cutting-edge technologies and frameworks to build scalable, performant applications. Our stack is carefully chosen to provide the best balance of innovation and stability.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Architecture & Design</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Every project begins with a solid architectural foundation. We design systems that are maintainable, scalable, and built to last, following industry best practices and patterns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Development Process</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our development process is iterative and collaborative. We maintain clear communication throughout the project, ensuring your vision is realized with precision and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${jetbrains.className} text-3xl font-bold text-black mb-8`}>Core Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Modern State Management</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Backend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Node.js & Express</li>
                  <li>Python & FastAPI</li>
                  <li>PostgreSQL & MongoDB</li>
                  <li>RESTful & GraphQL APIs</li>
                </ul>
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
              Ready to Build Something Great?
            </h2>
            <p className="text-gray-400 mb-8">
              Let's discuss how we can bring your project to life with modern full-stack development.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
