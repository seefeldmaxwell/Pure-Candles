import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import { NewsletterForm } from '../components/NewsletterForm'

const articles = [
  {
    id: 1,
    title: 'The Art of Candle Care: Making Your Candles Last',
    excerpt: 'Learn the essential tips for getting the most out of your Pure Candles, from the first light to the last glow.',
    image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=600&q=80',
    date: '2026-01-20',
    category: 'Tips & Tricks',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Behind the Scent: Creating Midnight Jasmine',
    excerpt: 'Discover the inspiration and process behind one of our most beloved fragrances.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    date: '2026-01-15',
    category: 'Behind the Scenes',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Setting the Perfect Ambiance for Your Wedding',
    excerpt: 'How to use candles to create unforgettable moments on your special day.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    date: '2026-01-10',
    category: 'Occasions',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'The Benefits of Soy Wax: Why We Choose Natural',
    excerpt: 'Understanding why soy wax is better for you, your home, and the environment.',
    image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=600&q=80',
    date: '2026-01-05',
    category: 'Sustainability',
    readTime: '4 min read',
  },
  {
    id: 5,
    title: 'Scent Pairing: Matching Candles to Seasons',
    excerpt: 'A guide to choosing the perfect fragrances for every time of year.',
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=600&q=80',
    date: '2025-12-28',
    category: 'Tips & Tricks',
    readTime: '5 min read',
  },
  {
    id: 6,
    title: 'Meet the Artisans: Our Candle Making Team',
    excerpt: 'Get to know the skilled craftspeople who hand-pour every Pure Candle.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    date: '2025-12-20',
    category: 'Behind the Scenes',
    readTime: '8 min read',
  },
]

const categories = ['All', 'Tips & Tricks', 'Behind the Scenes', 'Occasions', 'Sustainability']

export function Journal() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const featured = filteredArticles[0]
  const rest = filteredArticles.slice(1)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-[#f8f6f3]">
        <div className="container-narrow text-center">
          <h1 className="section-title mb-4">The Journal</h1>
          <p className="section-subtitle">
            Stories, tips, and inspiration from the world of Pure Candles
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-200">
        <div className="container-narrow">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm transition-colors ${
                  category === activeCategory
                    ? 'text-[#c9956c] border-b-2 border-[#c9956c]'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 md:py-24">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-[#c9956c] mb-4 block">
                  Featured
                </span>
                <h2 className="text-3xl md:text-4xl mb-4">{featured.title}</h2>
                <p className="text-gray-600 mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featured.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span>{featured.readTime}</span>
                </div>
                <button className="inline-flex items-center text-[#c9956c] font-medium hover:underline">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-narrow">
          <h2 className="section-title text-center mb-12">Latest Articles</h2>
          {rest.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((article) => (
                <article key={article.id} className="group bg-white">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs tracking-[0.1em] uppercase text-[#c9956c] mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="text-xl mb-3 group-hover:text-[#c9956c] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No articles in this category yet.</p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24">
        <div className="container-narrow text-center">
          <h2 className="section-title mb-4">Stay Inspired</h2>
          <p className="section-subtitle mb-8">
            Subscribe to receive our latest articles and exclusive content.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
