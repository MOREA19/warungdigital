import { useState } from 'react';
import { ShoppingBag, Mail, Lock } from 'lucide-react';
import { loginUser } from '../utils/database';
import type { User } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
}

export function Login({ onLogin, onNavigateToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email tidak boleh kosong');
      return;
    }
    
    if (!password.trim()) {
      setError('Password tidak boleh kosong');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('Login attempt with email:', email);
      const user = await loginUser(email, password);
      console.log('Login successful:', user);
      onLogin(user as User);
    } catch (err: any) {
      const errorMessage = err?.message || 'Email atau password salah. Coba lagi.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-2xl mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-blue-900 mb-2">Warung Digital Arkan</h1>
          <p className="text-gray-600">Belanja kebutuhan harian lebih mudah</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-blue-900 mb-6">Masuk ke Akun Anda</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Email / Nomor HP
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    console.log('Email changed to:', e.target.value);
                    setEmail(e.target.value);
                  }}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="Masukkan email atau nomor HP"
                  disabled={loading}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    console.log('Password changed');
                    setPassword(e.target.value);
                  }}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="Masukkan password"
                  disabled={loading}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900 cursor-pointer" 
                />
                <span className="ml-2 text-gray-600">Ingat saya</span>
              </label>
              <a href="#" className="text-blue-900 hover:underline text-sm">
                Lupa password?
              </a>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-blue-900 hover:underline"
              >
                Daftar sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}