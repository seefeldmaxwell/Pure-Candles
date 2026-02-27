import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { products } from '../data/products'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  const totalItems = useCartStore((s) => s.totalItems())
  const openDrawer = useCartStore((s) => s.openDrawer)

  // Track scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
  }, [location.pathname])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close search on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const showSolidBg = !isHomePage || scrolled || mobileMenuOpen || searchOpen
  const textColor = showSolidBg ? 'text-gray-600' : 'text-white'
  const hoverTextColor = showSolidBg ? 'hover:text-[#c9956c]' : 'hover:text-white/80'

  const searchResults = searchQuery.length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.scent.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${showSolidBg ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <nav className="container-narrow" aria-label="Main navigation">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className={`nav-link ${textColor} ${hoverTextColor}`}>
              Catalog
            </Link>
            <Link to="/journal" className={`nav-link ${textColor} ${hoverTextColor}`}>
              Journal
            </Link>
            <Link to="/about" className={`nav-link ${textColor} ${hoverTextColor}`}>
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${showSolidBg ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${showSolidBg ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Pure Candles Home">
            <img
              src="https://imagedelivery.net/_YTjg6tu3dV3JnyQiIl6NQ/cd30f202-4f95-4b5b-72f8-59deaa6e9400/public"
              alt="Pure Candles"
              className="h-10 w-auto"
              width={40}
              height={40}
            />
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className={`p-2 transition-colors ${textColor} ${hoverTextColor}`}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openDrawer}
              className={`p-2 transition-colors relative ${textColor} ${hoverTextColor}`}
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#c9956c] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b border-gray-200 shadow-lg">
            <div className="container-narrow py-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candles, scents..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition text-sm"
                    aria-label="Search products"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Quick Results */}
              {searchResults.length > 0 && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Quick Results</p>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                      className="flex items-center gap-3 py-2 hover:bg-gray-50 px-2 -mx-2 transition-colors"
                    >
                      <img src={product.image} alt="" className="w-10 h-10 object-cover bg-gray-100" />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-400">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`)
                      setSearchOpen(false)
                      setSearchQuery('')
                    }}
                    className="text-sm text-[#c9956c] hover:underline mt-2 block"
                  >
                    View all results
                  </button>
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <p className="mt-3 text-sm text-gray-500">No results found for "{searchQuery}"</p>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              <Link
                to="/catalog"
                className="nav-link py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link
                to="/journal"
                className="nav-link py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Journal
              </Link>
              <Link
                to="/about"
                className="nav-link py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="nav-link py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <p className="filter-title mb-3">Shop by Occasion</p>
                <div className="flex flex-col space-y-2">
                  <Link to="/occasions/weddings" className="text-sm text-gray-600 hover:text-[#c9956c]" onClick={() => setMobileMenuOpen(false)}>Weddings</Link>
                  <Link to="/occasions/events" className="text-sm text-gray-600 hover:text-[#c9956c]" onClick={() => setMobileMenuOpen(false)}>Events</Link>
                  <Link to="/occasions/birthdays" className="text-sm text-gray-600 hover:text-[#c9956c]" onClick={() => setMobileMenuOpen(false)}>Birthdays</Link>
                  <Link to="/occasions/custom" className="text-sm text-gray-600 hover:text-[#c9956c]" onClick={() => setMobileMenuOpen(false)}>Custom Orders</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
