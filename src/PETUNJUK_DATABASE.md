# 📊 Petunjuk Database - Warung Digital Arkan

Penjelasan lengkap tentang struktur database, API endpoints, dan cara kerja sistem.

---

## 🏗️ **ARSITEKTUR SISTEM**

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (React App)                      │
│  - Login/Register                                            │
│  - Product Catalog                                           │
│  - Shopping Cart                                             │
│  - Checkout                                                  │
│  - Admin Dashboard                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP Requests (Fetch API)
                      │ Authorization: Bearer {publicAnonKey}
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTION (Backend)                │
│  - Hono Web Server                                           │
│  - Route handlers                                            │
│  - Business logic                                            │
│  - Data validation                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ KV Store Functions
                      │ get(), set(), del(), getByPrefix()
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE POSTGRESQL DATABASE                    │
│  Table: kv_store_d6ea81e6                                    │
│  - key (TEXT PRIMARY KEY)                                    │
│  - value (JSONB)                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ **STRUKTUR DATABASE**

### **Table: `kv_store_d6ea81e6`**

Key-Value store dengan format:

| Column | Type | Description |
|--------|------|-------------|
| `key` | TEXT | Primary key, format: `{type}:{id}` |
| `value` | JSONB | JSON object berisi data |

### **Key Patterns:**

```
user:{userId}              → User object
user:email:{email}         → Mapping email ke userId
product:{productId}        → Product object
order:{orderId}            → Order object
user:{userId}:orders       → Array of orderIds untuk user
cart:{userId}              → Cart data untuk user
```

---

## 📦 **DATA TYPES**

### **1. User**

```typescript
{
  id: string;              // "user-1234567890"
  email: string;           // "admin@arkan.com"
  password: string;        // Plain text (TODO: hash in production)
  name: string;            // "Admin Warung Arkan"
  phone: string;           // "081234567890"
  address: string;         // "Jl. Kebon Jeruk No. 1"
  role: 'customer' | 'admin';
  createdAt: string;       // ISO 8601 timestamp
}
```

**Storage:**
- `user:user-1234567890` → User object
- `user:email:admin@arkan.com` → "user-1234567890"

### **2. Product**

```typescript
{
  id: string;              // "prod-1"
  name: string;            // "Beras Premium 5kg"
  price: number;           // 75000
  stock: number;           // 50
  description: string;     // "Beras premium kualitas..."
  image: string;           // URL from Unsplash
  category: string;        // "sembako" | "minuman" | "makanan-ringan"
  createdAt: string;       // ISO 8601
  updatedAt: string;       // ISO 8601
}
```

**Storage:**
- `product:prod-1` → Product object

### **3. Order**

```typescript
{
  id: string;              // "order-1234567890"
  userId: string;          // "user-1234567890"
  userName: string;        // "John Doe"
  userEmail: string;       // "john@example.com"
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;           // 150000
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
```

**Storage:**
- `order:order-1234567890` → Order object
- `user:user-1234567890:orders` → ["order-1234567890", "order-1234567891"]

### **4. Cart**

```typescript
{
  userId: string;          // "user-1234567890"
  items: Array<{
    productId: string;     // "prod-1"
    quantity: number;      // 2
  }>;
  updatedAt: string;       // ISO 8601
}
```

**Storage:**
- `cart:user-1234567890` → Cart object

---

## 🔌 **API ENDPOINTS**

Base URL: `https://{projectId}.supabase.co/functions/v1/make-server-d6ea81e6`

### **👤 User Routes**

#### **POST /users/register**
Register user baru

**Request:**
```json
{
  "email": "customer@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "081234567890",
  "address": "Jl. Kebon Jeruk No. 1",
  "role": "customer"  // optional, default: "customer"
}
```

**Response:**
```json
{
  "id": "user-1234567890",
  "email": "customer@example.com",
  "name": "John Doe",
  "phone": "081234567890",
  "address": "Jl. Kebon Jeruk No. 1",
  "role": "customer",
  "createdAt": "2025-11-23T10:00:00.000Z"
}
```

