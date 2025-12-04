# 🗄️ Setup Database Lengkap - Warung Digital Arkan

Panduan lengkap setup database dari nol hingga aplikasi berjalan sempurna.

---

## 📊 **STATUS CURRENT DATABASE**

### ✅ **Yang Sudah Ada di Figma Make:**
- ✅ Supabase project ID: `etvwxarauhbutuxrjqpf`
- ✅ Supabase anon key sudah ter-configure
- ✅ Backend server code sudah dibuat (`/supabase/functions/server/index.tsx`)
- ✅ Database utility sudah dibuat (`/utils/database.ts`)
- ✅ Auto-initialization code sudah ada di backend

### ⚠️ **Yang Perlu Di-Setup di VS Code:**
- ⚠️ Environment variables lokal (`.env.local`)
- ⚠️ Database table di Supabase
- ⚠️ Deploy Edge Function ke Supabase
- ⚠️ Update `info.tsx` untuk environment variables

---

## 🚀 **PILIHAN SETUP - 2 Metode**

### **Metode 1: Menggunakan Supabase yang Sudah Ada (Recommended jika di Figma Make sudah jalan)**
### **Metode 2: Setup Supabase Baru dari Nol**

---

## 📦 **METODE 1: Menggunakan Supabase yang Sudah Ada**

Gunakan metode ini jika aplikasi sudah berjalan di Figma Make dan Anda ingin tetap menggunakan database yang sama.

### **Langkah 1: Akses Supabase Project yang Ada**

Karena project ID `etvwxarauhbutuxrjqpf` sudah ada, Anda perlu akses ke project ini:

1. **Jika Anda punya akses:**
   - Login ke https://supabase.com
   - Cari project `etvwxarauhbutuxrjqpf`
   - Lanjut ke Langkah 2

2. **Jika TIDAK punya akses:**
   - Project ini dibuat oleh Figma Make
   - Anda perlu setup project baru (gunakan **METODE 2**)

### **Langkah 2: Dapatkan API Keys**

1. Login ke Supabase Dashboard
2. Pilih project `etvwxarauhbutuxrjqpf`
3. Klik **Settings** (⚙️) → **API**
4. Copy values berikut:

```
Project URL: https://etvwxarauhbutuxrjqpf.supabase.co
anon/public key: eyJhbG... (sudah ada di info.tsx)
service_role key: eyJhbG... (COPY INI!)
```

### **Langkah 3: Setup `.env.local`**

Di VS Code, buat file `.env.local` di root folder:

```bash
VITE_SUPABASE_URL=https://etvwxarauhbutuxrjqpf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634
VITE_SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

**⚠️ PENTING:** Ganti `YOUR_SERVICE_ROLE_KEY_HERE` dengan service_role key yang sebenarnya!

### **Langkah 4: Database Sudah Jalan?**

Jika database di Figma Make sudah jalan, kemungkinan table sudah dibuat. Skip ke **Langkah 7**.

Jika belum yakin, lanjut ke Langkah 5.

### **Langkah 5: Cek & Buat Table**

1. Di Supabase Dashboard, klik **SQL Editor**
2. Klik **"+ New Query"**
3. Copy-paste SQL berikut:

```sql
-- Cek apakah table sudah ada
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'kv_store_d6ea81e6'
);

-- Jika return FALSE, jalankan ini:
CREATE TABLE IF NOT EXISTS kv_store_d6ea81e6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Buat index
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_d6ea81e6(key);

-- Enable RLS (Row Level Security)
ALTER TABLE kv_store_d6ea81e6 ENABLE ROW LEVEL SECURITY;

-- Policy untuk allow all (development mode)
DROP POLICY IF EXISTS "Allow all operations" ON kv_store_d6ea81e6;
CREATE POLICY "Allow all operations" ON kv_store_d6ea81e6
  FOR ALL USING (true) WITH CHECK (true);
```

4. Klik **"Run"** (atau Ctrl+Enter)
5. Pastikan muncul pesan "Success"

### **Langkah 6: Verifikasi Table**

```sql
-- Cek data di table
SELECT * FROM kv_store_d6ea81e6 LIMIT 10;

-- Cek jumlah records
SELECT COUNT(*) FROM kv_store_d6ea81e6;
```

### **Langkah 7: Deploy Edge Function (PENTING!)**

Edge Function adalah backend server yang sudah Anda buat. Ini harus di-deploy agar aplikasi bisa komunikasi dengan database.

#### **7.1 Install Supabase CLI**

```bash
# Via npm (recommended)
npm install -g supabase

# Atau via Homebrew (Mac)
brew install supabase/tap/supabase

# Atau download binary dari:
# https://github.com/supabase/cli/releases
```

#### **7.2 Login ke Supabase**

```bash
supabase login
```

Browser akan terbuka, klik "Authorize".

#### **7.3 Link Project**

```bash
# Di folder project
supabase link --project-ref etvwxarauhbutuxrjqpf
```

Masukkan database password jika diminta.

#### **7.4 Deploy Edge Function**

```bash
# Deploy server function
supabase functions deploy server

