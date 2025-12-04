# 👋 MULAI DARI SINI!

Selamat datang di **Warung Digital Arkan**! 

Aplikasi toko kelontong digital modern dengan fitur lengkap.

---

## 🚀 **Quick Start (Ringkas)**

### **Sudah Download ZIP?**

1. **Extract** ZIP file
2. **Buka** folder di VS Code
3. **Install:**
   ```bash
   npm install
   ```
4. **Setup Database:**
   - Buat project di https://supabase.com (gratis!)
   - Buat file `.env.local` (copy dari `.env.example`)
   - Isi dengan API keys dari Supabase
5. **Deploy Backend:**
   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref YOUR_PROJECT_ID
   supabase functions deploy server
   ```
6. **Jalankan:**
   ```bash
   npm run dev
   ```
7. **Buka browser:** http://localhost:5173
8. **Login:** `admin@arkan.com` / `admin123`

**SELESAI!** 🎉

---

## 📚 **Dokumentasi Lengkap**

### **Untuk Pemula (Baca ini dulu!):**
📖 **[CARA_MENJALANKAN_DI_VSCODE.md](./CARA_MENJALANKAN_DI_VSCODE.md)**
- Panduan step-by-step super lengkap
- Dengan screenshot dan penjelasan detail
- **RECOMMENDED untuk yang pertama kali!**

### **Untuk yang Butuh Cepat:**
⚡ **[QUICK_START.md](./QUICK_START.md)**
- 3 langkah singkat
- Untuk yang sudah familiar dengan Node.js & Supabase

### **Setup Database Detail:**
🗄️ **[SETUP_DATABASE_LENGKAP.md](./SETUP_DATABASE_LENGKAP.md)**
- Penjelasan database lengkap
- 2 metode setup (pakai existing atau buat baru)
- Troubleshooting database

### **Struktur Database & API:**
📊 **[PETUNJUK_DATABASE.md](./PETUNJUK_DATABASE.md)**
- Struktur table & data types
- Semua API endpoints
- Contoh queries
- Security best practices

### **Dokumentasi Project:**
📘 **[README.md](./README.md)**
- Overview project
- Tech stack
- Features
- Deployment guide

### **Checklist Deployment:**
✅ **[CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md)**
- Checklist lengkap sebelum deploy
- Testing checklist
- Post-deployment tasks

---

## 🎯 **Pilih Panduan Sesuai Kebutuhan:**

### **Saya pertama kali pakai:**
👉 Baca **[CARA_MENJALANKAN_DI_VSCODE.md](./CARA_MENJALANKAN_DI_VSCODE.md)**

### **Saya sudah familiar, ingin cepat:**
👉 Baca **[QUICK_START.md](./QUICK_START.md)**

### **Saya mau paham database-nya:**
👉 Baca **[PETUNJUK_DATABASE.md](./PETUNJUK_DATABASE.md)**

### **Saya mau deploy production:**
👉 Baca **[CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md)**

---

## ⚙️ **Prerequisites**

Sebelum mulai, pastikan sudah install:

- ✅ **Node.js 18+** (download: https://nodejs.org)
- ✅ **VS Code** (download: https://code.visualstudio.com)
- ✅ **Git** (opsional, download: https://git-scm.com)

**Cek versi:**
```bash
node --version  # harusnya v18 atau lebih tinggi
npm --version   # harusnya v9 atau lebih tinggi
```

---

## 🗂️ **Struktur Folder**

```
warung-digital-arkan/
│
├── 📁 components/          # React components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── CustomerDashboard.tsx
│   ├── AdminDashboard.tsx
│   └── ...
│
├── 📁 utils/              # Utility functions
│   ├── database.ts        # Database API calls
│   └── supabase/          # Supabase config
│
├── 📁 supabase/           # Backend code
│   └── functions/
│       └── server/        # Edge functions (Hono server)
│
├── 📁 styles/             # Global styles
│   └── globals.css
│
├── 📄 App.tsx             # Main app component
├── 📄 main.tsx            # Entry point
├── 📄 index.html          # HTML template
│
├── 📋 package.json        # Dependencies
├── 📋 vite.config.ts      # Vite config
├── 📋 tsconfig.json       # TypeScript config
│
├── 📋 .env.example        # Template environment variables
├── 📋 .gitignore          # Git ignore rules
│
└── 📚 Documentation/
    ├── START_HERE.md               ← ANDA DI SINI
    ├── CARA_MENJALANKAN_DI_VSCODE.md
    ├── QUICK_START.md
    ├── SETUP_DATABASE_LENGKAP.md
    ├── PETUNJUK_DATABASE.md
    ├── CHECKLIST_DEPLOYMENT.md
    └── README.md
