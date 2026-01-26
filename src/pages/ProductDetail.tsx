import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Heart, ArrowLeft, Check } from 'lucide-react'

// Product data (in production, this would come from API)
const products: Record<string, {
  id: string
  name: string
  price: number
  image: string
  images: string[]
  scent: string[]
  mood: string[]
  description: string
  details: { label: string; value: string }[]
  burnTime: string
  weight: string
}> = {
  'midnight-jasmine': {
    id: 'midnight-jasmine',
    name: 'Midnight Jasmine',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=600&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    ],
    scent: ['floral', 'woody'],
    mood: ['tranquility', 'romance'],
    description: 'A captivating blend of night-blooming jasmine with subtle undertones of sandalwood and musk. Perfect for creating an intimate, calming atmosphere.',
    details: [
      { label: 'Top Notes', value: 'Jasmine, White Tea' },
      { label: 'Heart Notes', value: 'Gardenia, Lily' },
      { label: 'Base Notes', value: 'Sandalwood, Musk' },
    ],
    burnTime: '45-50 hours',
    weight: '8 oz (227g)',
  },
  'cedar-driftwood': {
    id: 'cedar-driftwood',
    name: 'Cedar Driftwood',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
      'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=600&q=80',
    ],
    scent: ['woody', 'fresh'],
    mood: ['grounding', 'focus'],
    description: 'Evokes the serene beauty of coastal forests. Notes of aged cedar and sun-bleached driftwood create a grounding, meditative ambiance.',
    details: [
      { label: 'Top Notes', value: 'Sea Salt, Bergamot' },
      { label: 'Heart Notes', value: 'Cedar, Driftwood' },
      { label: 'Base Notes', value: 'Amber, White Musk' },
    ],
    burnTime: '40-45 hours',
    weight: '8 oz (227g)',
  },
  'citrus-ember': {
    id: 'citrus-ember',
    name: 'Citrus Ember',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=600&q=80',
    ],
    scent: ['citrus', 'spicy'],
    mood: ['energy', 'focus'],
    description: 'A vibrant fusion of zesty citrus and warm spices. Bergamot and blood orange meet smoky ember for an invigorating yet cozy experience.',
    details: [
      { label: 'Top Notes', value: 'Bergamot, Blood Orange' },
      { label: 'Heart Notes', value: 'Ginger, Cardamom' },
      { label: 'Base Notes', value: 'Smoky Ember, Vanilla' },
    ],
    burnTime: '45-50 hours',
    weight: '8 oz (227g)',
  },
  'lavender-dream': {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=600&q=80'],
    scent: ['floral', 'fresh'],
    mood: ['tranquility', 'grounding'],
    description: 'Pure French lavender fields captured in a candle. Calming and restorative, perfect for unwinding after a long day.',
    details: [
      { label: 'Top Notes', value: 'French Lavender' },
      { label: 'Heart Notes', value: 'Chamomile, Eucalyptus' },
      { label: 'Base Notes', value: 'Soft Musk, Tonka' },
    ],
    burnTime: '35-40 hours',
    weight: '6 oz (170g)',
  },
  'vanilla-sandalwood': {
    id: 'vanilla-sandalwood',
    name: 'Vanilla Sandalwood',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=600&q=80'],
    scent: ['woody', 'spicy'],
    mood: ['romance', 'grounding'],
    description: 'Rich Madagascar vanilla intertwined with creamy Indian sandalwood. A warm, sensual blend that envelops your space in comfort.',
    details: [
      { label: 'Top Notes', value: 'Vanilla Bean, Coconut' },
      { label: 'Heart Notes', value: 'Indian Sandalwood' },
      { label: 'Base Notes', value: 'Amber, Caramel' },
    ],
    burnTime: '50-55 hours',
    weight: '10 oz (283g)',
  },
  'ocean-mist': {
    id: 'ocean-mist',
    name: 'Ocean Mist',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&q=80'],
    scent: ['fresh', 'ozone'],
    mood: ['tranquility', 'focus'],
    description: 'Crisp ocean air meets soft sea moss. Transport yourself to a peaceful shoreline with this refreshing, clean scent.',
    details: [
      { label: 'Top Notes', value: 'Sea Salt, Ozone' },
      { label: 'Heart Notes', value: 'Sea Moss, Water Lily' },
      { label: 'Base Notes', value: 'Driftwood, White Musk' },
    ],
    burnTime: '40-45 hours',
    weight: '8 oz (227g)',
  },
  'rose-garden': {
    id: 'rose-garden',
    name: 'Rose Garden',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1543333995-a78aea2eee50?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1543333995-a78aea2eee50?w=600&q=80'],
    scent: ['floral'],
    mood: ['romance', 'tranquility'],
    description: 'A romantic bouquet of Bulgarian roses in full bloom. Delicate, feminine, and utterly captivating.',
    details: [
      { label: 'Top Notes', value: 'Bulgarian Rose, Peony' },
      { label: 'Heart Notes', value: 'Jasmine, Geranium' },
      { label: 'Base Notes', value: 'Soft Woods, Musk' },
    ],
    burnTime: '50-55 hours',
    weight: '10 oz (283g)',
  },
  'autumn-spice': {
    id: 'autumn-spice',
    name: 'Autumn Spice',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=600&q=80'],
    scent: ['spicy', 'woody'],
    mood: ['grounding', 'energy'],
    description: 'Warm cinnamon, nutmeg, and clove wrapped in notes of maple and toasted oak. The essence of cozy autumn evenings.',
    details: [
      { label: 'Top Notes', value: 'Cinnamon, Nutmeg' },
      { label: 'Heart Notes', value: 'Clove, Maple' },
      { label: 'Base Notes', value: 'Toasted Oak, Vanilla' },
    ],
    burnTime: '45-50 hours',
    weight: '8 oz (227g)',
  },
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const product = id ? products[id] : null

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

  const handleAddToCart = async () => {
    setIsAddedToCart(true)
    // In production, this would call the Stripe checkout API
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: Math.round(product.price * 100), // Convert to cents
          quantity,
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

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
                className="p-3 border border-gray-200 hover:border-[#c9956c] hover:text-[#c9956c] transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
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
      </div>
    </div>
  )
}
