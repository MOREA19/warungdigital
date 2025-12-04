import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
}: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.0; // No tax for now
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onContinueShopping}
              className="flex items-center gap-2 text-blue-900 hover:underline"
            >
              <ArrowLeft className="w-5 h-5" />
              Lanjut Belanja
            </button>
            <h1 className="text-blue-900">Keranjang Belanja</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-gray-900 mb-2">Keranjang Kosong</h2>
            <p className="text-gray-600 mb-6">Belum ada produk di keranjang Anda</p>
            <button
              onClick={onContinueShopping}
              className="bg-blue-900 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-blue-900">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:border-blue-900 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:border-blue-900 transition-colors"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-900">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-gray-900 mb-4">Ringkasan Pesanan</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal ({items.length} item)</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Biaya Pengiriman</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Total</span>
                      <span className="text-blue-900">
                        Rp {total.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
