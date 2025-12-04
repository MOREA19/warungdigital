import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import type { User } from '../App';

interface CustomerProfileProps {
  user: User | null;
  onBack: () => void;
  onUpdateUser?: (user: User) => void;
}

export function CustomerProfile({ user, onBack, onUpdateUser }: CustomerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (user && onUpdateUser) {
      onUpdateUser({
        ...user,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-blue-900" />
            </button>
            <h1 className="text-blue-900">Profil Saya</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Avatar & Header */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-500">{user?.role === 'customer' ? 'Pelanggan' : 'Admin'}</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profil
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-900" />
                  <span className="text-gray-900">{user?.email}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Email tidak bisa diubah</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Masukkan nama lengkap"
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl text-gray-900">
                  {formData.name}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Nomor Telepon</label>
              {isEditing ? (
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-blue-900" />
                  <span className="text-gray-900">{formData.phone || '-'}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Alamat</label>
              {isEditing ? (
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>
              ) : (
                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <span className="text-gray-900">{formData.address || '-'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors"
              >
                <Save className="w-5 h-5" />
                Simpan Perubahan
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
                Batal
              </button>
            </div>
          )}
        </div>

        {/* Account Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl text-gray-900 mb-6 font-medium">Informasi Akun</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Tipe Akun</span>
              <span className="text-blue-900 font-medium">
                {user?.role === 'customer' ? 'Pelanggan' : 'Admin'}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Status Akun</span>
              <span className="text-green-600 font-medium">Aktif</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
