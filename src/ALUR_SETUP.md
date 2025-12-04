# 📋 Alur Setup Lengkap - Warung Digital Arkan

Diagram visual untuk memudahkan setup dari download ZIP hingga aplikasi berjalan.

---

## 🎯 **OVERVIEW ALUR**

```
┌─────────────────┐
│  Download ZIP   │
│  dari Figma     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Extract ZIP    │
│  ke folder      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Buka di        │
│  VS Code        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  npm install    │
│  (2 menit)      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  PILIHAN SETUP DATABASE:        │
│                                 │
│  A. Pakai Supabase yang ada     │
│     (jika punya akses)          │
│                                 │
│  B. Buat Supabase baru          │
│     (recommended)               │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Setup          │
│  .env.local     │
│  (1 menit)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Buat Table     │
│  di Supabase    │
│  (2 menit)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deploy Edge    │
│  Function       │
│  (5 menit)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  npm run dev    │
│  (10 detik)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Buka Browser   │
│  localhost:5173 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Login Admin    │
│  SUKSES! 🎉     │
└─────────────────┘

TOTAL WAKTU: ~30-45 menit
```

---

## 📥 **FASE 1: Download & Setup Lokal (5 menit)**

### **1.1 Download**
```
Figma Make
    │
    │ [Download ZIP]
    ▼
warung-digital-arkan.zip
    │
    │ [Extract]
    ▼
📁 warung-digital-arkan/
   ├── components/
   ├── utils/
   ├── supabase/
   ├── App.tsx
   └── package.json
```

### **1.2 Buka di VS Code**
```
VS Code
  │
  │ File → Open Folder
  ▼
📁 warung-digital-arkan/
```

### **1.3 Install Dependencies**
```
Terminal VS Code
  │
  │ npm install
  ▼
📁 node_modules/
  ├── react/
  ├── vite/
  ├── tailwindcss/
  └── ... (234 packages)
  
✅ Dependencies installed!
```

---

## 🗄️ **FASE 2: Setup Supabase (15 menit)**

### **2.1 Buat Project**
```
https://supabase.com
    │
    │ Sign Up / Login
    ▼
Dashboard
    │
    │ New Project
    ▼
┌─────────────────────────────┐
│ Project Settings:           │
│                             │
│ Name: warung-digital-arkan  │
│ Password: ********          │
│ Region: Singapore           │
│ Plan: Free                  │
└─────────────┬───────────────┘
              │
              │ [Create]
              │ (tunggu ~2 menit)
              ▼
       Project Ready! ✅
```

### **2.2 Copy API Keys**
```
Supabase Dashboard
    │
    │ Settings → API
    ▼
┌──────────────────────────────────────────┐
│ Project URL:                             │
│ https://abcdef123456.supabase.co         │
│                                          │
│ API Keys:                                │
│                                          │
│ anon public:                             │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...         │
│                                          │
│ service_role: ⚠️ SECRET                  │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...         │
└──────────────────────────────────────────┘
    │
    │ [Copy All]
    ▼
  Simpan di Notepad sementara
```

### **2.3 Setup Environment Variables**
```
VS Code
    │
    │ New File: .env.local
    ▼
.env.local
────────────────────────────────────
VITE_SUPABASE_URL=https://abcdef123456.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
────────────────────────────────────
    │
    │ [Save]
    ▼
✅ Environment ready!
```

### **2.4 Buat Database Table**
```
Supabase Dashboard
    │
    │ SQL Editor → New Query
    ▼
SQL Editor
────────────────────────────────────
CREATE TABLE kv_store_d6ea81e6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

CREATE INDEX idx_kv_store_key 
  ON kv_store_d6ea81e6(key);

ALTER TABLE kv_store_d6ea81e6 
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" 
  ON kv_store_d6ea81e6
  FOR ALL USING (true) WITH CHECK (true);
────────────────────────────────────
    │
    │ [Run] (Ctrl+Enter)
    ▼
Success! ✅
    │
    ▼
Table Editor
    │
    └─ 📊 kv_store_d6ea81e6 (0 rows)
```

---

## 🚀 **FASE 3: Deploy Backend (10 menit)**

### **3.1 Install Supabase CLI**
```
Terminal
    │
    │ npm install -g supabase
    ▼
Downloading...
Installing...
    │
    ▼
✅ Supabase CLI installed!
    │
    │ supabase --version
    ▼
1.123.4
```

