import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Heart, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function Home() {
  useEffect(() => {
    // Load Elfsight platform script
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOGI0YjQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            Illuminate Your
            <span className="block text-amber-600">Moments</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Hand-poured candles crafted with natural soy wax and premium fragrances.
            Create the perfect ambiance for every occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/products">
                Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pure Candles?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Natural</h3>
                <p className="text-muted-foreground">
                  Made with pure soy wax and essential oils. No harmful chemicals or synthetic additives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Handcrafted</h3>
                <p className="text-muted-foreground">
                  Each candle is carefully hand-poured in small batches for consistent quality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Long Lasting</h3>
                <p className="text-muted-foreground">
                  Our candles burn cleaner and longer, giving you more hours of enjoyment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Feed Section - Elfsight Widget */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Follow Our Journey</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Stay connected with us on social media for the latest collections, behind-the-scenes content, and candle care tips.
          </p>

          {/* Elfsight Social Feed Widget */}
          <div className="max-w-6xl mx-auto">
            <div className="elfsight-app-11596963-796e-4b79-89cf-e942bfbbd40e" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Scent?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Explore our collection of premium candles and transform your space today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products">
              Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
