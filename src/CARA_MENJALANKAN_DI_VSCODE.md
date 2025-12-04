# 🚀 Cara Menjalankan Warung Digital Arkan di VS Code

Panduan lengkap setelah download ZIP dari Figma Make.

---

## 📥 **STEP 1: Download & Extract**

### **1.1 Download ZIP dari Figma Make**

1. Di Figma Make, cari tombol **"Export"** atau **"Download"** atau **"⋮" (titik tiga)**
2. Pilih **"Download code as ZIP"**
3. File akan terdownload dengan nama seperti `warung-digital-arkan.zip`
4. Simpan di folder yang mudah diakses (misal: `Documents` atau `Desktop`)

### **1.2 Extract ZIP**

**Windows:**
1. Klik kanan pada file ZIP
2. Pilih **"Extract All..."**
3. Pilih lokasi extract (misal: `C:\Users\YourName\Documents\warung-digital-arkan`)
4. Klik **"Extract"**

**Mac:**
1. Double-click file ZIP
2. Folder otomatis ter-extract

**Linux:**
```bash
unzip warung-digital-arkan.zip -d ~/warung-digital-arkan
```

---

## 💻 **STEP 2: Buka di VS Code**

### **2.1 Buka VS Code**

1. Jalankan **Visual Studio Code**
2. Klik **File** → **Open Folder...**
3. Pilih folder hasil extract tadi (`warung-digital-arkan`)
4. Klik **"Select Folder"** atau **"Open"**

**Atau via Terminal:**
```bash
cd path/to/warung-digital-arkan
code .
```

### **2.2 Verifikasi Struktur Folder**

Di VS Code Explorer (sidebar kiri), pastikan ada folder/file ini:

```
warung-digital-arkan/
├── components/          ✅
├── utils/              ✅
├── supabase/           ✅
├── styles/             ✅
├── App.tsx             ✅
├── main.tsx            ✅
├── index.html          ✅
├── package.json        ✅
├── .env.example        ✅
├── README.md           ✅
└── ... (file lainnya)
```

Jika struktur benar → **Lanjut Step 3** ✅

---

## 🔧 **STEP 3: Install Dependencies**

### **3.1 Buka Terminal di VS Code**

**Windows/Mac/Linux:**
- Tekan `Ctrl + ~` (tilde)
- Atau klik **Terminal** → **New Terminal**

Terminal akan muncul di bawah layar.

### **3.2 Install Node Modules**

Di terminal, ketik:

```bash
npm install
```

**Proses ini akan:**
- Download semua dependencies (~1-2 menit)
- Membuat folder `node_modules/`
- Install React, Vite, Tailwind, dll

**Output yang benar:**
```
added 234 packages, and audited 235 packages in 45s

found 0 vulnerabilities
```

**Jika error:** Lihat bagian **Troubleshooting** di bawah.

---

## 🗄️ **STEP 4: Setup Database Supabase**

### **4.1 Buat Akun Supabase (Gratis!)**

1. Buka https://supabase.com
2. Klik **"Start your project"**
3. Login dengan **GitHub** atau **Google** atau **Email**

### **4.2 Buat Project Baru**

1. Setelah login, klik **"New Project"**
2. Isi form:
   - **Organization:** Pilih atau buat baru
   - **Name:** `warung-digital-arkan`
   - **Database Password:** Buat password yang kuat (contoh: `WarungArkan2025!`)
   - **Region:** **Southeast Asia (Singapore)** ← PENTING pilih yang dekat!
   - **Pricing Plan:** **Free** (gratis selamanya untuk development)
3. Klik **"Create new project"**
4. Tunggu **~2 menit** sampai status "Setting up project" selesai
5. Jika sudah ready, akan muncul dashboard project

### **4.3 Copy API Keys**

Setelah project ready:

1. Di sidebar kiri, klik ikon **⚙️ Settings**
2. Pilih **API** (di menu Settings)
3. Scroll ke bawah, Anda akan lihat:

