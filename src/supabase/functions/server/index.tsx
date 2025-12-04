import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware - CORS and logging (no JWT verification needed)
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

// Middleware to handle missing or invalid auth gracefully
app.use('*', async (c, next) => {
  // Don't block requests without auth - let handlers decide
  try {
    await next();
  } catch (e) {
    if (e instanceof Error && e.message.includes('jwt')) {
      return c.json({ error: 'Auth error', message: e.message }, 401);
    }
    throw e;
  }
});

// Types
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

interface Product {
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

interface CartData {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  updatedAt: string;
}

// ============= INITIALIZATION =============

// Initialize with sample data if database is empty
async function initializeDatabase() {
  try {
    console.log('Checking database initialization...');
    const products = await kv.getByPrefix('product:');
    
    if (products.length === 0) {
      console.log('Initializing database with sample data...');
      
      // Create admin user first
      const adminUser: User = {
        id: 'user-admin',
        email: 'admin@arkan.com',
        password: 'admin123',
        name: 'Admin Warung Arkan',
        phone: '081234567890',
        address: 'Jl. Admin No. 1',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      
      await kv.set(`user:${adminUser.id}`, adminUser);
      await kv.set(`user:email:${adminUser.email}`, adminUser.id);
      console.log('Admin user created:', adminUser.email);
      
      // Create sample customers
      const sampleCustomers: User[] = [
        {
          id: 'user-cust-1',
          email: 'budi@example.com',
          password: 'password123',
          name: 'Budi Santoso',
          phone: '081234567891',
          address: 'Jl. Merdeka No. 10, Jakarta',
          role: 'customer',
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        },
        {
          id: 'user-cust-2',
          email: 'siti@example.com',
          password: 'password123',
          name: 'Siti Nurhaliza',
          phone: '081234567892',
          address: 'Jl. Sudirman No. 20, Bandung',
          role: 'customer',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        },
      ];
      
      for (const customer of sampleCustomers) {
        await kv.set(`user:${customer.id}`, customer);
        await kv.set(`user:email:${customer.email}`, customer.id);
        console.log('Sample customer created:', customer.email);
      }
      
      // Create sample products
      const sampleProducts = [
        {
          id: 'prod-1',
          name: 'Beras Premium 5kg',
          price: 75000,
          stock: 50,
          description: 'Beras premium kualitas terbaik, pulen dan wangi. Cocok untuk keluarga Indonesia.',
          image: 'https://images.unsplash.com/photo-1505216980056-a7b7b1c6e000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZ3JvY2VyaWVzfGVufDF8fHx8MTc2Mzg5NTE0MXww&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'sembako',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'prod-2',
          name: 'Air Mineral 600ml',
          price: 3500,
          stock: 100,
          description: 'Air mineral berkualitas, higienis dan menyegarkan. Dikemas dalam botol praktis.',
          image: 'https://images.unsplash.com/photo-1587310972467-27a5c504bfb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3R0bGVkJTIwd2F0ZXIlMjBkcmlua3N8ZW58MXx8fHwxNzYzODE5ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'minuman',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'prod-3',
          name: 'Mie Instan Goreng',
          price: 2500,
          stock: 150,
          description: 'Mie instan goreng rasa ayam bawang, praktis dan lezat. Siap dalam 3 menit.',
          image: 'https://images.unsplash.com/photo-1679279726940-be5ce80c632c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwbm9vZGxlcyUyMHBhY2thZ2V8ZW58MXx8fHwxNzYzODk1MTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'sembako',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'prod-4',
          name: 'Minyak Goreng 2L',
          price: 32000,
          stock: 40,
          description: 'Minyak goreng berkualitas, jernih dan tidak berbau. Cocok untuk memasak sehari-hari.',
          image: 'https://images.unsplash.com/photo-1757801333069-f7b3cabaec4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwb2lsJTIwYm90dGxlfGVufDF8fHx8MTc2MzgzNTM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'sembako',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'prod-5',
          name: 'Keripik Kentang',
          price: 8000,
          stock: 80,
          description: 'Keripik kentang renyah dengan berbagai varian rasa. Cocok untuk cemilan.',
          image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwc3xlbnwxfHx8fDE3NjM4Mjc2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'makanan-ringan',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'prod-6',
          name: 'Kopi Sachet 10pcs',
          price: 12000,
          stock: 60,
          description: 'Kopi instan dalam kemasan sachet praktis. Rasa nikmat dan aromanya khas.',
          image: 'https://images.unsplash.com/photo-1549403610-177341eb0f67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzYWNoZXRzfGVufDF8fHx8MTc2Mzg5NTE0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'minuman',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      for (const product of sampleProducts) {
        await kv.set(`product:${product.id}`, product);
        console.log('Product created:', product.name);
      }

      console.log('Database initialized successfully!');
    } else {
      console.log('Database already initialized with', products.length, 'products');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize on server start
console.log('Starting server initialization...');
initializeDatabase().then(() => {
  console.log('Server ready!');
});

// ============= USER ROUTES =============

// Register user
app.post('/make-server-d6ea81e6/users/register', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, phone, address, role = 'customer' } = body;

    // Check if email exists
    const existingUserId = await kv.get(`user:email:${email}`);
    if (existingUserId) {
      return c.json({ error: 'Email already exists' }, 400);
    }

    const userId = `user-${Date.now()}`;
    const user: User = {
      id: userId,
      email,
      password, // In production, hash this with bcrypt
      name,
      phone,
      address,
      role,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${userId}`, user);
    await kv.set(`user:email:${email}`, userId);

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    return c.json(userWithoutPassword);
  } catch (error) {
    console.error('Error registering user:', error);
    return c.json({ error: 'Failed to register user' }, 500);
  }
});

// Login user
app.post('/make-server-d6ea81e6/users/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    console.log('Login attempt for email:', email);

    const userId = await kv.get(`user:email:${email}`);
    console.log('Retrieved userId:', userId);
    
    if (!userId) {
      console.log('User not found for email:', email);
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    const user = await kv.get(`user:${userId}`) as User;
    console.log('Retrieved user:', user ? 'User found' : 'User not found');
    
    if (!user) {
      console.log('User data not found for userId:', userId);
      return c.json({ error: 'Invalid email or password' }, 401);
    }
    
    if (user.password !== password) {
      console.log('Password mismatch for user:', email);
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    console.log('Login successful for user:', email);
    const { password: _, ...userWithoutPassword } = user;
    return c.json(userWithoutPassword);
  } catch (error) {
    console.error('Error logging in:', error);
    return c.json({ error: 'Failed to login' }, 500);
  }
});

// Get user by ID
app.get('/make-server-d6ea81e6/users/:id', async (c) => {
  try {
    const userId = c.req.param('id');
    const user = await kv.get(`user:${userId}`) as User;
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const { password: _, ...userWithoutPassword } = user;
    return c.json(userWithoutPassword);
  } catch (error) {
    console.error('Error getting user:', error);
    return c.json({ error: 'Failed to get user' }, 500);
  }
});

// Get all users
app.get('/make-server-d6ea81e6/users', async (c) => {
  try {
    let allKeys = await kv.getByPrefix('user:') as any[];
    
    // If no data, initialize database first
    if (allKeys.length === 0) {
      console.log('⚠️ Database empty, initializing...');
      await initializeDatabase();
      allKeys = await kv.getByPrefix('user:') as any[];
    }
    
    // Filter only user objects (not email lookup keys), exclude admins, and remove passwords
    const customers = allKeys
      .filter(item => {
        // Check if it's a User object with proper structure
        return item && 
               typeof item === 'object' &&
               item.id && 
               typeof item.id === 'string' &&
               item.id.startsWith('user-') &&
               item.role === 'customer' &&
               item.email; // Must have email
      })
      .map(user => {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    
    console.log('✅ All users endpoint - retrieved customers:', customers.length);
    return c.json(customers);
  } catch (error) {
    console.error('Error getting users:', error);
    return c.json({ error: 'Failed to get users' }, 500);
  }
});

// Get customers (alias for /users for easier access)
app.get('/make-server-d6ea81e6/customers', async (c) => {
  try {
    // Get all items with prefix user: (both user objects and email lookup keys)
    let allValues = await kv.getByPrefix('user:') as any[];
    
    console.log('📊 All values from kv store:', allValues.length);
    
    // If no data, initialize database first
    if (allValues.length === 0) {
      console.log('⚠️ Database empty, initializing...');
      await initializeDatabase();
      allValues = await kv.getByPrefix('user:') as any[];
    }
    
    // Filter ONLY user objects (those with id, email, role, createdAt fields)
    // Skip email lookup keys (which are strings like 'user-cust-1')
    let users = allValues.filter(item => {
      // Check if it's a user object (has these properties)
      const isUserObject = item && 
                          typeof item === 'object' &&
                          item.id && 
                          item.email && 
                          item.role &&
                          item.createdAt;
      return isUserObject;
    }) as User[];
    
    console.log('👥 User objects found:', users.length);
    
    // Filter customers (exclude admins) and remove passwords
    const customers = users
      .filter(user => user.role === 'customer')
      .map(user => {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    console.log('✅ Returning', customers.length, 'customers');
    return c.json(customers);
  } catch (error) {
    console.error('❌ Error getting customers:', error);
    return c.json({ error: 'Failed to get customers', details: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});

// ============= PRODUCT ROUTES =============

// Get all products
app.get('/make-server-d6ea81e6/products', async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    return c.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    return c.json({ error: 'Failed to get products' }, 500);
  }
});

// Get product by ID
app.get('/make-server-d6ea81e6/products/:id', async (c) => {
  try {
    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    return c.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    return c.json({ error: 'Failed to get product' }, 500);
  }
});

// Create product
app.post('/make-server-d6ea81e6/products', async (c) => {
  try {
    const body = await c.req.json();
    const productId = `prod-${Date.now()}`;
    
    const product: Product = {
      id: productId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`product:${productId}`, product);
    return c.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
});

// Update product
app.put('/make-server-d6ea81e6/products/:id', async (c) => {
  try {
    const productId = c.req.param('id');
    const body = await c.req.json();
    
    const existingProduct = await kv.get(`product:${productId}`) as Product;
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404);
    }

    const updatedProduct: Product = {
      ...existingProduct,
      ...body,
      id: productId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`product:${productId}`, updatedProduct);
    return c.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return c.json({ error: 'Failed to update product' }, 500);
  }
});

// Delete product
app.delete('/make-server-d6ea81e6/products/:id', async (c) => {
  try {
    const productId = c.req.param('id');
    await kv.del(`product:${productId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return c.json({ error: 'Failed to delete product' }, 500);
  }
});

// ============= ORDER ROUTES =============

// Create order
app.post('/make-server-d6ea81e6/orders', async (c) => {
  try {
    const body = await c.req.json();
    const orderId = `order-${Date.now()}`;
    
    const order: Order = {
      id: orderId,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`order:${orderId}`, order);
    
    // Also store order ID in user's order list
    const userOrders = await kv.get(`user:${body.userId}:orders`) as string[] || [];
    userOrders.push(orderId);
    await kv.set(`user:${body.userId}:orders`, userOrders);

    return c.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
});

// Get all orders
app.get('/make-server-d6ea81e6/orders', async (c) => {
  try {
    const orders = await kv.getByPrefix('order:');
    // Sort by createdAt descending
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return c.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    return c.json({ error: 'Failed to get orders' }, 500);
  }
});

// Get orders by user ID
app.get('/make-server-d6ea81e6/orders/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const orderIds = await kv.get(`user:${userId}:orders`) as string[] || [];
    
    const orders = await Promise.all(
      orderIds.map(orderId => kv.get(`order:${orderId}`))
    );
    
    return c.json(orders.filter(Boolean));
  } catch (error) {
    console.error('Error getting user orders:', error);
    return c.json({ error: 'Failed to get user orders' }, 500);
  }
});

// Update order status
app.put('/make-server-d6ea81e6/orders/:id/status', async (c) => {
  try {
    const orderId = c.req.param('id');
    const { status } = await c.req.json();
    
    const order = await kv.get(`order:${orderId}`) as Order;
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();
    
    await kv.set(`order:${orderId}`, order);
    return c.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    return c.json({ error: 'Failed to update order status' }, 500);
  }
});

// ============= CART ROUTES =============

// Get cart
app.get('/make-server-d6ea81e6/cart/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const cart = await kv.get(`cart:${userId}`) as CartData;
    return c.json(cart || { userId, items: [], updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error getting cart:', error);
    return c.json({ error: 'Failed to get cart' }, 500);
  }
});

// Save cart
app.post('/make-server-d6ea81e6/cart/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const { items } = await c.req.json();
    
    const cart: CartData = {
      userId,
      items,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`cart:${userId}`, cart);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error saving cart:', error);
    return c.json({ error: 'Failed to save cart' }, 500);
  }
});

// Clear cart
app.delete('/make-server-d6ea81e6/cart/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    await kv.del(`cart:${userId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return c.json({ error: 'Failed to clear cart' }, 500);
  }
});

// Health check
app.get('/make-server-d6ea81e6/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug endpoint - check database state
app.get('/make-server-d6ea81e6/debug/database', async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    const users = await kv.getByPrefix('user:');
    const adminUserId = await kv.get('user:email:admin@arkan.com');
    
    return c.json({
      productsCount: products.length,
      usersCount: users.length,
      adminUserId: adminUserId,
      products: products.slice(0, 2), // First 2 products only
    });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// Manual initialization endpoint
app.post('/make-server-d6ea81e6/debug/init', async (c) => {
  try {
    await initializeDatabase();
    return c.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);