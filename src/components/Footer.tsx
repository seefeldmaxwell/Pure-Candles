import { Flame } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-amber-600" />
              <span className="text-xl font-bold">Pure Candles</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Handcrafted candles made with natural ingredients for a cleaner,
              longer-lasting burn.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground">All Candles</Link></li>
              <li><Link to="/products?category=scented" className="hover:text-foreground">Scented</Link></li>
              <li><Link to="/products?category=unscented" className="hover:text-foreground">Unscented</Link></li>
              <li><Link to="/products?category=gift-sets" className="hover:text-foreground">Gift Sets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-foreground">Shipping</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Instagram</a></li>
              <li><a href="#" className="hover:text-foreground">Facebook</a></li>
              <li><a href="#" className="hover:text-foreground">Pinterest</a></li>
              <li><a href="#" className="hover:text-foreground">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pure Candles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
