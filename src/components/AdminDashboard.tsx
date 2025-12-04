import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllOrders, getAllCustomers } from '../utils/database';

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

interface AdminDashboardProps {
  onNavigateTo: (page: string) => void;
  onLogout: () => void;
}

const stats = [
  {
    label: 'Total Penjualan',
    value: 'Rp 2.450.000',
    icon: DollarSign,
    color: 'bg-blue-500',
    change: '+12%',
  },
  {
    label: 'Pesanan Hari Ini',
    value: '24',
    icon: ShoppingCart,
    color: 'bg-green-500',
    change: '+8%',
  },
  {
    label: 'Total Produk',
    value: '156',
    icon: Package,
    color: 'bg-purple-500',
    change: '+3%',
  },
  {
    label: 'Pelanggan Aktif',
    value: '89',
    icon: Users,
    color: 'bg-orange-500',
    change: '+15%',
  },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Ahmad Rizki', total: 125000, status: 'Diproses', date: '23 Nov 2025' },
  { id: 'ORD-002', customer: 'Siti Nurhaliza', total: 87500, status: 'Dikirim', date: '23 Nov 2025' },
  { id: 'ORD-003', customer: 'Budi Santoso', total: 156000, status: 'Selesai', date: '22 Nov 2025' },
  { id: 'ORD-004', customer: 'Dewi Lestari', total: 92000, status: 'Diproses', date: '22 Nov 2025' },
  { id: 'ORD-005', customer: 'Eko Prasetyo', total: 134500, status: 'Dikirim', date: '21 Nov 2025' },
];

export function AdminDashboard({ onNavigateTo, onLogout }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, customersData] = await Promise.all([
        getAllOrders(),
        getAllCustomers(),
      ]);
      setOrders(ordersData || []);
      
      // Use demo customers if no data
      if (!customersData || customersData.length === 0) {
        setCustomers([
          {
            id: 'user-cust-1',
            email: 'budi@example.com',
            name: 'Budi Santoso',
            phone: '081234567891',
            address: 'Jl. Merdeka No. 10, Jakarta',
            role: 'customer',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            password: '',
          },
          {
            id: 'user-cust-2',
            email: 'siti@example.com',
            name: 'Siti Nurhaliza',
            phone: '081234567892',
            address: 'Jl. Sudirman No. 20, Bandung',
            role: 'customer',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            password: '',
          },
        ]);
      } else {
        setCustomers(customersData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Set demo data on error
      setCustomers([
        {
          id: 'user-cust-1',
          email: 'budi@example.com',
          name: 'Budi Santoso',
          phone: '081234567891',
          address: 'Jl. Merdeka No. 10, Jakarta',
          role: 'customer',
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          password: '',
        },
        {
          id: 'user-cust-2',
          email: 'siti@example.com',
          name: 'Siti Nurhaliza',
          phone: '081234567892',
          address: 'Jl. Sudirman No. 20, Bandung',
          role: 'customer',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          password: '',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');

  // Calculate stats
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const todayOrders = orders.filter(o => {
    const orderDate = new Date(o.createdAt).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  }).length;

  const activeCustomers = customers.filter((c: any) => {
    const createdDate = new Date(c.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate >= thirtyDaysAgo;
  }).length;

  const stats = [
    {
      label: 'Total Penjualan',
      value: `Rp ${totalRevenue.toLocaleString('id-ID')}`,
      icon: DollarSign,
      color: 'bg-blue-500',
      change: `+${orders.length} pesanan`,
    },
    {
      label: 'Pesanan Hari Ini',
      value: todayOrders.toString(),
      icon: ShoppingCart,
      color: 'bg-green-500',
      change: `+${pendingOrders.length} menunggu`,
    },
    {
      label: 'Total Produk',
      value: '6',
      icon: Package,
      color: 'bg-purple-500',
      change: 'Aktif',
    },
    {
      label: 'Pelanggan Aktif',
      value: customers.length.toString(),
      icon: Users,
      color: 'bg-orange-500',
      change: `+${activeCustomers} aktif`,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diproses':
        return 'bg-yellow-100 text-yellow-700';
      case 'Dikirim':
        return 'bg-blue-100 text-blue-700';
      case 'Selesai':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-xl"
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
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Pesanan</span>
              {pendingOrders.length > 0 && (
                <div className="ml-auto flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {pendingOrders.length}
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
            <h1 className="text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Selamat datang di admin panel Warung Digital Arkan</p>
          </div>

          {/* Alert Pesanan Masuk */}
          {pendingOrders.length > 0 && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-red-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    🔴 Ada {pendingOrders.length} Pesanan Baru!
                  </h3>
                  <p className="text-red-700 mb-4">
                    Anda memiliki pesanan yang menunggu untuk diproses. Silakan periksa detail pesanan dan ubah statusnya.
                  </p>
                  <button
                    onClick={() => onNavigateTo('admin-orders')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Lihat Pesanan Masuk
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-gray-900">Pesanan Terbaru</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-gray-600">ID Pesanan</th>
                    <th className="text-left p-4 text-gray-600">Pelanggan</th>
                    <th className="text-left p-4 text-gray-600">Total</th>
                    <th className="text-left p-4 text-gray-600">Status</th>
                    <th className="text-left p-4 text-gray-600">Tanggal</th>
                    <th className="text-left p-4 text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-blue-900">{order.id}</td>
                      <td className="p-4 text-gray-900">{order.customer}</td>
                      <td className="p-4 text-gray-900">Rp {order.total.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-lg ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{order.date}</td>
                      <td className="p-4">
                        <button className="text-blue-900 hover:underline">Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}