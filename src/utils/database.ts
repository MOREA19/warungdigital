// Database utility functions using Supabase KV Store
import { projectId, publicAnonKey } from './supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d6ea81e6`;

// Use the correct JWT token (not the publishable key)
const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634";

// User types
export interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  name: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface Order {
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

// Cart types
export interface CartData {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  updatedAt: string;
}

// Generic API call helper
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const fullUrl = `${API_URL}${endpoint}`;
    console.log('API Call:', {
      method: options.method || 'GET',
      url: fullUrl,
      hasAuth: !!options.headers?.Authorization
    });

    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`,
        ...options.headers,
      },
    });

    const responseText = await response.text();
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText.substring(0, 200)
    });

    if (!response.ok) {
      console.error(`API Error (${response.status}):`, responseText);
      
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {}
      
      throw new Error(errorMessage);
    }

    try {
      return JSON.parse(responseText);
    } catch {
      return responseText as any;
    }
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

// ============= USER FUNCTIONS =============

export async function registerUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  return apiCall<User>('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function loginUser(email: string, password: string): Promise<User> {
  return apiCall<User>('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    return await apiCall<User>(`/users/${userId}`, { method: 'GET' });
  } catch {
    return null;
  }
}

export async function getAllCustomers(): Promise<User[]> {
  try {
    // Try /customers endpoint first
    try {
      const customers = await apiCall<User[]>('/customers', { method: 'GET' });
      if (customers && customers.length > 0) {
        return customers;
      }
    } catch (err) {
      console.warn('❌ /customers endpoint failed, trying /users...', err);
    }

    // Fallback to /users endpoint
    try {
      const allUsers = await apiCall<User[]>('/users', { method: 'GET' });
      if (allUsers && Array.isArray(allUsers)) {
        // Filter only customers (not admins) from /users response
        return allUsers.filter(user => user.role === 'customer');
      }
    } catch (err) {
      console.warn('❌ /users endpoint failed too', err);
    }

    // If both fail, return empty (will show "Belum Ada Data Pelanggan")
    return [];
  } catch (error) {
    console.error('❌ Error fetching customers:', error);
    return [];
  }
}

// ============= PRODUCT FUNCTIONS =============

export async function getAllProducts(): Promise<Product[]> {
  return apiCall<Product[]>('/products', { method: 'GET' });
}

export async function getProductById(productId: string): Promise<Product | null> {
  try {
    return await apiCall<Product>(`/products/${productId}`, { method: 'GET' });
  } catch {
    return null;
  }
}

export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  return apiCall<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(productId: string, productData: Partial<Product>): Promise<Product> {
  return apiCall<Product>(`/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(productId: string): Promise<void> {
  await apiCall<void>(`/products/${productId}`, { method: 'DELETE' });
}

// ============= ORDER FUNCTIONS =============

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  return apiCall<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getAllOrders(): Promise<Order[]> {
  return apiCall<Order[]>('/orders', { method: 'GET' });
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  return apiCall<Order[]>(`/orders/user/${userId}`, { method: 'GET' });
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
  return apiCall<Order>(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

// ============= CART FUNCTIONS =============

export async function getCart(userId: string): Promise<CartData | null> {
  try {
    return await apiCall<CartData>(`/cart/${userId}`, { method: 'GET' });
  } catch {
    return null;
  }
}

export async function saveCart(userId: string, items: CartData['items']): Promise<void> {
  await apiCall<void>(`/cart/${userId}`, {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

export async function clearCart(userId: string): Promise<void> {
  await apiCall<void>(`/cart/${userId}`, { method: 'DELETE' });
}
