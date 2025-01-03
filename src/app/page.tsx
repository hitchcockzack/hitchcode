import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className={`${jetbrains.className} text-6xl md:text-8xl font-bold text-black mb-6`}>
            HITCHCODE
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto text-center mb-8">
            Crafting cutting-edge software solutions with precision and elegance.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="border border-black px-8 py-3 rounded-md hover:bg-gray-50 text-black transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className={`${jetbrains.className} text-4xl font-bold text-center text-black mb-16`}>
            Full-Stack Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-black transition-colors text-black"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${jetbrains.className} text-4xl font-bold mb-8`}>
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Let's collaborate to build something extraordinary. From concept to deployment,
            we're here to bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}

const services = [
  {
    title: "Frontend Development",
    description: "Creating responsive, intuitive user interfaces with modern frameworks and cutting-edge technologies."
  },
  {
    title: "Backend Architecture",
    description: "Building robust, scalable server-side solutions and APIs that power your applications."
  },
  {
    title: "Full-Stack Solutions",
    description: "End-to-end development services, from database design to deployment and maintenance."
  }
]
