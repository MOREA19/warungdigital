# 🛒 Warung Digital Arkan

Aplikasi toko kelontong digital modern dengan fitur lengkap untuk customer dan admin.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.3.3-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4.0.0-blue.svg)

---

## ✨ Fitur Utama

### 👥 **Untuk Customer:**
- ✅ Browse produk dengan kategori
- ✅ Pencarian produk
- ✅ Detail produk
- ✅ Keranjang belanja
- ✅ Checkout dengan COD atau Transfer
- ✅ Riwayat pesanan (coming soon)

### 🔐 **Untuk Admin:**
- ✅ Dashboard dengan statistik
- ✅ Manajemen produk (CRUD)
- ✅ Manajemen pesanan
- ✅ Update status pesanan
- ✅ Manajemen pelanggan
- ✅ Laporan penjualan (coming soon)

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ 
- npm atau yarn
- Akun Supabase (gratis)

### **Installation**

```bash
# Clone repository
git clone https://github.com/yourusername/warung-digital-arkan.git

# Masuk ke folder project
cd warung-digital-arkan

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials Anda

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

---

## 🗄️ Database Setup

### **1. Buat Project Supabase**

1. Buka https://supabase.com
2. Create new project
3. Copy Project URL dan API Keys

### **2. Setup Database Table**

Jalankan SQL berikut di Supabase SQL Editor:

```sql
CREATE TABLE kv_store_d6ea81e6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

CREATE INDEX idx_kv_store_key ON kv_store_d6ea81e6(key);
```

### **3. Deploy Edge Function**

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-id

# Deploy
supabase functions deploy server
```

**📖 Dokumentasi lengkap:** Lihat [PANDUAN_SETUP_VSCODE.md](./PANDUAN_SETUP_VSCODE.md)

---

## 🔐 Login Credentials

### **Admin:**
- Email: `admin@arkan.com`
- Password: `admin123`

### **Customer:**
- Daftar akun baru melalui halaman registrasi

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS 4.0
- **Backend:** Supabase Edge Functions (Hono)
- **Database:** Supabase PostgreSQL
- **Icons:** Lucide React
- **Build Tool:** Vite 5

---

## 📁 Struktur Project

```
warung-digital-arkan/
├── components/          # React components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── CustomerDashboard.tsx
│   ├── AdminDashboard.tsx
│   └── ...
├── utils/              # Utility functions
│   ├── database.ts     # Database API calls
│   └── supabase/       # Supabase config
├── supabase/           # Supabase backend
│   └── functions/
│       └── server/     # Edge functions
├── styles/             # Global styles
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

---

## 🎨 Design System

### **Color Palette:**
- Primary: `#1E3A8A` (Blue 900)
- Background: `#F9FAFB` (Gray 50)
- Text: `#111827` (Gray 900)
- Accent: `#10B981` (Green 500)

### **Typography:**
- Font Family: System fonts (sans-serif)
- Headings: Bold
- Body: Regular

### **Components:**
- Rounded corners: `rounded-xl`
- Shadows: `shadow-sm`, `shadow-lg`
- Spacing: Tailwind spacing scale

---

## 🧪 Development

### **Commands:**

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

### **Environment Variables:**

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📦 Deployment

### **Vercel (Recommended):**

```bash
npm install -g vercel
vercel
```

### **Netlify:**

1. Connect repository di Netlify dashboard
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### **Firebase:**

```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

---

## 🔒 Security

### **Best Practices:**

✅ Password hashing dengan bcrypt (implement di production)  
✅ JWT untuk session management  
✅ Row Level Security (RLS) di Supabase  
✅ Input validation di frontend & backend  
✅ HTTPS only  
✅ Environment variables untuk sensitive data  

⚠️ **Note:** Aplikasi ini untuk keperluan demo/prototyping. Untuk production, implementasi security yang lebih robust.

---

## 🚧 Roadmap

### **Phase 1: Core Features** ✅
- [x] Login & Register
- [x] Customer Dashboard
- [x] Admin Dashboard
- [x] Product Management
- [x] Order Management
- [x] Database Integration

### **Phase 2: Enhancements** 🚧
- [ ] Password hashing
- [ ] Email notification
- [ ] WhatsApp notification
- [ ] Payment gateway (Midtrans/Xendit)
- [ ] Image upload to Supabase Storage
- [ ] Riwayat pesanan customer

### **Phase 3: Advanced** 📋
- [ ] Analytics dashboard
- [ ] Export laporan (PDF/Excel)
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

Untuk bantuan dan pertanyaan:

- 📧 Email: support@warungdigitalarkan.com
- 📱 WhatsApp: +62 xxx xxxx xxxx
- 🌐 Website: https://warungdigitalarkan.com

---

## 🙏 Acknowledgments

- React Team untuk amazing framework
- Tailwind CSS untuk utility-first CSS
- Supabase untuk backend infrastructure
- Lucide untuk beautiful icons

---

**Made with ❤️ for Indonesian UMKM**

---

## 📸 Screenshots

### Customer View
![Customer Dashboard](./screenshots/customer-dashboard.png)
![Product Detail](./screenshots/product-detail.png)
![Shopping Cart](./screenshots/shopping-cart.png)

### Admin View
![Admin Dashboard](./screenshots/admin-dashboard.png)
![Product Management](./screenshots/admin-products.png)
![Order Management](./screenshots/admin-orders.png)

---

**Version:** 1.0.0  
**Last Updated:** November 23, 2025  
**Status:** Production Ready
