import { useState } from 'react';
import { ShoppingBag, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { registerUser } from '../utils/database';

interface RegisterProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.name.trim()) {
      setError('Nama tidak boleh kosong');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Email tidak boleh kosong');
      return;
    }
    
    if (!formData.phone.trim()) {
      setError('Nomor HP tidak boleh kosong');
      return;
    }
    
    if (!formData.address.trim()) {
      setError('Alamat tidak boleh kosong');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Password tidak boleh kosong');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Registering user:', formData.email);
      await registerUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        role: 'customer',
      });
      
      console.log('Registration successful');
      setSuccess('Registrasi berhasil! Silakan login.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
      });
      
      setTimeout(() => {
        onRegister();
      }, 2000);
    } catch (err: any) {
      const errorMessage = err?.message || 'Gagal mendaftar. Coba lagi.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-2xl mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-blue-900 mb-2">Warung Digital Arkan</h1>
          <p className="text-gray-600">Daftar untuk mulai berbelanja</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-blue-900 mb-6">Buat Akun Baru</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="Masukkan nama lengkap"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="Masukkan email"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Nomor HP
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="08xx xxxx xxxx"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Alamat
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none transition-all"
                  placeholder="Masukkan alamat lengkap"
                  rows={2}
                  disabled={loading}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="Buat password (min 6 karakter)"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setError('')}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="Konfirmasi password"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-blue-900 hover:underline"
              >
                Masuk sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}