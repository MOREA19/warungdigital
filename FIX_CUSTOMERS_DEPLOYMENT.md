# FIX MANAJEMEN PELANGGAN - DEPLOYMENT STEPS

## 🔧 Perubahan yang Dilakukan

### 1. **Server-side (Edge Function)**
File: `src/supabase/functions/server/index.tsx`

**Perbaikan endpoint `/users`:**
- ✅ Filter hanya user objects (bukan email lookup keys)
- ✅ Validasi struktur user dengan proper checking
- ✅ Exclude users tanpa email
- ✅ Better logging untuk debugging

**Perbaikan endpoint `/customers`:**
- ✅ Filter yang lebih robust untuk user objects
- ✅ Auto-seed sample data jika perlu
- ✅ Konsisten dengan `/users` endpoint
- ✅ Better error handling

### 2. **Client-side (React Component)**
File: `src/components/AdminCustomers.tsx`

**Improvements:**
- ✅ Menambahkan RefreshCw icon import
- ✅ Menambahkan state `isRefreshing` untuk manual refresh
- ✅ Function `handleRefresh()` untuk manual refresh button
- ✅ Auto-refresh setiap 10 detik menggunakan interval
- ✅ Menghapus demo data fallback (hanya show actual API data)
- ✅ Sort customers by creation date (terbaru dulu)
- ✅ Filter customers only (exclude admins)
- ✅ UI improvement dengan refresh button

---

## 🚀 Deployment Instructions

### Step 1: Deploy Edge Function
```bash
# Pastikan di root folder project
supabase functions deploy server
```

**Expected Output:**
```
✔ Function deployed
Deployed /functions/server on version 1
```

### Step 2: Verify Deployment
Buka browser developer console (F12) dan paste:
```javascript
// Test endpoint /customers
fetch('https://etvwxarauhbutuxrjqpf.supabase.co/functions/v1/make-server-d6ea81e6/customers', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634'
  }
})
  .then(r => r.json())
  .then(d => console.log('Customers:', d))
  .catch(e => console.error('Error:', e));
```

### Step 3: Restart Dev Server
```bash
# Stop dev server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Test Login & Register
1. Buka admin page (login dengan admin@arkan.com / admin123)
2. Klik "Manajemen Pelanggan"
3. Klik tombol "Refresh"
4. Logout dari admin
5. Daftar akun customer baru dengan data:
   - Nama: Test User
   - Email: test@example.com
   - HP: 081234567890
   - Alamat: Jl. Test No. 1
   - Password: password123
6. Login kembali sebagai admin
7. Buka "Manajemen Pelanggan" - customer baru seharusnya muncul!

---

## 🧪 Testing Checklist

- [ ] Admin bisa login dengan admin@arkan.com / admin123
- [ ] Halaman "Manajemen Pelanggan" bisa dibuka
- [ ] Tombol "Refresh" ada dan berfungsi
- [ ] List customers ditampilkan (minimal 2 sample customers)
- [ ] Bisa daftar customer baru
- [ ] Customer baru muncul di list setelah refresh/login ulang
- [ ] Search functionality masih berfungsi
- [ ] Stats card (Total, Active, New) menampilkan angka yang benar
- [ ] Console tidak ada error messages
- [ ] Network tab show 200 OK untuk API calls

---

## 🔍 Debugging Tips

### Issue: Customers masih tidak muncul
**Check:**
1. Buka DevTools Network tab
2. Filter request ke `/customers` atau `/users`
3. Check response status:
   - 200 = OK, cek response body
   - 500 = Server error, lihat error message
4. Check console logs - seharusnya ada "Customers loaded from API: ..."

### Issue: "Failed to fetch"
**Kemungkinan:**
- Edge function belum di-deploy
- Network problem
- API URL wrong

**Solution:**
```bash
# Cek status function
supabase functions list

# Deploy ulang
supabase functions deploy server
```

### Issue: Masih show 2 customer saja
**Check:**
1. Edge function sudah di-deploy? (lihat Supabase Dashboard → Functions)
2. Klik refresh button
3. Check browser console untuk logs
4. Jika masih tidak muncul, coba:
   - Logout dari admin
   - Daftar customer baru
   - Login admin lagi
   - Refresh manajemen pelanggan

---

## 📊 Expected Result

Setelah semua perubahan dan deployment:

```
Manajemen Pelanggan
├─ Search & Refresh button
├─ Stats Cards
│  ├─ Total Pelanggan: X
│  ├─ Pelanggan Aktif (30 hari): X
│  └─ Pelanggan Baru (7 hari): X
└─ Customers Table
   ├─ Budi Santoso (budi@example.com)
   ├─ Siti Nurhaliza (siti@example.com)
   └─ [Customers baru yang Anda buat]
```

---

## ✅ Quick Summary

| Komponen | Status | Note |
|----------|--------|------|
| Edge Function `/customers` | ✅ Fixed | Better filtering & seeding |
| Edge Function `/users` | ✅ Fixed | Robust user object detection |
| AdminCustomers Component | ✅ Updated | Refresh button + auto-refresh |
| Client API calls | ✅ Improved | Better error handling |
| Demo data fallback | ✅ Removed | Show only real data |

---

## 🎯 Next Steps

1. Deploy edge function: `supabase functions deploy server`
2. Restart dev server: `npm run dev`
3. Test dengan steps di atas
4. If still issues, check console logs dan network tab

Good luck! 🚀