```
Project URL:
https://abcdefghijklmnop.supabase.co
```

```
API Keys:

anon public
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz... (panjang)

service_role
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz... (panjang)
```

4. **Klik icon "Copy"** untuk copy kedua keys ini
5. **SIMPAN di Notepad** atau text editor sementara

**⚠️ PENTING:** 
- **Project URL** → Simpan!
- **anon public** → Simpan!
- **service_role** → Simpan! (RAHASIA, jangan share!)

### **4.4 Buat File `.env.local`**

Di VS Code:

1. Klik kanan di Explorer (sidebar kiri) pada root folder
2. Pilih **"New File"**
3. Nama file: `.env.local` (HARUS PERSIS seperti ini, termasuk titik di awal!)
4. Copy-paste isi file ini:

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. **GANTI** nilai dengan API keys yang Anda copy tadi:
   - Ganti `https://abcdefghijklmnop.supabase.co` dengan **Project URL** Anda
   - Ganti `eyJ...` pertama dengan **anon public** key Anda
   - Ganti `eyJ...` kedua dengan **service_role** key Anda

6. Save file (Ctrl+S atau Cmd+S)

**Contoh file `.env.local` yang sudah diisi:**
```env
VITE_SUPABASE_URL=https://etvwxarauhbutuxrjqpf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzg5OTQwMiwiZXhwIjoyMDc5NDc1NDAyfQ.aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890
```

---

## 🗃️ **STEP 5: Setup Database Table**

### **5.1 Buka SQL Editor di Supabase**