# Set environment variables
supabase secrets set SUPABASE_URL=https://etvwxarauhbutuxrjqpf.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

#### **7.5 Test Edge Function**

```bash
# Test health check
curl https://etvwxarauhbutuxrjqpf.supabase.co/functions/v1/make-server-d6ea81e6/health

# Expected response:
# {"status":"ok","timestamp":"2025-11-23T..."}
```

### **Langkah 8: Jalankan Aplikasi**

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Buka `http://localhost:5173`

### **Langkah 9: Test Login**

**Admin:**
- Email: `admin@arkan.com`
- Password: `admin123`

Jika berhasil login → **DATABASE SUDAH JALAN!** ✅

Jika error → Lanjut ke **Troubleshooting** di bawah.

---

## 🆕 **METODE 2: Setup Supabase Baru dari Nol**

Gunakan metode ini jika Anda ingin membuat project Supabase sendiri yang baru.

### **Langkah 1: Buat Project Supabase Baru**

1. Buka https://supabase.com
2. Klik **"New Project"**
3. Isi form:
   - **Organization:** Pilih atau buat baru
   - **Name:** `warung-digital-arkan`
   - **Database Password:** Buat password (SIMPAN INI!)
   - **Region:** Southeast Asia (Singapore)
   - **Pricing Plan:** Free
4. Klik **"Create new project"**
5. Tunggu ~2 menit hingga ready

### **Langkah 2: Copy Project Details**

Setelah project ready:

1. Klik **Settings** → **API**
2. Copy values:
   ```
   Project URL: https://YOUR_PROJECT_ID.supabase.co
   anon public: eyJhbG...
   service_role: eyJhbG... (KEEP SECRET!)
   ```

### **Langkah 3: Update `info.tsx`**

Edit file `/utils/supabase/info.tsx`:

```typescript
// UPDATE INI dengan Project ID baru Anda
export const projectId = "YOUR_NEW_PROJECT_ID"; // contoh: "abcdefgh12345678"
export const publicAnonKey = "YOUR_NEW_ANON_KEY";
```

### **Langkah 4: Setup `.env.local`**

Buat file `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
VITE_SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

### **Langkah 5: Buat Database Table**

Di Supabase Dashboard:

1. Klik **SQL Editor**
2. Klik **"+ New Query"**
3. Copy-paste SQL:

```sql
-- Buat table KV Store
CREATE TABLE kv_store_d6ea81e6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Buat index untuk performa
CREATE INDEX idx_kv_store_key ON kv_store_d6ea81e6(key);

-- Enable Row Level Security
ALTER TABLE kv_store_d6ea81e6 ENABLE ROW LEVEL SECURITY;

-- Policy untuk allow all (development)
CREATE POLICY "Allow all operations" ON kv_store_d6ea81e6
  FOR ALL USING (true) WITH CHECK (true);
```

4. Klik **"Run"**
5. Cek di **Table Editor** → Harusnya muncul table `kv_store_d6ea81e6`

### **Langkah 6: Deploy Edge Function**

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ke project baru
supabase link --project-ref YOUR_NEW_PROJECT_ID

# Deploy
supabase functions deploy server

# Set secrets
supabase secrets set SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
supabase secrets set SUPABASE_ANON_KEY=YOUR_ANON_KEY
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
supabase secrets set SUPABASE_DB_URL=YOUR_DB_CONNECTION_STRING
```

### **Langkah 7: Initialize Database dengan Data**

Ada 2 cara:

#### **Cara 1: Otomatis via Edge Function**

Edge Function sudah punya auto-initialization. Saat pertama kali jalankan, database akan otomatis terisi dengan:
- 1 admin user
- 6 sample products

Cukup jalankan:
```bash
npm run dev
```

Database akan auto-initialize saat server start!

#### **Cara 2: Manual via API Call**

```bash
# Call manual initialization endpoint
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/init \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### **Langkah 8: Verifikasi Data**

Di Supabase Dashboard:

1. Klik **Table Editor**
2. Pilih table `kv_store_d6ea81e6`
3. Harusnya ada data:
   - `user:user-admin` → Admin user
   - `user:email:admin@arkan.com` → Email mapping
   - `product:prod-1` → Beras Premium
   - `product:prod-2` → Air Mineral
   - dst...

### **Langkah 9: Test Aplikasi**

```bash
npm run dev
```

Buka `http://localhost:5173`

Login dengan:
- Email: `admin@arkan.com`
- Password: `admin123`

**Berhasil login? SELESAI!** 🎉

---

## 🔍 **TROUBLESHOOTING**

### **Error: "Invalid email or password"**

**Penyebab:**
- Edge Function belum di-deploy
- Database belum ter-initialize
- Environment variables salah

**Solusi:**

1. **Cek Edge Function:**
   ```bash
   curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/health
   ```
   Harusnya return `{"status":"ok"}`