#### **POST /users/login**
Login user

**Request:**
```json
{
  "email": "admin@arkan.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "id": "user-admin",
  "email": "admin@arkan.com",
  "name": "Admin Warung Arkan",
  "phone": "081234567890",
  "address": "Jl. Admin No. 1",
  "role": "admin",
  "createdAt": "2025-11-23T10:00:00.000Z"
}
```

#### **GET /users/:id**
Get user by ID

**Response:**
```json
{
  "id": "user-1234567890",
  "email": "customer@example.com",
  "name": "John Doe",
  ...
}
```

---

### **📦 Product Routes**

#### **GET /products**
Get all products

**Response:**
```json
[
  {
    "id": "prod-1",
    "name": "Beras Premium 5kg",
    "price": 75000,
    "stock": 50,
    "description": "Beras premium...",
    "image": "https://images.unsplash.com/...",
    "category": "sembako",
    "createdAt": "2025-11-23T10:00:00.000Z",
    "updatedAt": "2025-11-23T10:00:00.000Z"
  },
  ...
]
```

#### **GET /products/:id**
Get product by ID

#### **POST /products**
Create new product (Admin only)

**Request:**
```json
{
  "name": "Gula Pasir 1kg",
  "price": 15000,
  "stock": 100,
  "description": "Gula pasir berkualitas...",
  "image": "https://images.unsplash.com/...",
  "category": "sembako"
}
```

#### **PUT /products/:id**
Update product (Admin only)

**Request:**
```json
{
  "price": 16000,
  "stock": 80
}
```

#### **DELETE /products/:id**
Delete product (Admin only)

---

### **🛒 Order Routes**

#### **POST /orders**
Create order (checkout)

**Request:**
```json
{
  "userId": "user-1234567890",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "items": [
    {
      "productId": "prod-1",
      "productName": "Beras Premium 5kg",
      "price": 75000,
      "quantity": 2,
      "image": "https://..."
    }
  ],
  "total": 150000,
  "paymentMethod": "cod",
  "shippingAddress": {
    "name": "John Doe",
    "phone": "081234567890",
    "address": "Jl. Kebon Jeruk No. 1",
    "city": "Jakarta",
    "postalCode": "12345"
  }
}
```

**Response:**
```json
{
  "id": "order-1234567890",
  "userId": "user-1234567890",
  "status": "pending",
  "createdAt": "2025-11-23T10:30:00.000Z",
  ...
}
```

#### **GET /orders**
Get all orders (Admin only)

#### **GET /orders/user/:userId**
Get orders by user ID

#### **PUT /orders/:id/status**
Update order status (Admin only)

**Request:**
```json
{
  "status": "processing"  // pending | processing | shipped | completed | cancelled
}
```

---

### **🛍️ Cart Routes**

#### **GET /cart/:userId**
Get user's cart

**Response:**
```json
{
  "userId": "user-1234567890",
  "items": [
    {
      "productId": "prod-1",
      "quantity": 2
    }
  ],
  "updatedAt": "2025-11-23T10:15:00.000Z"
}
```

#### **POST /cart/:userId**
Save cart

**Request:**
```json
{
  "items": [
    {
      "productId": "prod-1",
      "quantity": 3
    }
  ]
}
```

#### **DELETE /cart/:userId**
Clear cart

---

### **🔧 Debug Routes**

#### **GET /health**
Health check

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-23T10:00:00.000Z"
}
```

#### **GET /debug/database**
Check database state

**Response:**
```json
{
  "productsCount": 6,
  "usersCount": 3,
  "adminUserId": "user-admin",
  "products": [...]
}
```

#### **POST /debug/init**
Manual database initialization

---

## 🔄 **FLOW DIAGRAM**

### **User Registration Flow:**

```
1. User fills registration form
   ↓
2. POST /users/register
   ↓
3. Check if email exists
   ├─ Yes → Return error
   └─ No  → Continue
   ↓
4. Generate userId (user-{timestamp})
   ↓
