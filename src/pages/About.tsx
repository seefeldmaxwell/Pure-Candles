import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const values = [
  {
    title: 'Artisanal Craft',
    description: 'Each candle is hand-poured in small batches by skilled artisans who take pride in their craft.',
  },
  {
    title: 'Natural Ingredients',
    description: '100% natural soy wax, cotton wicks, and phthalate-free fragrances for a cleaner burn.',
  },
  {
    title: 'Sustainable Practice',
    description: 'Eco-friendly packaging, recyclable materials, and a commitment to reducing our footprint.',
  },
  {
    title: 'Community Focus',
    description: 'Supporting local suppliers and creating products that bring people together.',
  },
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & Lead Chandler',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
  },
  {
    name: 'Michael Torres',
    role: 'Master Perfumer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
  },
  {
    name: 'Emily Watson',
    role: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
  },
]

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center -mt-16 md:-mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl text-white mb-6">Our Philosophy</h1>
          <p className="text-xl text-white/90">
            Crafting moments of warmth and tranquility through the art of candlemaking
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c9956c] text-xs tracking-[0.2em] uppercase mb-6">Our Story</p>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
                Born from a love of light and scent
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Pure Candles began in 2018 in a small Portland workshop, born from a simple
                  belief: everyone deserves to experience the transformative power of a
                  beautifully crafted candle.
                </p>
                <p>
                  What started as a passion project quickly grew into something more. Friends
                  and family couldn't get enough of our hand-poured creations, and word spread
                  through the community about the quality and care we put into every candle.
                </p>
                <p>
                  Today, we remain true to our founding principles: using only the finest
                  natural ingredients, hand-pouring every candle, and creating scents that
                  tell a story and evoke emotion.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80"
                alt="Candle making process"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80"
                alt="Pure Candles workshop"
                className="w-full aspect-[3/4] object-cover mt-8"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-[#f8f6f3]">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">What We Stand For</h2>
            <p className="section-subtitle">
              Our values guide every decision we make, from sourcing to shipping.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border border-[#c9956c] rounded-full flex items-center justify-center">
                  <span className="text-[#c9956c] text-2xl font-light">{idx + 1}</span>
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=600&q=80"
                alt="Hand-pouring candles"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[#c9956c] text-xs tracking-[0.2em] uppercase mb-6">Our Process</p>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
                Crafted by hand, poured with intention
              </h2>
              <div className="space-y-6">
                <div className="border-l-2 border-[#c9956c] pl-6">
                  <h4 className="font-medium mb-2">1. Sourcing</h4>
                  <p className="text-gray-600 text-sm">
                    We carefully select natural soy wax and premium essential oils from trusted suppliers.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                  <h4 className="font-medium mb-2">2. Blending</h4>
                  <p className="text-gray-600 text-sm">
                    Our master perfumer creates unique scent combinations that evoke emotion and memory.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                  <h4 className="font-medium mb-2">3. Pouring</h4>
                  <p className="text-gray-600 text-sm">
                    Each candle is hand-poured at the perfect temperature for optimal scent throw.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                  <h4 className="font-medium mb-2">4. Curing</h4>
                  <p className="text-gray-600 text-sm">
                    Candles cure for 2 weeks to ensure the fragrance fully binds with the wax.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-[#2d2d2d] text-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Meet the Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The passionate individuals behind every Pure Candle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  loading="lazy"
                />
                <h3 className="text-xl mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container-narrow text-center">
          <h2 className="section-title mb-4">Experience Pure Candles</h2>
          <p className="section-subtitle mb-8">
            Discover our collection and find your perfect scent.
          </p>
          <Link to="/catalog" className="btn-primary inline-flex items-center">
            Shop the Collection <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