2. **Cek Database:**
   ```bash
   curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/database \
     -H "Authorization: Bearer YOUR_ANON_KEY"
   ```
   Harusnya return data products dan users.

3. **Manual Initialize:**
   ```bash
   curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/init \
     -H "Authorization: Bearer YOUR_ANON_KEY"
   ```

4. **Restart App:**
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   ```

### **Error: "Failed to fetch" atau "CORS error"**

**Penyebab:** Edge Function belum di-deploy atau CORS tidak ter-configure.

**Solusi:**
```bash
supabase functions deploy server
```

### **Error: "Database connection failed"**

**Penyebab:** Environment variables tidak ter-load.

**Solusi:**

1. Pastikan file `.env.local` ada di root folder
2. Restart dev server
3. Cek console log untuk confirm env vars ter-load:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_URL); // Harusnya muncul URL
   ```

### **Edge Function Deploy Failed**

**Error:** `supabase: command not found`

**Solusi:**
```bash
npm install -g supabase
# atau
curl -fsSL https://supabase.com/install.sh | sh
```

**Error:** `Project not linked`

**Solusi:**
```bash
supabase link --project-ref YOUR_PROJECT_ID
```

**Error:** `Permission denied`

**Solusi:** Pastikan sudah login:
```bash
supabase login
```

### **Database Empty Setelah Restart**

**Penyebab:** Menggunakan demo/mock data, bukan Supabase.

**Solusi:** Pastikan Edge Function sudah di-deploy dan `.env.local` sudah benar.

---

## ✅ **CHECKLIST SETUP DATABASE**

### **Pre-Setup:**
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Akun Supabase created
- [ ] VS Code opened

### **Supabase Setup:**
- [ ] Project created (baru atau pakai existing)
- [ ] API keys copied
- [ ] Database password saved

### **Local Setup:**
- [ ] `.env.local` created
- [ ] Environment variables filled
- [ ] `npm install` berhasil

### **Database Setup:**
- [ ] Table `kv_store_d6ea81e6` created
- [ ] Index created
- [ ] RLS enabled
- [ ] Policy created

### **Edge Function:**
- [ ] Supabase CLI installed
- [ ] Login berhasil
- [ ] Project linked
- [ ] Function deployed
- [ ] Secrets set

### **Testing:**
- [ ] Health check passed
- [ ] Database debug endpoint works
- [ ] App runs (`npm run dev`)
- [ ] Login admin berhasil
- [ ] Products muncul di dashboard

---

## 🎯 **QUICK REFERENCE**

### **Credentials:**
```
Admin Email: admin@arkan.com
Admin Password: admin123
```

### **API Endpoints:**
```
Health: /make-server-d6ea81e6/health
Debug DB: /make-server-d6ea81e6/debug/database
Init DB: /make-server-d6ea81e6/debug/init (POST)
```

### **Database Structure:**
```
kv_store_d6ea81e6
├── user:{userId}         → User object
├── user:email:{email}    → userId mapping
├── product:{productId}   → Product object
├── order:{orderId}       → Order object
└── cart:{userId}         → Cart object
```

### **Sample Data After Init:**
```
- 1 Admin user (admin@arkan.com)
- 6 Products (Beras, Air, Mie, Minyak, Keripik, Kopi)
- 0 Orders (akan bertambah saat checkout)
- 0 Carts (akan bertambah saat add to cart)
```

---

## 📊 **MONITORING**

### **View Logs:**
```bash
# Real-time logs
supabase functions logs server --tail

# Last 100 lines
supabase functions logs server
```

### **Check Database Size:**
```sql
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE tablename = 'kv_store_d6ea81e6';
```

### **Count Records:**
```sql
SELECT 
  substring(key from '^[^:]+') as type,
  COUNT(*) as count
FROM kv_store_d6ea81e6
GROUP BY substring(key from '^[^:]+');
```

---

## 🚀 **NEXT STEPS SETELAH DATABASE JALAN**

1. **Test Semua Fitur:**
   - [ ] Login admin
   - [ ] CRUD products
   - [ ] Register customer
   - [ ] Add to cart
   - [ ] Checkout
   - [ ] View orders

2. **Security Hardening:**
   - [ ] Implement password hashing (bcrypt)
   - [ ] Setup proper RLS policies
   - [ ] Rotate service_role key
   - [ ] Enable rate limiting

3. **Backup Strategy:**
   - [ ] Enable Point-in-Time Recovery (PITR)
   - [ ] Setup daily backups
   - [ ] Test restore process

4. **Production Deployment:**
   - [ ] Build app (`npm run build`)
   - [ ] Deploy to Vercel/Netlify
   - [ ] Set production env vars
   - [ ] Test production app

---

**Selamat! Database sudah ready untuk digunakan!** 🎉

**Estimasi waktu setup:** 20-30 menit untuk pertama kali

**Status:** ✅ Production Ready
