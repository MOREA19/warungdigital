import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, LogOut, ChevronRight } from 'lucide-react';
import type { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllProducts } from '../utils/database';

interface CustomerDashboardProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartItemCount: number;
  onNavigateToCart: () => void;
  onNavigateToProfile: () => void;
  onLogout: () => void;
}

const categories = [
  { id: 'sembako', name: 'Sembako', icon: '🌾' },
  { id: 'minuman', name: 'Minuman', icon: '🥤' },
  { id: 'makanan-ringan', name: 'Makanan Ringan', icon: '🍪' },
  { id: 'kebutuhan-rumah', name: 'Kebutuhan Rumah', icon: '🏠' },
];

export function CustomerDashboard({
  onViewProduct,
  onAddToCart,
  cartItemCount,
  onNavigateToCart,
  onNavigateToProfile,
  onLogout,
}: CustomerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-blue-900">Warung Digital Arkan</h1>
            <div className="flex items-center gap-4">
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
              <button 
                onClick={onNavigateToProfile}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                title="Profil"
              >
                <User className="w-6 h-6 text-blue-900" />
              </button>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Promo */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-white mb-2">Promo Spesial Hari Ini!</h2>
          <p className="mb-4">Diskon hingga 20% untuk produk pilihan</p>
          <button className="bg-white text-blue-900 px-6 py-2 rounded-xl hover:bg-gray-100 transition-colors">
            Lihat Promo
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4">Kategori</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === category.id ? null : category.id)
                }
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-900 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="mb-1">{category.icon}</div>
                    <p className="text-gray-900">{category.name}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name
                : 'Semua Produk'}
            </h3>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-blue-900 hover:underline"
              >
                Lihat Semua
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <button
                  onClick={() => onViewProduct(product)}
                  className="w-full text-left"
                >
                  <div className="aspect-square bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                    <p className="text-blue-900 mb-2">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-gray-500">Stok: {product.stock}</p>
                  </div>
                </button>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-blue-900 text-white py-2 rounded-xl hover:bg-blue-800 transition-colors"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Produk tidak ditemukan</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}