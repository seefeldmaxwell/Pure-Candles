import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { DurableObject } from 'cloudflare:workers'

interface Env {
  STRIPE_SECRET_KEY: string
  GlobalDurableObject: DurableObjectNamespace<GlobalDurableObject>
}

interface CheckoutItem {
  productId: string
  productName: string
  price: number
  quantity: number
}

interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

interface NewsletterRequest {
  email: string
}

// Product catalog (synced with frontend)
const products = [
  { id: 'midnight-jasmine', name: 'Midnight Jasmine', price: 3400, description: 'Night-blooming jasmine with sandalwood and musk', image: 'https://images.unsplash.com/photo-1602607434678-d3aa07ec4c9d?w=400&q=80' },
  { id: 'cedar-driftwood', name: 'Cedar Driftwood', price: 3200, description: 'Aged cedar and sun-bleached driftwood', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80' },
  { id: 'citrus-ember', name: 'Citrus Ember', price: 3400, description: 'Zesty citrus and warm spices', image: 'https://images.unsplash.com/photo-1608181831688-ba5b3c8cf80c?w=400&q=80' },
  { id: 'lavender-dream', name: 'Lavender Dream', price: 2800, description: 'Pure French lavender fields', image: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&q=80' },
  { id: 'vanilla-sandalwood', name: 'Vanilla Sandalwood', price: 3600, description: 'Madagascar vanilla with Indian sandalwood', image: 'https://images.unsplash.com/photo-1600056077673-5e8a58c4c6e9?w=400&q=80' },
  { id: 'ocean-mist', name: 'Ocean Mist', price: 3000, description: 'Crisp ocean air meets soft sea moss', image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&q=80' },
  { id: 'rose-garden', name: 'Rose Garden', price: 3800, description: 'Bulgarian roses in full bloom', image: 'https://images.unsplash.com/photo-1543333995-a78aea2eee50?w=400&q=80' },
  { id: 'autumn-spice', name: 'Autumn Spice', price: 3200, description: 'Warm cinnamon, nutmeg, and clove', image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=400&q=80' },
]

function getDurableObject(env: Env) {
  const id = env.GlobalDurableObject.idFromName('global')
  return env.GlobalDurableObject.get(id)
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors())

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Stripe checkout session endpoint (supports multi-item cart)
app.post('/api/checkout', async (c) => {
  const body = await c.req.json<{ items?: CheckoutItem[]; productId?: string; productName?: string; price?: number; quantity?: number }>()

  const stripeKey = c.env.STRIPE_SECRET_KEY

  if (!stripeKey) {
    return c.json({ error: 'Stripe is not configured' }, 500)
  }

  // Normalize: support both single-item and multi-item payloads
  const items: CheckoutItem[] = body.items || [{
    productId: body.productId!,
    productName: body.productName!,
    price: body.price!,
    quantity: body.quantity!,
  }]

  try {
    const origin = c.req.header('origin') || 'https://lumina-wax-boutique-mioa0pd3kngbqcykzmtsp.workers.dev'

    // Build line items for Stripe
    const params = new URLSearchParams({
      'mode': 'payment',
      'success_url': `${origin}/catalog?success=true`,
      'cancel_url': `${origin}/cart?canceled=true`,
    })

    items.forEach((item, i) => {
      params.set(`payment_method_types[0]`, 'card')
      params.set(`line_items[${i}][price_data][currency]`, 'usd')
      params.set(`line_items[${i}][price_data][product_data][name]`, item.productName)
      params.set(`line_items[${i}][price_data][product_data][metadata][product_id]`, item.productId)
      params.set(`line_items[${i}][price_data][unit_amount]`, item.price.toString())
      params.set(`line_items[${i}][quantity]`, item.quantity.toString())
    })

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
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

// Products API
app.get('/api/products', (c) => {
  return c.json({ products, stripeConfigured: !!c.env.STRIPE_SECRET_KEY })
})

// Contact form submission
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json<ContactRequest>()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return c.json({ error: 'All fields are required' }, 400)
    }

    // Store in Durable Object
    const stub = getDurableObject(c.env)
    await stub.fetch(new Request('https://do/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message, timestamp: new Date().toISOString() }),
    }))

    console.log(`Contact form: ${name} <${email}> - ${subject}`)
    return c.json({ success: true, message: 'Message received. We will get back to you within 24 hours.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return c.json({ error: 'Failed to process your message' }, 500)
  }
})

// Newsletter subscription
app.post('/api/newsletter', async (c) => {
  try {
    const body = await c.req.json<NewsletterRequest>()
    const { email } = body

    if (!email) {
      return c.json({ error: 'Email is required' }, 400)
    }

    // Store in Durable Object
    const stub = getDurableObject(c.env)
    await stub.fetch(new Request('https://do/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
    }))

    console.log(`Newsletter subscription: ${email}`)
    return c.json({ success: true, message: 'Successfully subscribed!' })
  } catch (error) {
    console.error('Newsletter error:', error)
    return c.json({ error: 'Failed to subscribe' }, 500)
  }
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

    // Contact form submissions
    if (url.pathname === '/contact' && request.method === 'POST') {
      const data = await request.json()
      const submissions = (await this.ctx.storage.get<unknown[]>('contact_submissions')) || []
      submissions.push(data)
      // Keep last 1000 submissions
      if (submissions.length > 1000) submissions.splice(0, submissions.length - 1000)
      await this.ctx.storage.put('contact_submissions', submissions)
      return new Response(JSON.stringify({ stored: true }))
    }

    // Newsletter subscriptions
    if (url.pathname === '/newsletter' && request.method === 'POST') {
      const data = await request.json() as { email: string; subscribedAt: string }
      const subscribers = (await this.ctx.storage.get<Record<string, string>>('newsletter_subscribers')) || {}
      subscribers[data.email] = data.subscribedAt
      await this.ctx.storage.put('newsletter_subscribers', subscribers)
      return new Response(JSON.stringify({ stored: true, total: Object.keys(subscribers).length }))
    }

    // Counter (legacy)
    if (url.pathname === '/counter') {
      const count = (await this.ctx.storage.get<number>('count')) || 0
      await this.ctx.storage.put('count', count + 1)
      return new Response(JSON.stringify({ count: count + 1 }))
    }

    return new Response('Not found', { status: 404 })
  }
}

export default app
