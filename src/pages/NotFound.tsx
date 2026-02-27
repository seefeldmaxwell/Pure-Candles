import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container-narrow py-20 text-center">
        <p className="text-[#c9956c] text-xs tracking-[0.2em] uppercase mb-6">Page Not Found</p>
        <h1 className="text-6xl md:text-8xl mb-6">404</h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved. Let us help you find your way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center">
            Back to Home <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/catalog" className="btn-outline-dark inline-flex items-center">
            Browse Catalog <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
