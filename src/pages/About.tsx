import { Flame, Heart, Leaf, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function About() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pure Candles was born from a simple belief: everyone deserves to experience
            the magic of a perfectly crafted candle that fills their space with warmth and beauty.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1602607434757-de8e1dcd3f75?w=600&h=400&fit=crop"
              alt="Candle making process"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Crafted with Care</h2>
            <p className="text-muted-foreground mb-4">
              What started as a hobby in a small kitchen has grown into a passion for
              creating premium, eco-friendly candles. We hand-pour every single candle
              in our workshop, ensuring each one meets our exacting standards.
            </p>
            <p className="text-muted-foreground mb-4">
              We source only the finest natural soy wax and premium fragrance oils,
              carefully blending each scent to create unique experiences that transform
              your space.
            </p>
            <p className="text-muted-foreground">
              Our commitment to sustainability means we use recyclable packaging and
              never test on animals. When you light a Pure Candle, you can feel good
              about your choice.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Flame className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We never compromise on the quality of our ingredients or craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly materials and practices from production to packaging.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="font-semibold mb-2">Passion</h3>
                <p className="text-sm text-muted-foreground">
                  Every candle is made with love and attention to detail.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building connections through shared moments of warmth and light.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
