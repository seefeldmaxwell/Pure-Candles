import { useState } from 'react'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
  scent: string
}

const products: Product[] = [
  {
    id: 'candle-lavender-dream',
    name: 'Lavender Dream',
    description: 'Calming lavender with hints of vanilla and chamomile',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&h=400&fit=crop',
    rating: 4.9,
    category: 'scented',
    scent: 'Lavender'
  },
  {
    id: 'candle-ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Fresh sea salt and driftwood with marine notes',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop',
    rating: 4.7,
    category: 'scented',
    scent: 'Fresh'
  },
  {
    id: 'candle-vanilla-bean',
    name: 'Vanilla Bean',
    description: 'Rich Madagascar vanilla with warm undertones',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=400&h=400&fit=crop',
    rating: 4.8,
    category: 'scented',
    scent: 'Vanilla'
  },
  {
    id: 'candle-cedar-pine',
    name: 'Cedar & Pine',
    description: 'Woodsy blend of cedar, pine, and forest moss',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1599446794254-0f53a6eb2963?w=400&h=400&fit=crop',
    rating: 4.6,
    category: 'scented',
    scent: 'Woody'
  },
  {
    id: 'candle-citrus-bloom',
    name: 'Citrus Bloom',
    description: 'Bright lemon, orange zest, and white florals',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1572726738005-f13cd23a30ee?w=400&h=400&fit=crop',
    rating: 4.8,
    category: 'scented',
    scent: 'Citrus'
  },
  {
    id: 'candle-rose-garden',
    name: 'Rose Garden',
    description: 'Romantic rose petals with soft musk base',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop',
    rating: 4.9,
    category: 'scented',
    scent: 'Floral'
  },
  {
    id: 'candle-pure-white',
    name: 'Pure White',
    description: 'Unscented soy wax candle for clean ambiance',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop',
    rating: 4.5,
    category: 'unscented',
    scent: 'None'
  },
  {
    id: 'candle-gift-set',
    name: 'Discovery Set',
    description: 'Collection of 4 mini candles in our bestselling scents',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=400&h=400&fit=crop',
    rating: 5.0,
    category: 'gift-sets',
    scent: 'Variety'
  }
]

export function Products() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (product: Product) => {
    setLoading(product.id)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Unable to create checkout session. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our range of hand-poured candles, each crafted with care using natural soy wax and premium fragrances.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {product.scent}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={() => handleCheckout(product)}
                  disabled={loading === product.id}
                >
                  {loading === product.id ? (
                    'Processing...'
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
