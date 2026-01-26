import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Eye, ShoppingBag, ChevronDown } from 'lucide-react'

// Product data
const products = [
  {
    id: 'midnight-jasmine',
    name: 'Midnight Jasmine',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80',
    scent: ['floral', 'woody'],
    mood: ['tranquility', 'romance'],
    isNew: true,
  },
  {
    id: 'cedar-driftwood',
    name: 'Cedar Driftwood',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80',
    scent: ['woody', 'fresh'],
    mood: ['grounding', 'focus'],
    isNew: false,
  },
  {
    id: 'citrus-ember',
    name: 'Citrus Ember',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=400&q=80',
    scent: ['citrus', 'spicy'],
    mood: ['energy', 'focus'],
    isNew: false,
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&q=80',
    scent: ['floral', 'fresh'],
    mood: ['tranquility', 'grounding'],
    isNew: false,
  },
  {
    id: 'vanilla-sandalwood',
    name: 'Vanilla Sandalwood',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=400&q=80',
    scent: ['woody', 'spicy'],
    mood: ['romance', 'grounding'],
    isNew: true,
  },
  {
    id: 'ocean-mist',
    name: 'Ocean Mist',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&q=80',
    scent: ['fresh', 'ozone'],
    mood: ['tranquility', 'focus'],
    isNew: false,
  },
  {
    id: 'rose-garden',
    name: 'Rose Garden',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1543333995-a78aea2eee50?w=400&q=80',
    scent: ['floral'],
    mood: ['romance', 'tranquility'],
    isNew: false,
  },
  {
    id: 'autumn-spice',
    name: 'Autumn Spice',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=400&q=80',
    scent: ['spicy', 'woody'],
    mood: ['grounding', 'energy'],
    isNew: true,
  },
]

const moodFilters = ['Tranquility', 'Focus', 'Romance', 'Energy', 'Grounding']
const scentFilters = ['Woody', 'Floral', 'Citrus', 'Spicy', 'Fresh', 'Ozone']
const sortOptions = ['Newest First', 'Price: Low to High', 'Price: High to Low', 'Name A-Z']

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMoods, setSelectedMoods] = useState<string[]>(
    searchParams.get('mood') ? [searchParams.get('mood')!] : []
  )
  const [selectedScents, setSelectedScents] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Newest First')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const toggleFilter = (filter: string, type: 'mood' | 'scent') => {
    if (type === 'mood') {
      setSelectedMoods(prev =>
        prev.includes(filter.toLowerCase())
          ? prev.filter(f => f !== filter.toLowerCase())
          : [...prev, filter.toLowerCase()]
      )
    } else {
      setSelectedScents(prev =>
        prev.includes(filter.toLowerCase())
          ? prev.filter(f => f !== filter.toLowerCase())
          : [...prev, filter.toLowerCase()]
      )
    }
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Mood filter
    if (selectedMoods.length > 0) {
      result = result.filter(p =>
        selectedMoods.some(mood => p.mood.includes(mood))
      )
    }

    // Scent filter
    if (selectedScents.length > 0) {
      result = result.filter(p =>
        selectedScents.some(scent => p.scent.includes(scent))
      )
    }

    // Sorting
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price)
        break
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price)
        break
      case 'Name A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [searchQuery, selectedMoods, selectedScents, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <div className="container-narrow py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pure scents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition text-sm"
                aria-label="Search products"
              />
            </div>

            {/* Mood Filter */}
            <div className="filter-section">
              <h3 className="filter-title flex items-center gap-2">
                <span className="text-gray-400">☰</span> Occasion Mood
              </h3>
              <div className="space-y-1">
                {moodFilters.map((mood) => (
                  <label key={mood} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedMoods.includes(mood.toLowerCase())}
                      onChange={() => toggleFilter(mood, 'mood')}
                      className="filter-checkbox"
                    />
                    <span className="text-sm text-gray-600">{mood}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Scent Filter */}
            <div className="filter-section">
              <h3 className="filter-title">Scent Profile</h3>
              <div className="space-y-1">
                {scentFilters.map((scent) => (
                  <label key={scent} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedScents.includes(scent.toLowerCase())}
                      onChange={() => toggleFilter(scent, 'scent')}
                      className="filter-checkbox"
                    />
                    <span className="text-sm text-gray-600">{scent}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="section-title">The Selection</h1>
                <p className="text-gray-500 mt-2">
                  {filteredProducts.length} pure vessels & pillars available
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm"
                  aria-expanded={showSortDropdown}
                  aria-haspopup="listbox"
                >
                  {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option)
                          setShowSortDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          sortBy === option ? 'text-[#c9956c]' : 'text-gray-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pure scents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-[#c9956c] outline-none transition text-sm"
                  aria-label="Search products"
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-card-image">
                    {product.isNew && (
                      <span className="badge-new flex items-center gap-1">
                        <span>✦</span> NEW
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <button
                          className="p-3 bg-white hover:bg-gray-100 transition-colors"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="p-3 bg-white hover:bg-gray-100 transition-colors"
                          aria-label={`View ${product.name} details`}
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <Link to={`/product/${product.id}`} className="hover:text-[#c9956c] transition-colors">
                        <h2 className="text-lg">{product.name}</h2>
                      </Link>
                      <span className="price-tag">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="product-meta mt-1">
                      {product.scent.join(' • ').toUpperCase()}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No products match your filters.</p>
                <button
                  onClick={() => {
                    setSelectedMoods([])
                    setSelectedScents([])
                    setSearchQuery('')
                  }}
                  className="mt-4 text-[#c9956c] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
