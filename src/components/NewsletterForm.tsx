import { useState } from 'react'
import { Check } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    await new Promise(resolve => setTimeout(resolve, 800))
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto flex items-center justify-center gap-2 py-3 text-green-700">
        <Check className="h-5 w-5" />
        <span className="text-sm font-medium">You're subscribed! Check your inbox.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 focus:border-[#c9956c] focus:ring-1 focus:ring-[#c9956c] outline-none transition"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary whitespace-nowrap disabled:opacity-50"
      >
        {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}
