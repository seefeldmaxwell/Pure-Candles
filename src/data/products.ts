export interface Product {
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
  isNew: boolean
}

export const products: Product[] = [
  {
    id: 'midnight-jasmine',
    name: 'Midnight Jasmine',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80',
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
    isNew: true,
  },
  {
    id: 'cedar-driftwood',
    name: 'Cedar Driftwood',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80',
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
    isNew: false,
  },
  {
    id: 'citrus-ember',
    name: 'Citrus Ember',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=400&q=80',
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
    isNew: false,
  },
  {
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
    isNew: false,
  },
  {
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
    isNew: true,
  },
  {
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
    isNew: false,
  },
  {
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
    isNew: false,
  },
  {
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
    isNew: true,
  },
]

export const productsById = Object.fromEntries(
  products.map(p => [p.id, p])
) as Record<string, Product>

export function getProduct(id: string): Product | undefined {
  return productsById[id]
}