```

---

## 🔑 **Login Credentials**

### **Admin:**
- Email: `admin@arkan.com`
- Password: `admin123`

### **Customer:**
- Register akun baru via halaman "Daftar sekarang"

---

## ✨ **Fitur Aplikasi**

### **Customer:**
- ✅ Browse & search produk
- ✅ Filter berdasarkan kategori
- ✅ Lihat detail produk
- ✅ Keranjang belanja
- ✅ Checkout (COD / Transfer)

### **Admin:**
- ✅ Dashboard dengan statistik
- ✅ Kelola produk (CRUD)
- ✅ Kelola pesanan
- ✅ Update status pesanan
- ✅ Lihat daftar pelanggan

---

## 🛠️ **Tech Stack**

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS 4.0
- **Backend:** Supabase Edge Functions (Hono)
- **Database:** Supabase PostgreSQL (KV Store)
- **Icons:** Lucide React
- **Build:** Vite 5

---

## 📊 **Sample Data**

Setelah setup, database akan otomatis terisi dengan:

- **1 Admin User**
- **6 Sample Products:**
  1. Beras Premium 5kg - Rp 75.000
  2. Air Mineral 600ml - Rp 3.500
  3. Mie Instan Goreng - Rp 2.500
  4. Minyak Goreng 2L - Rp 32.000
  5. Keripik Kentang - Rp 8.000
  6. Kopi Sachet 10pcs - Rp 12.000

---

## 🐛 **Troubleshooting Cepat**

### **Error: npm install gagal**
```bash
npm cache clean --force
npm install
```

### **Error: Login gagal**
```bash
# Manual initialize database:
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/init \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### **Error: Port sudah dipakai**
```bash
npm run dev -- --port 3000
```

### **Error: Supabase CLI tidak ditemukan**
```bash
npm install -g supabase
```

**Troubleshooting lengkap:** Lihat [CARA_MENJALANKAN_DI_VSCODE.md](./CARA_MENJALANKAN_DI_VSCODE.md) bagian Troubleshooting

---

## 📞 **Butuh Bantuan?**

### **Cek Logs:**
```bash
# Backend logs
supabase functions logs server --tail

# Frontend logs
# Buka browser console (F12)
```

### **Dokumentasi Resmi:**
- Vite: https://vitejs.dev
- React: https://react.dev
- Supabase: https://supabase.com/docs
- Tailwind: https://tailwindcss.com

---

## 🎯 **Next Steps Setelah Aplikasi Jalan**

1. **Eksplorasi Fitur:**
   - Test semua fitur sebagai customer
   - Test CRUD produk sebagai admin
   - Coba checkout & lihat orders

2. **Kustomisasi:**
   - Ubah logo & branding
   - Ganti color scheme
   - Tambah produk sendiri

3. **Deploy ke Production:**
   - Build project: `npm run build`
   - Deploy ke Vercel (gratis!)
   - Setup custom domain

4. **Tambah Fitur:**
   - Payment gateway integration
   - Email notifications
   - Export laporan
   - Mobile app (React Native)

---

## 📝 **Commands Ringkas**

```bash
# Setup awal (sekali saja)
npm install
supabase login
supabase link --project-ref YOUR_PROJECT_ID
supabase functions deploy server

# Jalankan app
npm run dev

# Stop app
# Tekan Ctrl+C di terminal

# Build untuk production
npm run build

# Deploy backend (jika ada perubahan)
supabase functions deploy server
```

---

## ✅ **Checklist Cepat**

- [ ] Extract ZIP
- [ ] Buka di VS Code
- [ ] `npm install`
- [ ] Buat project Supabase
- [ ] Buat file `.env.local`
- [ ] Jalankan SQL (buat table)
- [ ] Deploy Edge Function
- [ ] `npm run dev`
- [ ] Login berhasil
- [ ] **SUKSES!** 🎉

---

**🎊 Selamat Memulai! Happy Coding!** 🚀

**Estimasi waktu setup:** 30-45 menit untuk pertama kali  
**Selanjutnya:** 1 menit (cukup `npm run dev`)

---

**Made with ❤️ for Indonesian UMKM**

Version: 1.0.0  
Last Updated: November 23, 2025
