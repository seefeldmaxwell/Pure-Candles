import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Droplets, Wind, Flame } from 'lucide-react'
import { EditableText } from '../components/EditableText'

const categories = [
  {
    id: 'tranquility',
    name: 'Tranquility',
    description: 'Explore Pure Candles specifically curated for tranquility and atmosphere.',
    icon: Droplets,
    color: 'bg-blue-50 border-blue-100',
    link: '/catalog?mood=tranquility',
  },
  {
    id: 'focus',
    name: 'Focus',
    description: 'Explore Pure Candles specifically curated for focus and atmosphere.',
    icon: Wind,
    color: 'bg-green-50 border-green-100',
    link: '/catalog?mood=focus',
  },
  {
    id: 'grounding',
    name: 'Grounding',
    description: 'Explore Pure Candles specifically curated for grounding and atmosphere.',
    icon: Flame,
    color: 'bg-orange-50 border-orange-100',
    link: '/catalog?mood=grounding',
  },
]

const occasions = [
  { name: 'Weddings', slug: 'weddings', description: 'Elegant candles for your special day' },
  { name: 'Events', slug: 'events', description: 'Perfect ambiance for any gathering' },
  { name: 'Birthdays', slug: 'birthdays', description: 'Celebrate with warm, inviting scents' },
  { name: 'Bar Mitzvahs', slug: 'bar-mitzvahs', description: 'Traditional elegance for celebrations' },
  { name: 'Custom Orders', slug: 'custom', description: 'Personalized candles for any occasion' },
]

export function Home() {
  useEffect(() => {
    // Load Elfsight platform script
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block px-6 py-2 border border-white/30 text-white text-xs tracking-[0.2em] uppercase mb-8">
            <EditableText id="hero-tagline" elementType="text">
              Pillar & Scented Specialties
            </EditableText>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            <EditableText id="hero-title-1" as="span" elementType="heading">
              Hand-Poured
            </EditableText>{' '}
            <em className="font-normal">
              <EditableText id="hero-title-2" as="span" elementType="heading">
                Pure
              </EditableText>
            </em>
            <br />
            <em className="font-normal">
              <EditableText id="hero-title-3" as="span" elementType="heading">
                Perfection
              </EditableText>
            </em>
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            <EditableText id="hero-description" as="span" elementType="text" multiline>
              Pure Candles are the perfect companion for all your favorite occasions. From elegant pillar arrangements to intimate scented rituals.
            </EditableText>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="btn-primary">
              <EditableText id="hero-cta-1" as="span" elementType="button">
                Shop the Collection
              </EditableText>
            </Link>
            <Link to="/about" className="btn-outline">
              <EditableText id="hero-cta-2" as="span" elementType="button">
                Our Philosophy
              </EditableText>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <EditableText id="categories-title" as="span" elementType="heading">
                Curated for Every Ritual
              </EditableText>
            </h2>
            <p className="section-subtitle">
              <EditableText id="categories-subtitle" as="span" elementType="text">
                Whether it's a grand wedding or a quiet evening, find your perfect match.
              </EditableText>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className={`category-card ${category.color}`}
              >
                <div className="flex justify-center mb-6">
                  <category.icon className="w-10 h-10 text-gray-400" strokeWidth={1} />
                </div>
                <h3 className="text-2xl mb-3">{category.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{category.description}</p>
                <span className="inline-flex items-center text-[#c9956c] text-xs font-medium tracking-[0.1em] uppercase">
                  View Scents <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pillar Section */}
      <section className="py-20 md:py-28 bg-[#2d2d2d] text-white">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-[#3d3d3d] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=600&q=80"
                alt="Pure Candles Featured Pillar Edition"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <p className="text-[#c9956c] text-xs tracking-[0.2em] uppercase mb-6">
                <EditableText id="pillar-label" as="span" elementType="text">
                  Artisanal Specialty
                </EditableText>
              </p>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
                <EditableText id="pillar-title" as="span" elementType="heading">
                  Expertly crafted pillar arrangements
                </EditableText>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                <EditableText id="pillar-description" as="span" elementType="text" multiline>
                  Pure Candles specializes in hand-poured pillars that command attention. Our artisanal process ensures a clean, long-lasting burn for your most important occasions.
                </EditableText>
              </p>

              <div className="space-y-4 border-t border-gray-700 pt-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300 italic">Specialty</span>
                  <span className="text-xs tracking-[0.1em] uppercase text-gray-500">Pillar & Scented Collections</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300 italic">Occasions</span>
                  <span className="text-xs tracking-[0.1em] uppercase text-gray-500">Weddings, Dinners, Quiet Evenings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <EditableText id="occasions-title" as="span" elementType="heading">
                Shop by Occasion
              </EditableText>
            </h2>
            <p className="section-subtitle">
              <EditableText id="occasions-subtitle" as="span" elementType="text">
                Find the perfect candles for every moment that matters.
              </EditableText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {occasions.map((occasion) => (
              <Link
                key={occasion.slug}
                to={`/occasions/${occasion.slug}`}
                className="group bg-white p-8 border border-gray-200 hover:border-[#c9956c] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl mb-2 group-hover:text-[#c9956c] transition-colors">{occasion.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{occasion.description}</p>
                <span className="inline-flex items-center text-[#c9956c] text-xs font-medium tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="ml-2 h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed Section - Elfsight Widget */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <EditableText id="social-title" as="span" elementType="heading">
                Follow Our Journey
              </EditableText>
            </h2>
            <p className="section-subtitle">
              <EditableText id="social-subtitle" as="span" elementType="text" multiline>
                Stay connected with us on social media for the latest collections, behind-the-scenes content, and candle care tips.
              </EditableText>
            </p>
          </div>

          {/* Elfsight Social Feed Widget */}
          <div className="max-w-6xl mx-auto">
            <div className="elfsight-app-11596963-796e-4b79-89cf-e942bfbbd40e" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-28 bg-[#f8f6f3]">
        <div className="container-narrow text-center">
          <h2 className="section-title mb-4">
            <EditableText id="newsletter-title" as="span" elementType="heading">
              Join the Pure Candles Community
            </EditableText>
          </h2>
          <p className="section-subtitle mb-8">
            <EditableText id="newsletter-subtitle" as="span" elementType="text">
              Subscribe to receive exclusive offers, early access to new collections, and candle care tips.
            </EditableText>
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition"
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
