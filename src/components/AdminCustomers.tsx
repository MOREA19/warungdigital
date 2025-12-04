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
  Mail,
  Phone,
  MapPin,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { getAllCustomers } from '../utils/database';

interface AdminCustomersProps {
  onNavigateTo: (page: string) => void;
  onLogout: () => void;
}

interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export function AdminCustomers({ onNavigateTo, onLogout }: AdminCustomersProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadCustomers();
    // Refresh customers every 10 seconds to get new registrations
    const interval = setInterval(loadCustomers, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getAllCustomers();
      console.log('Customers loaded from API:', data);
      
      if (data && data.length > 0) {
        // Filter only customers (not admins) and sort by creation date
        const customersOnly = data.filter(user => user.role === 'customer');
        customersOnly.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setCustomers(customersOnly);
      } else {
        console.log('No customers from API, showing empty list');
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadCustomers();
    setIsRefreshing(false);
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    return matchesSearch;
  });

  // Calculate active customers (registered in last 30 days)
  const activeCustomers = customers.filter((customer) => {
    const createdDate = new Date(customer.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate >= thirtyDaysAgo;
  }).length;

  // Calculate new customers (registered in last 7 days)
  const newCustomers = customers.filter((customer) => {
    const createdDate = new Date(customer.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdDate >= sevenDaysAgo;
  }).length;

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
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Pesanan</span>
            </button>
            <button
              onClick={() => onNavigateTo('admin-customers')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-xl"
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
            <h1 className="text-gray-900 mb-2">Manajemen Pelanggan</h1>
            <p className="text-gray-600">Lihat dan kelola data pelanggan</p>
          </div>

          {/* Search & Refresh */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari pelanggan berdasarkan nama, email, atau telepon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors disabled:bg-gray-400 flex items-center gap-2"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Memuat...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">{customers.length}</h3>
                  <p className="text-gray-600">Total Pelanggan</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">{activeCustomers}</h3>
                  <p className="text-gray-600">Pelanggan Aktif (30 hari)</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">{newCustomers}</h3>
                  <p className="text-gray-600">Pelanggan Baru (7 hari)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-600">Memuat data pelanggan...</div>
            ) : customers.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">Belum Ada Data Pelanggan</h3>
                <p className="text-gray-600">
                  Tidak ada data pelanggan yang tersedia saat ini
                </p>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                Tidak ada pelanggan yang sesuai dengan pencarian
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 text-gray-600">Nama</th>
                      <th className="text-left p-4 text-gray-600">Email</th>
                      <th className="text-left p-4 text-gray-600">Telepon</th>
                      <th className="text-left p-4 text-gray-600">Terdaftar</th>
                      <th className="text-left p-4 text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-900">
                                {customer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-gray-900">{customer.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{customer.email}</td>
                        <td className="p-4 text-gray-600">{customer.phone}</td>
                        <td className="p-4 text-gray-600">
                          {new Date(customer.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedCustomer(customer)}
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-gray-900">Detail Pelanggan</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-900 text-2xl">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-gray-600">ID: {selectedCustomer.id}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-gray-900">{selectedCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-600">Telepon</p>
                    <p className="text-gray-900">{selectedCustomer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-600">Alamat</p>
                    <p className="text-gray-900">{selectedCustomer.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-600">Terdaftar Sejak</p>
                    <p className="text-gray-900">
                      {new Date(selectedCustomer.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order History Placeholder */}
              <div className="border-t pt-6">
                <h3 className="text-gray-900 mb-3">Riwayat Pesanan</h3>
                <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-600">
                  Fitur riwayat pesanan pelanggan akan tersedia segera
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
