import { useState } from 'react'
import { registerUser } from '../api/journal'

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!userName.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)

    try {
      if (mode === 'register') {
        await registerUser({ userName, password })
      }
      // For login: Spring Security not set up yet, just pass through
      // Once you add Spring Security you'd call a /login endpoint here
      onLogin(userName)
    } catch (err) {
      const status = err.response?.status
      if (status === 400) setError('Invalid details. Try again.')
      else if (status === 409) setError('Username already exists.')
      else setError('Something went wrong. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-body">
      <div className="w-full max-w-sm px-8">
        {/* Logo */}
        <div className="mb-16">
          <h1 className="text-4xl font-headline text-primary tracking-tight mb-2">Mnemos</h1>
          <p className="text-[10px] font-label text-zinc-500 tracking-[0.3em] uppercase">
            Private Sanctuary
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-6 mb-10">
          <div>
            <label className="block text-[10px] font-label text-zinc-500 tracking-widest uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="your_name"
              className="w-full bg-transparent border-b border-outline-variant/30 py-2 text-on-surface font-body text-sm focus:outline-none focus:border-primary/60 placeholder:text-on-surface-variant/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-label text-zinc-500 tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-outline-variant/30 py-2 text-on-surface font-body text-sm focus:outline-none focus:border-primary/60 placeholder:text-on-surface-variant/30 transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-error text-xs font-label mb-6">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-primary-container text-on-primary-container font-label text-xs tracking-widest uppercase hover:bg-surface-bright transition-colors disabled:opacity-40"
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Enter' : 'Create Account'}
        </button>

        {/* Toggle */}
        <p className="mt-8 text-center text-xs font-label text-zinc-600">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
            className="text-primary hover:opacity-70 transition-opacity"
          >
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
