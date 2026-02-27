import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Heart, ArrowLeft, Check } from 'lucide-react'
import { getProduct, products as allProducts } from '../data/products'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, hasItem } = useWishlistStore()

  const product = id ? getProduct(id) : null
  const isWishlisted = id ? hasItem(id) : false

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Product not found</h1>
          <Link to="/catalog" className="text-[#c9956c] hover:underline">
            Return to catalog
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, quantity)
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  // Related products (same mood or scent, excluding current)
  const relatedProducts = allProducts
    .filter(p => p.id !== product?.id && (
      p.mood.some(m => product?.mood.includes(m)) ||
      p.scent.some(s => product?.scent.includes(s))
    ))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <div className="container-narrow py-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link to="/catalog" className="inline-flex items-center text-sm text-gray-500 hover:text-[#c9956c] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalog
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 bg-gray-100 overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-[#c9956c]' : 'border-transparent'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="product-meta mb-2">{product.scent.join(' • ').toUpperCase()}</p>
            <h1 className="text-4xl md:text-5xl mb-4">{product.name}</h1>
            <p className="text-3xl text-[#c9956c] mb-6">${product.price.toFixed(2)}</p>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Scent Notes */}
            <div className="border-t border-gray-200 py-6 mb-6">
              <h3 className="filter-title mb-4">Scent Profile</h3>
              <div className="space-y-2">
                {product.details.map((detail) => (
                  <div key={detail.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{detail.label}</span>
                    <span className="text-gray-900">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 py-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Burn Time</span>
                  <p className="text-gray-900">{product.burnTime}</p>
                </div>
                <div>
                  <span className="text-gray-500">Weight</span>
                  <p className="text-gray-900">{product.weight}</p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-3 min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="h-5 w-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => product && toggleItem(product.id)}
                className={`p-3 border transition-colors ${
                  isWishlisted
                    ? 'border-[#c9956c] text-[#c9956c] bg-[#c9956c]/5'
                    : 'border-gray-200 hover:border-[#c9956c] hover:text-[#c9956c]'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                100% Natural Soy Wax
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Hand-Poured
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Cotton Wick
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Phthalate-Free
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-gray-200">
            <h2 className="section-title text-center mb-4">You May Also Like</h2>
            <p className="section-subtitle text-center mb-12">Based on similar scents and moods</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="product-card group">
                  <div className="product-card-image">
                    {p.isNew && (
                      <span className="badge-new flex items-center gap-1">
                        <span>✦</span> NEW
                      </span>
                    )}
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg group-hover:text-[#c9956c] transition-colors">{p.name}</h3>
                      <span className="price-tag">${p.price.toFixed(2)}</span>
                    </div>
                    <p className="product-meta mt-1">{p.scent.join(' · ').toUpperCase()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