1. Kembali ke dashboard Supabase (https://supabase.com/dashboard)
2. Pilih project `warung-digital-arkan` yang tadi dibuat
3. Di sidebar kiri, klik ikon **🗂️ SQL Editor**
4. Klik tombol **"+ New Query"**

### **5.2 Jalankan SQL untuk Buat Table**

1. Di editor SQL, **hapus semua isi** yang ada (jika ada)
2. Copy-paste SQL ini:

```sql
-- Buat table untuk menyimpan data
CREATE TABLE kv_store_d6ea81e6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Buat index untuk performa lebih cepat
CREATE INDEX idx_kv_store_key ON kv_store_d6ea81e6(key);

-- Enable Row Level Security
ALTER TABLE kv_store_d6ea81e6 ENABLE ROW LEVEL SECURITY;

-- Policy untuk allow all (development mode)
CREATE POLICY "Allow all operations" ON kv_store_d6ea81e6
  FOR ALL USING (true) WITH CHECK (true);
```

3. Klik tombol **"Run"** atau tekan **Ctrl+Enter**
4. Tunggu beberapa detik
5. Harusnya muncul pesan **"Success. No rows returned"** (warna hijau)

### **5.3 Verifikasi Table Sudah Dibuat**

1. Di sidebar kiri Supabase, klik **📊 Table Editor**
2. Harusnya muncul table baru bernama **`kv_store_d6ea81e6`**
3. Klik table tersebut → Harusnya kosong (0 rows) untuk saat ini

**Jika table muncul → SUKSES!** ✅

---

## 🚀 **STEP 6: Deploy Backend (Edge Function)**

### **6.1 Install Supabase CLI**

Di terminal VS Code, jalankan:

```bash
npm install -g supabase
```

**Tunggu sampai selesai** (~30 detik - 1 menit)

**Verifikasi instalasi berhasil:**
```bash
supabase --version
```

Harusnya muncul versi, misal: `1.123.4`

### **6.2 Login ke Supabase**

```bash
supabase login
```

**Yang terjadi:**
1. Terminal akan muncul pesan: "Opening browser to login..."
2. Browser akan otomatis terbuka
3. Klik **"Authorize"** di browser
4. Kembali ke VS Code
5. Terminal akan muncul: "Logged in successfully!"

### **6.3 Link Project**

Sekarang kita hubungkan project lokal dengan Supabase:

```bash
supabase link --project-ref abcdefghijklmnop
```

**⚠️ GANTI `abcdefghijklmnop`** dengan Project ID Anda!

**Cara dapat Project ID:**
- Lihat di **Project URL** Anda: `https://[INI-PROJECT-ID].supabase.co`
- Contoh: Jika URL `https://etvwxarauhbutuxrjqpf.supabase.co`, maka ID-nya `etvwxarauhbutuxrjqpf`

**Jika diminta Database Password:**
- Masukkan password yang Anda buat saat buat project tadi
- Password tidak akan terlihat saat Anda ketik (normal!)
- Tekan Enter

**Output sukses:**
```
Linked to etvwxarauhbutuxrjqpf successfully.
```

### **6.4 Deploy Edge Function**

Sekarang deploy backend server:

```bash
supabase functions deploy server
```

**Proses ini akan:**
- Upload backend code ke Supabase (~30 detik)
- Deploy Edge Function
- Siap digunakan!

**Output sukses:**
```
Deploying Function server (project: abcdefghijklmnop)
Deployed Function server (project: abcdefghijklmnop)
```

### **6.5 Set Environment Variables di Supabase**

Backend juga butuh API keys. Set dengan command ini:

**Windows PowerShell atau Mac/Linux Terminal:**
```bash
supabase secrets set SUPABASE_URL=https://abcdefghijklmnop.supabase.co
```

```bash
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ GANTI** nilai dengan API keys Anda (sama seperti di `.env.local`)!

**Output sukses (untuk setiap command):**
```
Set secret SUPABASE_URL for project abcdefghijklmnop.
```

### **6.6 Test Edge Function**

Test apakah backend sudah jalan:

```bash
curl https://abcdefghijklmnop.supabase.co/functions/v1/make-server-d6ea81e6/health
```

**⚠️ GANTI `abcdefghijklmnop`** dengan Project ID Anda!

**Response yang benar:**
```json
{"status":"ok","timestamp":"2025-11-23T12:34:56.789Z"}
```

**Jika muncul response di atas → BACKEND SUKSES!** ✅

---

## ▶️ **STEP 7: Jalankan Aplikasi**

### **7.1 Jalankan Development Server**

Di terminal VS Code:

```bash
npm run dev
```

**Output yang benar:**
```
  VITE v5.0.12  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**JANGAN TUTUP TERMINAL!** Biarkan tetap running.

### **7.2 Buka di Browser**

1. Buka browser (Chrome/Firefox/Edge)
2. Akses: **http://localhost:5173**
3. Harusnya muncul halaman **Login Warung Digital Arkan**

### **7.3 Login Pertama Kali**

**Admin Login:**
- **Email:** `admin@arkan.com`
- **Password:** `admin123`

Klik **"Masuk"**

**Jika berhasil login:**
- ✅ Muncul Dashboard Admin
- ✅ Ada 6 produk (Beras, Air Mineral, Mie, dll)
- ✅ Statistik muncul

**SELAMAT! APLIKASI SUDAH JALAN!** 🎉🎉🎉

---

## 🎨 **STEP 8: Test Semua Fitur**

### **Test sebagai Admin:**

1. ✅ **Dashboard:** Lihat statistik
2. ✅ **Kelola Produk:** Klik menu "Produk"
   - Tambah produk baru
   - Edit produk
   - Hapus produk
3. ✅ **Pesanan:** Klik menu "Pesanan" (akan kosong dulu)
4. ✅ **Pelanggan:** Klik menu "Pelanggan"
5. ✅ **Logout:** Klik tombol Logout

### **Test sebagai Customer:**

1. ✅ **Register:** Klik "Daftar sekarang"
   - Isi form registrasi
   - Submit
2. ✅ **Login:** Login dengan akun customer yang baru dibuat
3. ✅ **Browse Produk:** Lihat katalog produk
4. ✅ **Search:** Coba fitur pencarian
5. ✅ **Filter:** Coba filter kategori
6. ✅ **Detail Produk:** Klik produk → Lihat detail
7. ✅ **Add to Cart:** Tambah ke keranjang
8. ✅ **Keranjang:** Klik icon keranjang
   - Update quantity
   - Hapus item
9. ✅ **Checkout:** Klik Checkout
   - Isi alamat pengiriman
   - Pilih metode pembayaran
   - Konfirmasi pesanan
10. ✅ **Logout**

### **Verifikasi Data Tersimpan:**

1. Refresh browser (F5)
2. Login lagi
3. Data produk, orders, dll masih ada → **DATABASE JALAN!** ✅

---

## 🛑 **Cara Stop Aplikasi**

### **Stop Development Server:**

Di terminal VS Code yang running `npm run dev`:
- Tekan **Ctrl + C**
- Ketik **Y** (Yes) jika diminta
- Server akan berhenti

### **Cara Jalankan Lagi:**

```bash
npm run dev
```

Semudah itu! 😊

---

## 🐛 **TROUBLESHOOTING**

### **❌ Error: `npm: command not found`**

**Masalah:** Node.js belum terinstall.

**Solusi:**
1. Download Node.js dari https://nodejs.org
2. Install versi **LTS** (Long Term Support)
3. Restart VS Code
4. Test: `node --version` (harusnya muncul versi)

---

### **❌ Error: `npm install` gagal**

**Masalah:** Network atau permission issue.

**Solusi 1:** Hapus cache
```bash
npm cache clean --force
npm install
```

**Solusi 2:** Hapus node_modules
```bash
# Windows PowerShell:
Remove-Item -Recurse -Force node_modules

# Mac/Linux:
rm -rf node_modules

# Kemudian install lagi:
npm install
```

---

### **❌ Error: "Invalid email or password" saat login**

**Masalah:** Database belum ter-initialize.

**Solusi:** Manual initialize database
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/init \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Ganti `YOUR_PROJECT_ID` dan `YOUR_ANON_KEY` dengan nilai Anda!

**Atau via Browser:**
Buka URL ini di browser:
```
https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/init
```

**Setelah itu:**
1. Refresh browser
2. Login lagi dengan `admin@arkan.com` / `admin123`

---

### **❌ Error: "Failed to fetch" atau "Network error"**

**Masalah:** Edge Function belum di-deploy atau environment variables salah.

**Solusi:**

1. **Cek Edge Function:**
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/health
```

Harusnya return `{"status":"ok"}`

2. **Jika error 404:** Deploy ulang
```bash
supabase functions deploy server
```

3. **Cek `.env.local`:** Pastikan Project URL dan API Keys benar!

---

### **❌ Error: Port 5173 already in use**

**Masalah:** Ada aplikasi lain yang pakai port 5173.

**Solusi 1:** Tutup aplikasi yang pakai port itu.

**Solusi 2:** Pakai port lain
```bash
npm run dev -- --port 3000
```

Buka `http://localhost:3000`

---

### **❌ Database kosong / produk tidak muncul**

**Solusi:** Initialize database manual

**Via cURL:**
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d6ea81e6/debug/init \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Cek di Supabase Dashboard:**
1. Klik **Table Editor** → `kv_store_d6ea81e6`
2. Harusnya ada ~8 rows (1 admin + 6 products + 1 email mapping)

---

### **❌ Supabase CLI error: `command not found`**

**Solusi:**

**Windows:**
```bash
npm install -g supabase
```

**Mac (jika npm gagal):**
```bash
brew install supabase/tap/supabase
```

**Linux:**
```bash
curl -fsSL https://supabase.com/install.sh | sh
```

---

## 📊 **MONITORING & LOGS**

### **Lihat Backend Logs:**

```bash
supabase functions logs server --tail
```

**Ini akan show real-time logs.** Berguna untuk debug!

### **Cek Database via SQL:**

Di Supabase Dashboard → SQL Editor:

```sql
-- Count semua data
SELECT 
  substring(key from '^[^:]+') as type,
  COUNT(*) as count
FROM kv_store_d6ea81e6
GROUP BY substring(key from '^[^:]+');
```

**Output:**
```
type       | count
-----------+------
user       | 2
product    | 6
```

---

## 📝 **SUMMARY COMMANDS**

### **Setup Awal (Sekali saja):**
```bash
npm install
supabase login
supabase link --project-ref YOUR_PROJECT_ID
supabase functions deploy server
supabase secrets set SUPABASE_URL=...
supabase secrets set SUPABASE_ANON_KEY=...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
```

### **Jalankan Sehari-hari:**
```bash
npm run dev
```

### **Stop Server:**
```
Ctrl + C
```

### **Deploy Backend (Jika ada perubahan):**
```bash
supabase functions deploy server
```

---

## ✅ **CHECKLIST LENGKAP**

- [ ] Download ZIP dari Figma Make
- [ ] Extract ZIP ke folder
- [ ] Buka folder di VS Code
- [ ] `npm install` berhasil
- [ ] Buat akun Supabase
- [ ] Buat project Supabase
- [ ] Copy API keys
- [ ] Buat file `.env.local`
- [ ] Isi `.env.local` dengan API keys
- [ ] Jalankan SQL di Supabase (buat table)
- [ ] Install Supabase CLI (`npm install -g supabase`)
- [ ] `supabase login`
- [ ] `supabase link --project-ref ...`
- [ ] `supabase functions deploy server`
- [ ] Set secrets (3 commands)
- [ ] Test health endpoint
- [ ] `npm run dev`
- [ ] Buka `http://localhost:5173`
- [ ] Login dengan `admin@arkan.com` / `admin123`
- [ ] **SUKSES!** 🎉

---

## 🎯 **TIPS & BEST PRACTICES**

### **1. Jangan Commit `.env.local`**
File `.env.local` sudah otomatis di-ignore oleh Git (via `.gitignore`).
**JANGAN pernah** commit file ini ke GitHub!

### **2. Backup Database Password**
Simpan database password Supabase di tempat aman (misal: password manager).

### **3. Development vs Production**
- **Development:** `npm run dev` (hot reload)
- **Production:** `npm run build` lalu deploy ke Vercel/Netlify

### **4. Update Code**
Setiap kali ada perubahan di `/supabase/functions/server/`:
```bash
supabase functions deploy server
```

### **5. Monitor Usage**
Supabase Free tier:
- 500MB database
- 2GB bandwidth/month
- Unlimited API requests

Cek usage di: Supabase Dashboard → Settings → Usage

---

## 🎓 **NEXT STEPS**

Setelah aplikasi jalan, Anda bisa:

1. **Kustomisasi:**
   - Ubah warna di `/styles/globals.css`
   - Tambah fitur baru
   - Modifikasi UI

2. **Deploy ke Production:**
   - Build: `npm run build`
   - Deploy ke Vercel (gratis!)
   - Deploy ke Netlify (gratis!)

3. **Security Hardening:**
   - Implement password hashing (bcrypt)
   - Setup JWT authentication
   - Enable stricter RLS policies

4. **Fitur Tambahan:**
   - Payment gateway (Midtrans)
   - Email notifications
   - WhatsApp notifications
   - Export laporan PDF

---

## 📞 **BUTUH BANTUAN?**

### **Dokumentasi:**
- Vite: https://vitejs.dev
- React: https://react.dev
- Supabase: https://supabase.com/docs
- Tailwind: https://tailwindcss.com

### **Logs:**
```bash
# Backend logs
supabase functions logs server --tail

# Frontend logs
# Lihat di browser console (F12)
```

### **Status Page:**
- Supabase: https://status.supabase.com

---

**🎉 SELAMAT! Aplikasi Warung Digital Arkan sudah jalan di VS Code!**

**Total waktu setup:** 30-45 menit pertama kali  
**Selanjutnya:** 1 menit (cukup `npm run dev`)

**Happy Coding!** 🚀
