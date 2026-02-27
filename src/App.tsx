import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { ScrollToTop } from './components/ScrollToTop'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const Catalog = lazy(() => import('./pages/Catalog').then(m => ({ default: m.Catalog })))
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })))
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })))
const OccasionPage = lazy(() => import('./pages/OccasionPage').then(m => ({ default: m.OccasionPage })))
const Journal = lazy(() => import('./pages/Journal').then(m => ({ default: m.Journal })))
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-1 pt-16 md:pt-20">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/cart" element={<Cart />} />

            {/* Occasion Pages */}
            <Route path="/occasions/:occasion" element={<OccasionPage />} />

            {/* Redirects for legacy/alternative URLs */}
            <Route path="/products" element={<Navigate to="/catalog" replace />} />
            <Route path="/shop" element={<Navigate to="/catalog" replace />} />
            <Route path="/weddings" element={<Navigate to="/occasions/weddings" replace />} />
            <Route path="/events" element={<Navigate to="/occasions/events" replace />} />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default App
