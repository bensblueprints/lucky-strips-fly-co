'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="font-playfair text-3xl text-gold-400">Lucky Strips</h1>
            <p className="text-earth-400 text-sm">Fly Fishing Co.</p>
          </Link>
        </div>

        <div className="bg-earth-900/50 backdrop-blur-sm rounded-xl border border-earth-700/50 p-8">
          <h2 className="text-xl font-semibold text-earth-100 mb-6 text-center">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-900/20 border border-red-700/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-earth-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-earth-800/50 border border-earth-600/50 rounded-lg text-earth-100 placeholder-earth-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-earth-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-earth-800/50 border border-earth-600/50 rounded-lg text-earth-100 placeholder-earth-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gold-600 hover:bg-gold-500 disabled:bg-gold-700 disabled:cursor-not-allowed text-earth-950 font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-earth-500 text-sm">
          <Link href="/" className="hover:text-gold-400 transition-colors">
            &larr; Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