5. Save to database:
   - user:{userId} → User object
   - user:email:{email} → userId
   ↓
6. Return user data (without password)
```

### **Login Flow:**

```
1. User enters email & password
   ↓
2. POST /users/login
   ↓
3. Get userId from user:email:{email}
   ↓
4. Get user from user:{userId}
   ↓
5. Verify password
   ├─ Match    → Return user data
   └─ Mismatch → Return error
```

### **Checkout Flow:**

```
1. User fills shipping form
   ↓
2. POST /orders
   ↓
3. Generate orderId (order-{timestamp})
   ↓
4. Save order:
   - order:{orderId} → Order object
   - user:{userId}:orders → append orderId
   ↓
5. Clear cart: DELETE cart:{userId}
   ↓
6. Return order confirmation
```

---

## 🔐 **SECURITY**

### **Current (Development):**
- ✅ CORS enabled (allow all origins)
- ✅ Basic authentication (email + password)
- ⚠️ Password stored in plain text
- ⚠️ No rate limiting
- ⚠️ Service role key might be exposed

### **Production Recommendations:**

1. **Password Security:**
   ```typescript
   import bcrypt from 'bcrypt';
   
   // On registration:
   const hashedPassword = await bcrypt.hash(password, 10);
   
   // On login:
   const isValid = await bcrypt.compare(password, user.password);
   ```

2. **JWT Tokens:**
   ```typescript
   import jwt from 'jsonwebtoken';
   
   // Generate token on login:
   const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '7d' });
   
   // Verify on protected routes:
   const decoded = jwt.verify(token, SECRET_KEY);
   ```

3. **Row Level Security (RLS):**
   ```sql
   -- Users can only see their own data
   CREATE POLICY "Users can view own data"
   ON kv_store_d6ea81e6
   FOR SELECT
   USING (auth.uid()::text = split_part(key, ':', 2));
   ```

4. **Rate Limiting:**
   ```typescript
   import { rateLimiter } from 'hono/rate-limiter';
   
   app.use('/users/login', rateLimiter({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5 // 5 attempts
   }));
   ```

---

## 📊 **DATABASE QUERIES**

### **Count Records by Type:**

```sql
SELECT 
  substring(key from '^[^:]+') as type,
  COUNT(*) as count
FROM kv_store_d6ea81e6
GROUP BY substring(key from '^[^:]+')
ORDER BY count DESC;
```

### **List All Users:**

```sql
SELECT 
  key,
  value->>'email' as email,
  value->>'name' as name,
  value->>'role' as role
FROM kv_store_d6ea81e6
WHERE key LIKE 'user:user-%';
```

### **List All Products:**

```sql
SELECT 
  key,
  value->>'name' as name,
  (value->>'price')::numeric as price,
  (value->>'stock')::numeric as stock
FROM kv_store_d6ea81e6
WHERE key LIKE 'product:%';
```

### **Recent Orders:**

```sql
SELECT 
  key,
  value->>'userName' as customer,
  (value->>'total')::numeric as total,
  value->>'status' as status,
  value->>'createdAt' as created
FROM kv_store_d6ea81e6
WHERE key LIKE 'order:%'
ORDER BY value->>'createdAt' DESC
LIMIT 10;
```

---

## 🧪 **TESTING**

### **Test dengan cURL:**

```bash
# Health check
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-d6ea81e6/health

# Get products
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-d6ea81e6/products \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Login
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-d6ea81e6/users/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"email":"admin@arkan.com","password":"admin123"}'
```

---

## 📈 **MONITORING**

### **View Logs:**

```bash
# Real-time logs
supabase functions logs server --tail

# Filter errors only
supabase functions logs server --tail | grep ERROR
```

### **Database Stats:**

```sql
-- Table size
SELECT pg_size_pretty(pg_total_relation_size('kv_store_d6ea81e6'));

-- Index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE tablename = 'kv_store_d6ea81e6';
```

---

**📚 Dokumentasi ini akan membantu Anda memahami cara kerja database dan API!**
