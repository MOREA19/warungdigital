# LOGIN TROUBLESHOOTING GUIDE

## ✅ Testing Account
Gunakan akun berikut untuk test login:
- **Email:** budi@example.com
- **Password:** password123

## 🐛 Kemungkinan Masalah & Solusi

### 1. **Input Field Tidak Bisa Mengetik**
**Solusi:**
- Pastikan Anda tidak menggunakan password manager yang memblokir input
- Bersihkan cache browser: Ctrl+Shift+Delete
- Coba gunakan browser berbeda (Chrome, Firefox, Edge)
- Matikan semua extension browser

### 2. **Login Button Tidak Merespons**
**Solusi:**
- Buka DevTools (F12) dan lihat tab Console
- Lihat apakah ada error messages
- Pastikan form sudah diisi dengan benar

### 3. **Error: "Failed to Fetch"**
**Kemungkinan Penyebab:**
- Server tidak berjalan / offline
- CORS issue
- Network problem

**Solusi:**
- Pastikan edge function sudah di-deploy ke Supabase
- Periksa `.env.local` untuk `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
- Buka DevTools → Network tab → lihat request `/make-server-d6ea81e6/users/login`

### 4. **Error: "Invalid email or password"**
**Kemungkinan Penyebab:**
- Email/Password salah
- Database belum terinisialisasi

**Solusi:**
- Pastikan menggunakan email dari sample data: `budi@example.com`
- Cek di Supabase Dashboard → kv_store_d6ea81e6 table
- Pastikan ada data dengan key: `user:email:budi@example.com`

### 5. **Database Empty / Data Tidak Tersimpan**
**Solusi:**
```bash
# Deploy ulang edge function untuk menginisialisasi data
supabase functions deploy server
```

Ini akan membuat sample user data jika database kosong.

## 🔍 Debug Steps

### Step 1: Periksa Browser Console
```
F12 → Console tab
- Lihat apakah ada error messages
- Catat exact error message
```

### Step 2: Periksa Network Requests
```
F12 → Network tab
- Lakukan login attempt
- Lihat request ke `/make-server-d6ea81e6/users/login`
- Check Status Code (200 = OK, 401 = Auth Failed, 500 = Server Error)
- Check Response body
```

### Step 3: Periksa Supabase Database
```
1. Buka https://supabase.com/dashboard
2. Login ke project
3. Pilih "SQL Editor"
4. Run query:
   SELECT key, value FROM kv_store_d6ea81e6 WHERE key LIKE 'user:%' LIMIT 10;
5. Pastikan ada user data
```

### Step 4: Periksa Edge Function Status
```
Supabase Dashboard → Functions → server
- Lihat apakah ada recent deployments
- Lihat error logs jika ada
```

## 📋 Checklist Sebelum Testing

- ✅ App running: `npm run dev`
- ✅ `.env.local` sudah setup dengan VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY
- ✅ Edge function sudah di-deploy: `supabase functions deploy server`
- ✅ Network connection aktif
- ✅ Tidak ada firewall/proxy yang memblokir API calls

## 📞 Informasi Tambahan

Jika masih bermasalah, collection info berikut:
1. Screenshot dari error message (dari DevTools Console)
2. Network request details (dari DevTools Network tab)
3. Supabase dashboard kv_store table contents
4. Output dari: `supabase functions list`
