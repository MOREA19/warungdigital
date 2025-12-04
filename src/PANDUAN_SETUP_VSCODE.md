# 📦 Panduan Setup di VS Code

Panduan lengkap untuk download, setup, dan menjalankan Warung Digital Arkan di VS Code.

---

## 📥 **Langkah 1: Download Code dari Figma Make**

### **Cara Download:**

1. **Di halaman Figma Make**, cari tombol **Export** atau **Download** 
2. Pilih format **ZIP**
3. Download file `warung-digital-arkan.zip`
4. Extract file ZIP ke folder pilihan Anda

**Atau:**

Jika ada tombol "Open in VS Code", klik langsung untuk clone ke lokal.

---

## 🛠️ **Langkah 2: Setup Project di VS Code**

### **2.1 Buka Project di VS Code**

```bash
# Buka terminal/command prompt
cd path/to/warung-digital-arkan
code .
```

### **2.2 Install Dependencies**

Buka terminal di VS Code (Ctrl + ` atau View → Terminal), lalu jalankan:

```bash
npm install
```

**Packages yang akan terinstall:**
- react
- react-dom
- vite
- tailwindcss
- lucide-react
- @supabase/supabase-js
- hono (untuk backend)

### **2.3 Struktur Folder**

Pastikan struktur folder seperti ini:

```
warung-digital-arkan/
├── components/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── CustomerDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── AdminProductManagement.tsx
│   ├── AdminOrders.tsx
│   ├── AdminCustomers.tsx
│   └── ...
├── utils/
│   ├── database.ts
│   └── supabase/
│       └── info.tsx
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx
│           └── kv_store.tsx
├── styles/
│   └── globals.css
├── App.tsx
├── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🗄️ **Langkah 3: Setup Supabase Database**

### **3.1 Buat Akun Supabase**

1. Buka https://supabase.com
2. Klik **"Start your project"**
3. Login dengan GitHub/Google
4. Klik **"New Project"**
5. Isi:
   - **Project Name:** `warung-digital-arkan`
   - **Database Password:** (Simpan password ini!)
   - **Region:** Southeast Asia (Singapore)
6. Tunggu ~2 menit hingga project ready

### **3.2 Dapatkan API Keys**

1. Di dashboard Supabase, klik **Settings** (⚙️)
2. Pilih **API**
3. Copy nilai berikut:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon/public key** (diawali dengan `eyJ...`)
   - **service_role key** (diawali dengan `eyJ...`)

### **3.3 Buat File `.env.local`**

Di root folder project, buat file `.env.local`:

```bash
# Di VS Code, create new file: .env.local
```

Isi dengan:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ PENTING:**
- Ganti nilai dengan API keys Anda
- **JANGAN** commit file `.env.local` ke Git
- Tambahkan `.env.local` ke `.gitignore`

### **3.4 Setup Database Table**

Di Supabase Dashboard:

1. Klik **SQL Editor** (di sidebar kiri)
2. Klik **"+ New Query"**
3. Copy-paste SQL berikut:

```sql
-- Buat tabel KV Store
CREATE TABLE kv_store_d6ea81e6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Buat index untuk pencarian cepat
CREATE INDEX idx_kv_store_key ON kv_store_d6ea81e6(key);

-- Enable Row Level Security (opsional untuk keamanan)
ALTER TABLE kv_store_d6ea81e6 ENABLE ROW LEVEL SECURITY;

-- Policy untuk allow all (development)
CREATE POLICY "Allow all operations" ON kv_store_d6ea81e6
  FOR ALL USING (true) WITH CHECK (true);
```

4. Klik **"Run"** atau tekan `Ctrl+Enter`
5. Pastikan muncul pesan "Success"

### **3.5 Update File `info.tsx`**

Edit file `/utils/supabase/info.tsx`:

```typescript
// Untuk development di VS Code, gunakan env variables
export const projectId = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || '';
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
```

---

## 🚀 **Langkah 4: Jalankan Aplikasi**

### **4.1 Jalankan Development Server**

```bash
npm run dev
```

Output:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### **4.2 Buka di Browser**

1. Buka browser
2. Akses `http://localhost:5173`
3. Aplikasi sudah berjalan! 🎉

### **4.3 Test Aplikasi**

**Login sebagai Admin:**
- Email: `admin@arkan.com`
- Password: `admin123`

**Atau Register Customer Baru:**
- Klik "Daftar sekarang"
- Isi form registrasi
- Data akan tersimpan ke Supabase

---

## 🔧 **Langkah 5: Deploy Backend (Supabase Edge Functions)**

### **5.1 Install Supabase CLI**

```bash
# Install via npm
npm install -g supabase

# Atau download binary dari https://supabase.com/docs/guides/cli
```

### **5.2 Login ke Supabase**

```bash
supabase login
```

Browser akan terbuka, authorize access.

### **5.3 Link Project**

```bash
supabase link --project-ref xxxxx
```

Ganti `xxxxx` dengan Project ID Anda (dari URL: `https://xxxxx.supabase.co`)

### **5.4 Deploy Edge Function**

```bash
# Deploy server function
supabase functions deploy server

# Set environment variables
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbG...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

### **5.5 Update Frontend URL**

Setelah deploy, Edge Function akan tersedia di:
```
https://xxxxx.supabase.co/functions/v1/server
```

File `/utils/database.ts` sudah otomatis menggunakan URL ini.

---

## 📱 **Langkah 6: Build untuk Production**

### **6.1 Build Project**

```bash
npm run build
```

Hasil build ada di folder `/dist`

### **6.2 Deploy ke Hosting**

**Pilihan Hosting Gratis:**

#### **A. Vercel** (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Ikuti prompt
# Set environment variables di Vercel Dashboard
```

#### **B. Netlify**

1. Drag & drop folder `/dist` ke https://app.netlify.com/drop
2. Atau connect via GitHub untuk auto-deploy

#### **C. Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init
firebase init hosting

# Deploy
firebase deploy
```

---

## ⚙️ **Konfigurasi Tambahan**

### **Environment Variables untuk Production**

Setelah deploy, set environment variables di hosting:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### **Custom Domain (Opsional)**

1. Di hosting dashboard, tambahkan custom domain
2. Update DNS records sesuai instruksi
3. Tunggu propagasi DNS (~24 jam)

---

## 🐛 **Troubleshooting**

### **Error: Module not found**

```bash
rm -rf node_modules package-lock.json
npm install
```

### **Error: Supabase connection failed**

- Pastikan `.env.local` sudah dibuat dan diisi dengan benar
- Restart dev server: `Ctrl+C` lalu `npm run dev`
- Cek API keys di Supabase Dashboard

### **Error: CORS**

- Pastikan Edge Function sudah di-deploy
- Cek Supabase function logs: `supabase functions logs server`

### **Database kosong**

- Buka `http://localhost:5173` 
- Database akan auto-initialize saat pertama kali akses
- Atau manual init via endpoint: `POST /debug/init`

### **Hot reload tidak jalan**

```bash
# Restart Vite
npm run dev -- --force
```

---

## 📚 **File Penting untuk Development**

### **`package.json`**

```json
{
  "name": "warung-digital-arkan",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.49.8",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.0"
  }
}
```

### **`.gitignore`**

```
# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.production

# Build output
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

---

## ✅ **Checklist Setup**

- [ ] Download code dari Figma Make
- [ ] Extract ZIP dan buka di VS Code
- [ ] Install dependencies (`npm install`)
- [ ] Buat project Supabase
- [ ] Copy API keys
- [ ] Buat file `.env.local`
- [ ] Setup database table (run SQL)
- [ ] Update `info.tsx`
- [ ] Jalankan `npm run dev`
- [ ] Test login admin
- [ ] Deploy Edge Function
- [ ] Build untuk production (`npm run build`)
- [ ] Deploy ke hosting

---

## 🎯 **Next Steps Setelah Setup**

1. **Hapus Debug Features:**
   - File `/components/DatabaseDebug.tsx` bisa dihapus
   - Hapus import DatabaseDebug di `App.tsx`

2. **Keamanan:**
   - Implementasi password hashing (bcrypt)
   - Setup JWT untuk session management
   - Enable RLS (Row Level Security) di Supabase

3. **Fitur Tambahan:**
   - Payment gateway (Midtrans/Xendit)
   - Email notification
   - WhatsApp notification
   - Upload image ke Supabase Storage
   - Export laporan PDF/Excel

4. **SEO & Performance:**
   - Meta tags untuk SEO
   - Image optimization
   - Code splitting
   - PWA support

---

## 📞 **Support**

Jika ada masalah:

1. **Cek dokumentasi:**
   - Vite: https://vitejs.dev
   - React: https://react.dev
   - Supabase: https://supabase.com/docs
   - Tailwind CSS: https://tailwindcss.com

2. **Debug:**
   - Buka browser DevTools (F12)
   - Lihat tab Console untuk error
   - Lihat tab Network untuk request failures

3. **Supabase Logs:**
   ```bash
   supabase functions logs server --tail
   ```

---

**Selamat! Aplikasi Warung Digital Arkan siap digunakan!** 🎉

Total waktu setup: ~30-45 menit
