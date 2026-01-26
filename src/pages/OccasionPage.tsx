import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

// Occasion data
const occasionData: Record<string, {
  title: string
  subtitle: string
  description: string
  heroImage: string
  features: string[]
  products: { id: string; name: string; price: number; image: string }[]
  testimonial?: { text: string; author: string; role: string }
}> = {
  weddings: {
    title: 'Candles for Weddings',
    subtitle: 'Illuminate Your Special Day',
    description: 'Create an unforgettable atmosphere for your wedding with our curated collection of elegant pillar candles and scented vessels. From ceremony to reception, our candles add warmth and romance to every moment.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    features: [
      'Bulk ordering available for large events',
      'Custom scent blending for your special day',
      'Elegant packaging options',
      'Consultation with our event specialists',
      'Same-day delivery available',
    ],
    products: [
      { id: 'vanilla-sandalwood', name: 'Vanilla Sandalwood', price: 36.00, image: 'https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=400&q=80' },
      { id: 'rose-garden', name: 'Rose Garden', price: 38.00, image: 'https://images.unsplash.com/photo-1543333995-a78aea2eee50?w=400&q=80' },
      { id: 'midnight-jasmine', name: 'Midnight Jasmine', price: 34.00, image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80' },
    ],
    testimonial: {
      text: 'Pure Candles made our wedding reception absolutely magical. The scent and ambiance were perfect.',
      author: 'Sarah & Michael',
      role: 'Married June 2025',
    },
  },
  events: {
    title: 'Candles for Event Planners',
    subtitle: 'Professional Solutions for Every Occasion',
    description: 'Partner with Pure Candles for your event planning needs. We offer wholesale pricing, custom branding options, and dedicated support for event professionals.',
    heroImage: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80',
    features: [
      'Wholesale pricing for bulk orders',
      'Custom branding and labeling',
      'Flexible delivery scheduling',
      'Dedicated account manager',
      'Sample kits available',
    ],
    products: [
      { id: 'cedar-driftwood', name: 'Cedar Driftwood', price: 32.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80' },
      { id: 'ocean-mist', name: 'Ocean Mist', price: 30.00, image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&q=80' },
      { id: 'lavender-dream', name: 'Lavender Dream', price: 28.00, image: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&q=80' },
    ],
  },
  birthdays: {
    title: 'Candles for Birthdays',
    subtitle: 'Celebrate Another Year',
    description: 'Make every birthday celebration memorable with our festive scents and beautiful presentation. Perfect as gifts or to set the mood for the party.',
    heroImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    features: [
      'Gift wrapping available',
      'Personalized gift messages',
      'Birthday-themed scent collections',
      'Gift sets and bundles',
      'Express delivery options',
    ],
    products: [
      { id: 'citrus-ember', name: 'Citrus Ember', price: 34.00, image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=400&q=80' },
      { id: 'vanilla-sandalwood', name: 'Vanilla Sandalwood', price: 36.00, image: 'https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=400&q=80' },
      { id: 'autumn-spice', name: 'Autumn Spice', price: 32.00, image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=400&q=80' },
    ],
  },
  'bar-mitzvahs': {
    title: 'Candles for Bar Mitzvahs',
    subtitle: 'Honor This Sacred Milestone',
    description: 'Celebrate this important milestone with elegance. Our candles add a touch of sophistication to Bar and Bat Mitzvah celebrations.',
    heroImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
    features: [
      'Traditional and modern styles',
      'Custom colors to match your theme',
      'Havdalah candle sets',
      'Centerpiece arrangements',
      'Favors and party gifts',
    ],
    products: [
      { id: 'midnight-jasmine', name: 'Midnight Jasmine', price: 34.00, image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80' },
      { id: 'cedar-driftwood', name: 'Cedar Driftwood', price: 32.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80' },
      { id: 'lavender-dream', name: 'Lavender Dream', price: 28.00, image: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&q=80' },
    ],
  },
  bris: {
    title: 'Candles for Bris Ceremonies',
    subtitle: 'Welcome New Beginnings',
    description: 'Soft, gentle scents perfect for welcoming new life. Our carefully selected collection creates a warm, peaceful atmosphere for this sacred celebration.',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',
    features: [
      'Gentle, baby-safe scents',
      'Elegant white pillar candles',
      'Soft glow, minimal smoke',
      'Traditional ceremony candles',
      'Gift packages for family',
    ],
    products: [
      { id: 'lavender-dream', name: 'Lavender Dream', price: 28.00, image: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&q=80' },
      { id: 'ocean-mist', name: 'Ocean Mist', price: 30.00, image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&q=80' },
      { id: 'vanilla-sandalwood', name: 'Vanilla Sandalwood', price: 36.00, image: 'https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=400&q=80' },
    ],
  },
  retail: {
    title: 'Candles for Retail',
    subtitle: 'Stock Your Shelves with Quality',
    description: 'Partner with Pure Candles to bring premium, artisanal candles to your retail location. We offer competitive wholesale pricing and marketing support.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
    features: [
      'Competitive wholesale pricing',
      'Marketing materials provided',
      'Display stands available',
      'Seasonal collections',
      'Reorder automation',
    ],
    products: [
      { id: 'citrus-ember', name: 'Citrus Ember', price: 34.00, image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=400&q=80' },
      { id: 'midnight-jasmine', name: 'Midnight Jasmine', price: 34.00, image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80' },
      { id: 'autumn-spice', name: 'Autumn Spice', price: 32.00, image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=400&q=80' },
    ],
  },
  personal: {
    title: 'Candles for Personal Use',
    subtitle: 'Everyday Luxury for Your Home',
    description: 'Transform your daily rituals with our premium scented candles. Perfect for self-care, relaxation, and creating your personal sanctuary.',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    features: [
      'Subscription options available',
      'Mix and match bundles',
      'Seasonal limited editions',
      'Refill program',
      'Loyalty rewards',
    ],
    products: [
      { id: 'lavender-dream', name: 'Lavender Dream', price: 28.00, image: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&q=80' },
      { id: 'ocean-mist', name: 'Ocean Mist', price: 30.00, image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&q=80' },
      { id: 'cedar-driftwood', name: 'Cedar Driftwood', price: 32.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80' },
    ],
  },
  custom: {
    title: 'Custom Made Candles',
    subtitle: 'Your Vision, Our Craft',
    description: 'Create something truly unique. Work with our artisans to design custom candles with your choice of scent, color, vessel, and branding.',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    features: [
      'Custom scent development',
      'Private label options',
      'Unique vessel sourcing',
      'Corporate gifting programs',
      'Minimum orders starting at 50 units',
    ],
    products: [
      { id: 'rose-garden', name: 'Rose Garden', price: 38.00, image: 'https://images.unsplash.com/photo-1543333995-a78aea2eee50?w=400&q=80' },
      { id: 'vanilla-sandalwood', name: 'Vanilla Sandalwood', price: 36.00, image: 'https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=400&q=80' },
      { id: 'midnight-jasmine', name: 'Midnight Jasmine', price: 34.00, image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80' },
    ],
  },
}

export function OccasionPage() {
  const { occasion } = useParams<{ occasion: string }>()
  const data = occasion ? occasionData[occasion] : null

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Page not found</h1>
          <Link to="/" className="text-[#c9956c] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${data.heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl text-white mb-4">{data.title}</h1>
          <p className="text-xl text-white/90">{data.subtitle}</p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 leading-relaxed">{data.description}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-narrow">
          <h2 className="section-title text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4">
                <Check className="h-5 w-5 text-[#c9956c] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <h2 className="section-title text-center mb-4">Recommended Selection</h2>
          <p className="section-subtitle text-center mb-12">
            Our top picks for this occasion
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card group">
                <div className="product-card-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg group-hover:text-[#c9956c] transition-colors">{product.name}</h3>
                    <span className="price-tag">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalog" className="btn-outline-dark">
              View Full Catalog <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {data.testimonial && (
        <section className="py-16 md:py-24 bg-[#f8f6f3]">
          <div className="container-narrow">
            <div className="max-w-2xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl italic text-gray-700 mb-6">
                "{data.testimonial.text}"
              </blockquote>
              <cite className="not-italic">
                <span className="block text-lg font-medium">{data.testimonial.author}</span>
                <span className="text-gray-500">{data.testimonial.role}</span>
              </cite>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#2d2d2d] text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Contact our team to discuss your needs and receive a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link to="/catalog" className="btn-outline">
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
