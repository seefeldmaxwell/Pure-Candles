import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isHomePage ? 'bg-transparent absolute' : 'bg-white border-b border-gray-100'}`}>
      <nav className="container-narrow" aria-label="Main navigation">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className={`nav-link ${isHomePage ? 'text-white hover:text-white/80' : ''}`}>
              Catalog
            </Link>
            <Link to="/journal" className={`nav-link ${isHomePage ? 'text-white hover:text-white/80' : ''}`}>
              Journal
            </Link>
            <Link to="/about" className={`nav-link ${isHomePage ? 'text-white hover:text-white/80' : ''}`}>
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
              <X className={`h-6 w-6 ${isHomePage ? 'text-white' : 'text-gray-900'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isHomePage ? 'text-white' : 'text-gray-900'}`} />
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
              className={`p-2 transition-colors ${isHomePage ? 'text-white hover:text-white/80' : 'text-gray-600 hover:text-gray-900'}`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/cart"
              className={`p-2 transition-colors ${isHomePage ? 'text-white hover:text-white/80' : 'text-gray-600 hover:text-gray-900'}`}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </div>
        </div>

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