### **3.2 Login & Link**
```
Terminal
    │
    │ supabase login
    ▼
Opening browser...
    │
    ▼
Browser → Authorize
    │
    ▼
✅ Logged in!
    │
    │ supabase link --project-ref abcdef123456
    ▼
Enter database password: ********
    │
    ▼
✅ Linked to project!
```

### **3.3 Deploy Edge Function**
```
Terminal
    │
    │ supabase functions deploy server
    ▼
Uploading code...
Deploying...
    │
    ▼
┌──────────────────────────────────┐
│ Deployed Function: server        │
│                                  │
│ URL:                             │
│ https://abcdef123456.supabase.co │
│ /functions/v1/server             │
└──────────────────────────────────┘
    │
    ▼
✅ Backend deployed!
```

### **3.4 Set Secrets**
```
Terminal
    │
    │ supabase secrets set SUPABASE_URL=...
    ▼
✅ Secret set: SUPABASE_URL
    │
    │ supabase secrets set SUPABASE_ANON_KEY=...
    ▼
✅ Secret set: SUPABASE_ANON_KEY
    │
    │ supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
    ▼
✅ Secret set: SUPABASE_SERVICE_ROLE_KEY
```

### **3.5 Test Backend**
```
Terminal
    │
    │ curl https://abcdef123456.supabase.co/functions/v1/make-server-d6ea81e6/health
    ▼
{"status":"ok","timestamp":"2025-11-23T..."}
    │
    ▼
✅ Backend working!
```

---

## ▶️ **FASE 4: Jalankan Aplikasi (1 menit)**

### **4.1 Start Dev Server**
```
Terminal VS Code
    │
    │ npm run dev
    ▼
Vite starting...
Building...
    │
    ▼
┌────────────────────────────────┐
│  VITE v5.0.12  ready in 234 ms │
│                                │
│  ➜  Local:   http://localhost:5173/ │
│  ➜  Network: use --host to expose   │
└────────────────────────────────┘
    │
    ▼
✅ Server running!
```

### **4.2 Buka Browser**
```
Browser
    │
    │ Open: http://localhost:5173
    ▼
┌──────────────────────────────────────┐
│   🛒 Warung Digital Arkan            │
│                                      │
│   Belanja kebutuhan harian lebih     │
│   mudah                              │
│                                      │
│   ┌────────────────────────────┐    │
│   │ Email / Nomor HP           │    │
│   └────────────────────────────┘    │
│                                      │
│   ┌────────────────────────────┐    │
│   │ Password                   │    │
│   └────────────────────────────┘    │
│                                      │
│   [  Masuk  ]                        │
│                                      │
│   Belum punya akun? Daftar sekarang  │
└──────────────────────────────────────┘
```

### **4.3 Login**
```
Login Form
    │
    │ Email: admin@arkan.com
    │ Password: admin123
    │
    │ [Masuk]
    ▼
Authenticating...
    │
    ▼
✅ Login Success!
    │
    ▼
┌──────────────────────────────────────┐
│   Dashboard Admin                    │
│                                      │
│   📊 Total Produk: 6                 │
│   📦 Pesanan Pending: 0              │
│   👥 Total Pelanggan: 1              │
│   💰 Total Penjualan: Rp 0           │
│                                      │
│   📦 Produk Terbaru:                 │
│   - Beras Premium 5kg                │
│   - Air Mineral 600ml                │
│   - Mie Instan Goreng                │
│   ...                                │
└──────────────────────────────────────┘
```

---

## 🎉 **SUKSES! Aplikasi Berjalan!**

```
┌────────────────────────────────────────┐
│                                        │
│    ✅ Frontend: Running                │
│    ✅ Backend: Deployed                │
│    ✅ Database: Connected              │
│    ✅ Admin: Logged in                 │
│                                        │
│    🎊 SEMUA SISTEM BERJALAN! 🎊        │
│                                        │
└────────────────────────────────────────┘
```

---

## 🔄 **ALUR SETELAH SETUP AWAL**

### **Jalankan Lagi (Hari Berikutnya)**
```
1. Buka VS Code
   │
   ▼
2. Buka folder project
   │
   ▼
3. Open terminal (Ctrl+~)
   │
   ▼
4. npm run dev
   │
   ▼
5. Buka browser: localhost:5173
   │
   ▼
6. ✅ Langsung jalan! (10 detik)
```

### **Update Code & Deploy**
```
Edit Code
   │
   ▼
Save (Ctrl+S)
   │
   ▼
Hot Reload (auto refresh di browser)
   │
   ▼
Jika edit backend:
   │
   ▼
supabase functions deploy server
   │
   ▼
✅ Updated!
```

