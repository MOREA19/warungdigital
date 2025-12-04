
# ⚡ QUICK DEPLOY GUIDE - 5 Menit

**Goal**: Deploy edge function dan fix customers not showing

---

## 🎯 STEP 1: Open Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Login dengan akun Supabase kamu
3. Select project: **etvwxarauhbutuxrjqpf**

---

## 🎯 STEP 2: Open Edge Functions

Di sidebar sebelah kiri:
- Cari **"Edge Functions"** 
- Atau langsung ke: https://supabase.com/dashboard/project/etvwxarauhbutuxrjqpf/functions

---

## 🎯 STEP 3: Select Function "server"

Di list functions, cari **`server`**  
Klik untuk membuka editor

---

## 🎯 STEP 4: Update Code

1. **Select all code di editor** (Ctrl+A)
2. **Delete semua** (hapus current code)
3. **Open file**: `src/supabase/functions/server/index.tsx` di VS Code kamu
4. **Copy semua isi file** (Ctrl+A, Ctrl+C)
5. **Paste ke Supabase editor** (Ctrl+V)

---

## 🎯 STEP 5: Deploy

Di bottom-right corner editor, cari tombol **"Deploy"**

Klik Deploy dan **tunggu sampai status berubah jadi "Active"** ✅

---

## ✅ Verify

Setelah deploy:

1. Buka VS Code terminal
2. Run: `npm run dev`
3. Buka: http://localhost:3000
4. Login: `admin@arkan.com` / `admin123`
5. Masuk "Manajemen Pelanggan"
6. **Seharusnya muncul customers di tabel!** ✨

---

## 🆘 Stuck?

**Error: 404 / Function not found**
→ Edge function belum di-deploy, coba ulang STEP 1-5

**Error: 500**
→ Ada syntax error di code. Check Supabase logs (Invocations tab)

**Customers masih kosong**
→ Open debug panel (bottom-right), klik "Test /customers"  
→ Lihat apakah muncul data di response

---

**Need help?**
- Check browser console (F12) untuk error details
- Check Supabase edge function logs
- Check README di project

