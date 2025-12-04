import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  ShoppingCart,
  Search,
  Eye,
  X,
} from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../utils/database';

interface AdminOrdersProps {
  onNavigateTo: (page: string) => void;
  onLogout: () => void;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  paymentMethod: 'cod' | 'transfer';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function AdminOrders({ onNavigateTo, onLogout }: AdminOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await loadOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Gagal mengupdate status pesanan');
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Menunggu',
      processing: 'Diproses',
      shipped: 'Dikirim',
      completed: 'Selesai',
      cancelled: 'Dibatalkan',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Produk</span>
            </button>
            <button
              onClick={() => onNavigateTo('admin-orders')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-xl relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Pesanan</span>
              {orders.filter((o: any) => o.status === 'pending').length > 0 && (
                <div className="ml-auto flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {orders.filter((o: any) => o.status === 'pending').length}
                  </span>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
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
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-gray-900 mb-2">Manajemen Pesanan</h1>
              {orders.filter(o => o.status === 'pending').length > 0 && (
                <div className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-medium text-sm">
                    {orders.filter(o => o.status === 'pending').length} pesanan baru
                  </span>
                </div>
              )}
            </div>
            <p className="text-gray-600">Kelola semua pesanan dari pelanggan</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari pesanan berdasarkan ID, nama, atau email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-600">Memuat pesanan...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                {orders.length === 0 ? 'Belum ada pesanan' : 'Tidak ada pesanan yang sesuai'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 text-gray-600">ID Pesanan</th>
                      <th className="text-left p-4 text-gray-600">Pelanggan</th>
                      <th className="text-left p-4 text-gray-600">Total</th>
                      <th className="text-left p-4 text-gray-600">Status</th>
                      <th className="text-left p-4 text-gray-600">Tanggal</th>
                      <th className="text-left p-4 text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className={`border-b hover:bg-gray-50 ${
                        order.status === 'pending' ? 'bg-red-50' : ''
                      }`}>
                        <td className={`p-4 ${
                          order.status === 'pending' ? 'text-red-900 font-semibold' : 'text-blue-900'
                        }`}>{order.id}</td>
                        <td className="p-4">
                          <div>
                            <div className="text-gray-900">{order.userName}</div>
                            <div className="text-gray-500">{order.userEmail}</div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-900">
                          Rp {order.total.toLocaleString('id-ID')}
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-lg ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="flex items-center gap-2 text-blue-900 hover:underline"
                          >
                            <Eye className="w-4 h-4" />
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-gray-900">Detail Pesanan</h2>
                <p className="text-gray-600">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-gray-900 mb-3">Informasi Pelanggan</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-gray-600">
                    <strong>Nama:</strong> {selectedOrder.userName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {selectedOrder.userEmail}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-gray-900 mb-3">Alamat Pengiriman</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-gray-600">
                    <strong>Nama:</strong> {selectedOrder.shippingAddress.name}
                  </p>
                  <p className="text-gray-600">
                    <strong>Telepon:</strong> {selectedOrder.shippingAddress.phone}
                  </p>
                  <p className="text-gray-600">
                    <strong>Alamat:</strong> {selectedOrder.shippingAddress.address}
                  </p>
                  <p className="text-gray-600">
                    <strong>Kota:</strong> {selectedOrder.shippingAddress.city}
                  </p>
                  <p className="text-gray-600">
                    <strong>Kode Pos:</strong> {selectedOrder.shippingAddress.postalCode}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-gray-900 mb-3">Produk</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-gray-900">{item.productName}</h4>
                        <p className="text-gray-600">
                          Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
                        </p>
                        <p className="text-gray-900">
                          Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <span className="text-gray-900">
                    {selectedOrder.paymentMethod === 'cod' ? 'COD (Bayar di Tempat)' : 'Transfer Bank'}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">
                    Rp {selectedOrder.total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-gray-900 mb-3">Update Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['pending', 'processing', 'shipped', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedOrder.id, status as Order['status'])}
                      disabled={selectedOrder.status === status}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        selectedOrder.status === status
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