---

## 📊 **DATA FLOW DIAGRAM**

### **Login Flow:**
```
User Input
(email + password)
    │
    ▼
Frontend (React)
POST /users/login
    │
    ▼
Edge Function (Hono)
Validate credentials
    │
    ├─ Valid ──────────────┐
    │                      │
    └─ Invalid ───┐        │
                  │        │
                  ▼        ▼
             Error 401  Success 200
                  │        │
                  ▼        ▼
            Show error  Return user data
                          │
                          ▼
                     Save to state
                          │
                          ▼
                    Show Dashboard
```

### **Add Product Flow (Admin):**
```
Admin fills form
(name, price, stock, etc)
    │
    ▼
Click "Simpan"
    │
    ▼
Frontend (React)
POST /products
    │
    ▼
Edge Function (Hono)
Generate product ID
    │
    ▼
KV Store
set(`product:prod-123`, productData)
    │
    ▼
PostgreSQL
INSERT INTO kv_store_d6ea81e6
    │
    ▼
Return new product
    │
    ▼
Frontend updates list
    │
    ▼
✅ Product added!
```

### **Checkout Flow:**
```
Customer Cart
[Beras 2x, Air 3x]
    │
    ▼
Fill shipping form
    │
    ▼
Select payment method
    │
    ▼
Click "Konfirmasi Pesanan"
    │
    ▼
Frontend
POST /orders
    │
    ▼
Edge Function
Generate order ID
Save order data
    │
    ▼
Database
order:order-123 → Order object
user:user-456:orders → append order-123
    │
    ▼
Clear cart
cart:user-456 → delete
    │
    ▼
Return order confirmation
    │
    ▼
Show success page
✅ Pesanan berhasil!
```

---

## 🎯 **DECISION TREE: Error Troubleshooting**

```
Error terjadi?
    │
    ├─ Login gagal
    │   │
    │   ├─ "Invalid email or password"
    │   │   └─> Initialize DB manual
    │   │       curl POST /debug/init
    │   │
    │   └─ "Failed to fetch"
    │       └─> Deploy backend
    │           supabase functions deploy server
    │
    ├─ npm install gagal
    │   │
    │   ├─ Permission error
    │   │   └─> Run as admin/sudo
    │   │
    │   └─ Network error
    │       └─> npm cache clean --force
    │           npm install
    │
    ├─ Port already in use
    │   └─> npm run dev -- --port 3000
    │
    ├─ Database empty
    │   └─> curl POST /debug/init
    │
    └─ Backend error
        └─> Check logs:
            supabase functions logs server --tail
```

---

## 📈 **PROGRESS CHECKLIST**

```
Setup Progress:

├─ ✅ Download ZIP
├─ ✅ Extract
├─ ✅ Open in VS Code
├─ ✅ npm install
│
├─ ✅ Create Supabase project
├─ ✅ Copy API keys
├─ ✅ Create .env.local
├─ ✅ Run SQL (create table)
│
├─ ✅ Install Supabase CLI
├─ ✅ Login to Supabase
├─ ✅ Link project
├─ ✅ Deploy Edge Function
├─ ✅ Set secrets
│
├─ ✅ npm run dev
├─ ✅ Open browser
├─ ✅ Login success
│
└─ 🎉 DONE! Application running!
```

---

## ⏱️ **TIMELINE ESTIMASI**

```
┌────────────────────────────────┐
│ Download & Extract    │ 2 min  │
├────────────────────────────────┤
│ Open VS Code          │ 1 min  │
├────────────────────────────────┤
│ npm install           │ 2 min  │
├────────────────────────────────┤
│ Create Supabase       │ 5 min  │
├────────────────────────────────┤
│ Setup .env.local      │ 2 min  │
├────────────────────────────────┤
│ Create table          │ 2 min  │
├────────────────────────────────┤
│ Install Supabase CLI  │ 2 min  │
├────────────────────────────────┤
│ Deploy backend        │ 5 min  │
├────────────────────────────────┤
│ npm run dev           │ 1 min  │
├────────────────────────────────┤
│ Test & verify         │ 3 min  │
└────────────────────────────────┘
   TOTAL: 25-30 menit (pertama kali)
   
Next time: 1 menit (cukup npm run dev)
```

---

**🎊 Semoga alur ini membantu! Ikuti step by step dan pasti berhasil!** 🚀
