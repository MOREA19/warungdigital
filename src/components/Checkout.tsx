import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Banknote, Check } from 'lucide-react';
import type { CartItem } from '../App';
import type { User } from '../utils/database';
import { createOrder } from '../utils/database';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { OrderConfirmationModal } from './OrderConfirmationModal';

interface CheckoutProps {
  items: CartItem[];
  currentUser: User | null;
  onConfirmOrder: () => void;
  onBack: () => void;
}

export function Checkout({ items, currentUser, onConfirmOrder, onBack }: CheckoutProps) {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer'>('cod');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrderNumber, setLastOrderNumber] = useState<string>('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Anda harus login untuk melakukan pesanan');
      return;
    }

    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      alert('Mohon lengkapi semua data pengiriman');
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleConfirmOrder = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const orderData = {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
        status: 'pending' as const,
        paymentMethod,
        shippingAddress,
      };

      await createOrder(orderData);
      setLastOrderNumber(orderNumber);
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Gagal membuat pesanan:', error);
      alert('Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showConfirmationModal}
        type="confirmation"
        total={total}
        paymentMethod={paymentMethod}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmOrder}
      />

      {/* Success Modal */}
      <OrderConfirmationModal
        isOpen={showSuccessModal}
        type="success"
        orderNumber={lastOrderNumber}
        total={total}
        paymentMethod={paymentMethod}
        onClose={() => {
          setShowSuccessModal(false);
          onConfirmOrder();
        }}
        onConfirm={() => {
          setShowSuccessModal(false);
          onConfirmOrder();
        }}
      />
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-900 hover:underline"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali
            </button>
            <h1 className="text-blue-900">Checkout</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-gray-900">Alamat Pengiriman</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      placeholder="08xx xxxx xxxx"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                      placeholder="Jalan, No. Rumah, RT/RW"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Kota/Kabupaten</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        placeholder="Kota"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Kode Pos</label>
                      <input
                        type="text"
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-gray-900">Metode Pembayaran</h2>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-blue-900 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Banknote className="w-6 h-6 text-blue-900" />
                        <div className="text-left">
                          <p className="text-gray-900">Bayar di Tempat (COD)</p>
                          <p className="text-gray-500">Bayar saat pesanan diterima</p>
                        </div>
                      </div>
                      {paymentMethod === 'cod' && (
                        <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`w-full p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === 'transfer'
                        ? 'border-blue-900 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-blue-900" />
                        <div className="text-left">
                          <p className="text-gray-900">Transfer Bank</p>
                          <p className="text-gray-500">Transfer ke rekening toko</p>
                        </div>
                      </div>
                      {paymentMethod === 'transfer' && (
                        <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-gray-900 mb-4">Ringkasan Pesanan</h3>

                {/* Product List */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate">{item.name}</p>
                        <p className="text-gray-500">
                          {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pt-4 border-t">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Biaya Pengiriman</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Total Pembayaran</span>
                      <span className="text-blue-900">
                        Rp {total.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Memproses Pesanan...' : 'Konfirmasi Pesanan'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
