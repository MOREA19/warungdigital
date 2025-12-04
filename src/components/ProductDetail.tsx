import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import type { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  cartItemCount: number;
  onNavigateToCart: () => void;
}

export function ProductDetail({
  product,
  onAddToCart,
  onBack,
  cartItemCount,
  onNavigateToCart,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-900 hover:underline"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali
            </button>
            <button
              onClick={onNavigateToCart}
              className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-blue-900" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-gray-900 mb-2">{product.name}</h1>
                <p className="text-blue-900 mb-4">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-2 rounded-xl ${
                      product.stock > 20
                        ? 'bg-green-50 text-green-700'
                        : product.stock > 0
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-gray-900 mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-gray-900 mb-3">Jumlah</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-xl hover:border-blue-900 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-xl hover:border-blue-900 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-blue-900">
                    Rp {(product.price * quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-900 text-white py-4 rounded-xl hover:bg-blue-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
