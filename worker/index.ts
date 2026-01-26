import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { DurableObject } from 'cloudflare:workers'

interface Env {
  STRIPE_SECRET_KEY: string
  GlobalDurableObject: DurableObjectNamespace<GlobalDurableObject>
}

interface CheckoutRequest {
  productId: string
  productName: string
  price: number
  quantity: number
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors())

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Stripe checkout session endpoint
app.post('/api/checkout', async (c) => {
  const body = await c.req.json<CheckoutRequest>()
  const { productId, productName, price, quantity } = body

  const stripeKey = c.env.STRIPE_SECRET_KEY

  if (!stripeKey) {
    return c.json({ error: 'Stripe is not configured' }, 500)
  }

  try {
    // Get the origin for redirect URLs
    const origin = c.req.header('origin') || 'https://lumina-wax-boutique-mioa0pd3kngbqcykzmtsp.workers.dev'

    // Create Stripe checkout session using the API directly
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': productName,
        'line_items[0][price_data][product_data][metadata][product_id]': productId,
        'line_items[0][price_data][unit_amount]': price.toString(),
        'line_items[0][quantity]': quantity.toString(),
        'mode': 'payment',
        'success_url': `${origin}/products?success=true`,
        'cancel_url': `${origin}/products?canceled=true`,
      }).toString(),
    })

    const session = await response.json() as { id?: string; url?: string; error?: { message: string } }

    if (session.error) {
      console.error('Stripe error:', session.error)
      return c.json({ error: session.error.message }, 400)
    }

    return c.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return c.json({ error: 'Failed to create checkout session' }, 500)
  }
})

// Get products with Stripe prices (if configured)
app.get('/api/products', async (c) => {
  const stripeKey = c.env.STRIPE_SECRET_KEY

  // Return static products if Stripe not configured
  const products = [
    {
      id: 'candle-lavender-dream',
      name: 'Lavender Dream',
      description: 'Calming lavender with hints of vanilla and chamomile',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&h=400&fit=crop',
    },
    {
      id: 'candle-ocean-breeze',
      name: 'Ocean Breeze',
      description: 'Fresh sea salt and driftwood with marine notes',
      price: 2400,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop',
    },
    {
      id: 'candle-vanilla-bean',
      name: 'Vanilla Bean',
      description: 'Rich Madagascar vanilla with warm undertones',
      price: 2600,
      image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=400&h=400&fit=crop',
    },
  ]

  return c.json({ products, stripeConfigured: !!stripeKey })
})

// Client error logging endpoint
app.post('/api/client-errors', async (c) => {
  try {
    const error = await c.req.json()
    console.error('Client error:', JSON.stringify(error))
    return c.json({ received: true })
  } catch {
    return c.json({ received: false }, 400)
  }
})

// Catch-all for API routes
app.all('/api/*', (c) => {
  return c.json({ error: 'Not found' }, 404)
})

// Durable Object for persistent storage
export class GlobalDurableObject extends DurableObject {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/counter') {
      const count = (await this.ctx.storage.get<number>('count')) || 0
      await this.ctx.storage.put('count', count + 1)
      return new Response(JSON.stringify({ count: count + 1 }))
    }

    return new Response('Not found', { status: 404 })
  }
}

export default app
