import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="https://imagedelivery.net/_YTjg6tu3dV3JnyQiIl6NQ/cd30f202-4f95-4b5b-72f8-59deaa6e9400/public"
                alt="Pure Candles"
                className="h-12 w-auto brightness-0 invert"
                width={48}
                height={48}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Hand-poured artisanal candles crafted with 100% natural soy wax and premium fragrances.
              Illuminate your moments with Pure Candles.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/purecandles" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com/purecandles" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://pinterest.com/purecandles" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Pinterest">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">All Candles</Link></li>
              <li><Link to="/catalog?scent=floral" className="text-gray-400 hover:text-white transition-colors">Floral Scents</Link></li>
              <li><Link to="/catalog?scent=woody" className="text-gray-400 hover:text-white transition-colors">Woody Scents</Link></li>
              <li><Link to="/catalog?scent=fresh" className="text-gray-400 hover:text-white transition-colors">Fresh Scents</Link></li>
              <li><Link to="/occasions/custom" className="text-gray-400 hover:text-white transition-colors">Custom Orders</Link></li>
            </ul>
          </div>

          {/* Occasions Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-6">Occasions</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/occasions/weddings" className="text-gray-400 hover:text-white transition-colors">Weddings</Link></li>
              <li><Link to="/occasions/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/occasions/birthdays" className="text-gray-400 hover:text-white transition-colors">Birthdays</Link></li>
              <li><Link to="/occasions/bar-mitzvahs" className="text-gray-400 hover:text-white transition-colors">Bar Mitzvahs</Link></li>
              <li><Link to="/occasions/retail" className="text-gray-400 hover:text-white transition-colors">Retail</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/journal" className="text-gray-400 hover:text-white transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Pure Candles. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
              <a href="/robots.txt" className="text-gray-500 hover:text-white transition-colors">Robots.txt</a>
              <a href="/llms.txt" className="text-gray-500 hover:text-white transition-colors">LLMs.txt</a>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Pure Candles",
          "url": "https://purecandles.com",
          "logo": "https://imagedelivery.net/_YTjg6tu3dV3JnyQiIl6NQ/cd30f202-4f95-4b5b-72f8-59deaa6e9400/public",
          "description": "Hand-poured artisanal candles crafted with 100% natural soy wax and premium fragrances.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "hello@purecandles.com"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Candle Lane",
            "addressLocality": "Portland",
            "addressRegion": "OR",
            "postalCode": "97201",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://instagram.com/purecandles",
            "https://facebook.com/purecandles",
            "https://pinterest.com/purecandles"
          ]
        })
      }} />
    </footer>
  )
}
