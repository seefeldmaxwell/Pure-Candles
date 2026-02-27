import { useState } from 'react'
import { Mail, MapPin, Phone, Check } from 'lucide-react'

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormState('idle')
      }
    } catch {
      setFormState('idle')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 md:py-28 bg-[#f8f6f3]">
        <div className="container-narrow text-center">
          <h1 className="section-title mb-4">Get in Touch</h1>
          <p className="section-subtitle">
            Have a question about our candles? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div>
              {formState === 'success' ? (
                <div className="bg-green-50 border border-green-200 p-8 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setFormState('idle')} className="text-[#c9956c] hover:underline text-sm">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-gray-900 mb-2">Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition text-sm" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-gray-900 mb-2">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition text-sm" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-gray-900 mb-2">Subject</label>
                    <input type="text" required value={formData.subject} onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition text-sm" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-gray-900 mb-2">Message</label>
                    <textarea rows={5} required value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition text-sm resize-none" placeholder="Tell us more..." />
                  </div>
                  <button type="submit" disabled={formState === 'submitting'} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                    {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#c9956c] flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-[#c9956c]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Email</h3>
                      <a href="mailto:hello@purecandles.com" className="text-gray-500 text-sm hover:text-[#c9956c] transition-colors">hello@purecandles.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#c9956c] flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-[#c9956c]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Phone</h3>
                      <a href="tel:+15551234567" className="text-gray-500 text-sm hover:text-[#c9956c] transition-colors">(555) 123-4567</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#c9956c] flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-[#c9956c]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Location</h3>
                      <p className="text-gray-500 text-sm">123 Candle Lane<br />Portland, OR 97201</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-900 mb-4">Business Hours</h3>
                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex justify-between"><span>Monday - Friday</span><span>9am - 6pm PST</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>10am - 4pm PST</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
