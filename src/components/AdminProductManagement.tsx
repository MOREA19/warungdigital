import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import type { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../utils/database';

interface AdminProductManagementProps {
  onNavigateTo: (page: string) => void;
  onLogout: () => void;
}

export function AdminProductManagement({ onNavigateTo, onLogout }: AdminProductManagementProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    category: 'sembako',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.image,
        category: product.category,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        stock: 0,
        description: '',
        image: '',
        category: 'sembako',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? { ...formData, id: p.id } : p))
        );
      } else {
        const newProduct: Product = {
          ...formData,
          id: Date.now().toString(),
        };
        await createProduct(newProduct);
        setProducts([...products, newProduct]);
      }
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-blue-900">Admin Panel</h2>
              <p className="text-gray-500">Warung Digital Arkan</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => onNavigateTo('admin-dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onNavigateTo('admin-products')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-xl"
            >
              <Package className="w-5 h-5" />
              <span>Produk</span>
            </button>
            <button
              onClick={() => onNavigateTo('admin-orders')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Pesanan</span>
            </button>
            <button
              onClick={() => onNavigateTo('admin-customers')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Pelanggan</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 mb-2">Kelola Produk</h1>
              <p className="text-gray-600">Tambah, edit, atau hapus produk</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Tambah Produk
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
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

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 text-gray-600">Produk</th>
                    <th className="text-left p-4 text-gray-600">Kategori</th>
                    <th className="text-left p-4 text-gray-600">Harga</th>
                    <th className="text-left p-4 text-gray-600">Stok</th>
                    <th className="text-left p-4 text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-gray-900">{product.name}</p>
                            <p className="text-gray-500 line-clamp-1">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-900">Rp {product.price.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-lg ${
                            product.stock > 20
                              ? 'bg-green-50 text-green-700'
                              : product.stock > 0
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-gray-900">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nama Produk</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="Masukkan nama produk"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Harga</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      placeholder="0"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Stok</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      placeholder="0"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    required
                  >
                    <option value="sembako">Sembako</option>
                    <option value="minuman">Minuman</option>
                    <option value="makanan-ringan">Makanan Ringan</option>
                    <option value="kebutuhan-rumah">Kebutuhan Rumah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">URL Gambar</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                    placeholder="Deskripsi produk"
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
                >
                  {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}