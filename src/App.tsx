import { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { CustomerDashboard } from './components/CustomerDashboard';
import { CustomerProfile } from './components/CustomerProfile';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminProductManagement } from './components/AdminProductManagement';
import { AdminOrders } from './components/AdminOrders';
import { AdminCustomers } from './components/AdminCustomers';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: CartItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin';
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'customer') {
      setCurrentPage('customer-dashboard');
    } else {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setCart([]);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <Login
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        );
      case 'register':
        return (
          <Register
            onRegister={() => setCurrentPage('login')}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
      case 'customer-dashboard':
        return (
          <CustomerDashboard
            onViewProduct={viewProductDetail}
            onAddToCart={addToCart}
            cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onNavigateToCart={() => setCurrentPage('cart')}
            onNavigateToProfile={() => setCurrentPage('customer-profile')}
            onLogout={handleLogout}
          />
        );
      case 'customer-profile':
        return (
          <CustomerProfile
            user={currentUser}
            onBack={() => setCurrentPage('customer-dashboard')}
            onUpdateUser={setCurrentUser}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentPage('customer-dashboard')}
            cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onNavigateToCart={() => setCurrentPage('cart')}
          />
        ) : null;
      case 'cart':
        return (
          <ShoppingCart
            items={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentPage('checkout')}
            onContinueShopping={() => setCurrentPage('customer-dashboard')}
          />
        );
      case 'checkout':
        return (
          <Checkout
            items={cart}
            currentUser={currentUser}
            onConfirmOrder={() => {
              setCart([]);
              setCurrentPage('customer-dashboard');
            }}
            onBack={() => setCurrentPage('cart')}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            onNavigateTo={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case 'admin-products':
        return (
          <AdminProductManagement
            onNavigateTo={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case 'admin-orders':
        return (
          <AdminOrders
            onNavigateTo={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case 'admin-customers':
        return (
          <AdminCustomers
            onNavigateTo={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

export default App;