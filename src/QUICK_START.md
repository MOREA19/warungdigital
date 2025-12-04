# ⚡ Quick Start - Warung Digital Arkan

Panduan singkat untuk langsung menjalankan aplikasi di VS Code.

---

## 🎯 **3 Langkah Cepat**

### **1️⃣ Setup Environment (5 menit)**

```bash
# Install dependencies
npm install

# Buat file .env.local
cp .env.example .env.local
```

Edit `.env.local` dengan Supabase credentials Anda:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**Belum punya Supabase?** Buat di https://supabase.com (Gratis!)

---

### **2️⃣ Setup Database (10 menit)**

#### **A. Buat Table di Supabase**

1. Login ke https://supabase.com
2. Pilih/Buat project
3. Klik **SQL Editor** → **New Query**
4. Jalankan SQL ini:

```sql
CREATE TABLE kv_store_d6ea81e6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

CREATE INDEX idx_kv_store_key ON kv_store_d6ea81e6(key);

ALTER TABLE kv_store_d6ea81e6 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON kv_store_d6ea81e6
  FOR ALL USING (true) WITH CHECK (true);
```

#### **B. Deploy Backend**

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy
supabase functions deploy server
```

---

### **3️⃣ Jalankan App (1 menit)**

```bash
npm run dev
```

Buka browser: `http://localhost:5173`

Login dengan:
- **Email:** `admin@arkan.com`
- **Password:** `admin123`

---

## ✅ **Berhasil?**

Jika login berhasil dan melihat dashboard → **SELESAI!** 🎉

Jika ada error → Baca **[SETUP_DATABASE_LENGKAP.md](./SETUP_DATABASE_LENGKAP.md)**

---

## 🐛 **Troubleshooting Cepat**

### Error: "Invalid email or password"

```bash
# Manual initialize database
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/init \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Restart app
npm run dev
```

### Error: "Failed to fetch"

Edge Function belum di-deploy. Jalankan:
```bash
supabase functions deploy server
```

### Edge Function Logs

```bash
supabase functions logs server --tail
```

---

## 📚 **Dokumentasi Lengkap**

- **Setup Database Lengkap:** [SETUP_DATABASE_LENGKAP.md](./SETUP_DATABASE_LENGKAP.md)
- **Panduan VS Code:** [PANDUAN_SETUP_VSCODE.md](./PANDUAN_SETUP_VSCODE.md)
- **Deployment Checklist:** [CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md)
- **README:** [README.md](./README.md)

---

## 🎓 **Untuk Yang Pertama Kali Pakai Supabase**

1. **Buat akun** di https://supabase.com (gratis!)
2. **New Project** → Isi nama & password
3. **Settings → API** → Copy URL & Keys
4. **SQL Editor** → Jalankan SQL di atas
5. **Install CLI** → Deploy edge function
6. **Done!**

Total waktu: ~15-20 menit

---

**🚀 Happy Coding!**
