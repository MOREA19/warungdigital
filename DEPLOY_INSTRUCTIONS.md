# 🚀 Troubleshooting Customers Not Displaying - Complete Guide

## 📋 Status Sebelum Perbaikan

**Masalah**: Customers tidak muncul di Admin Panel "Manajemen Pelanggan" meskipun sudah membuat 3 akun customer.

**Penyebab**: Edge function `/customers` endpoint memiliki logic filter yang terlalu ketat, sehingga membedakan antara user objects dan email lookup keys secara tidak tepat.

---

## ✅ Perbaikan yang Sudah Dilakukan

### 1. **Updated Edge Function - `/customers` Endpoint** ✅
   - **File**: `src/supabase/functions/server/index.tsx`
   - **Perubahan**:
     - Improved filtering logic untuk membedakan user objects vs email lookup keys
     - Ditambahkan check untuk `item.createdAt` (property yang pasti ada di user object)
     - Ditambahkan detailed console logging dengan emoji untuk visibility
     - Added proper sorting by creation date (terbaru terlebih dahulu)
   - **Status**: Code updated, but **NOT YET DEPLOYED** ⚠️

### 2. **Created Debug Panel Component** ✅
   - **File**: `src/components/CustomerDebugPanel.tsx`
   - **Fungsi**: Test API endpoint langsung dari UI
   - **Features**:
     - Test `/customers` endpoint
     - Test `/users` endpoint
     - Lihat response status dan data
     - Copy response ke clipboard
   - **Status**: Created, integrated ke AdminCustomers component

### 3. **Enhanced AdminCustomers Component** ✅
   - **File**: `src/components/AdminCustomers.tsx`
   - **Perubahan**:
     - Added CustomerDebugPanel import
     - Added debug panel ke JSX
     - Improved logging
   - **Status**: Complete

---

## 🔴 CRITICAL NEXT STEP: Deploy Edge Function

**WAJIB dilakukan** agar perbaikan di endpoint `/customers` bisa digunakan.

### Option A: Deploy via Supabase Dashboard (Paling Mudah - Rekomendasi) 🌟

1. **Buka Supabase Dashboard**:
   - URL: https://supabase.com/dashboard
   - Login dengan akun Supabase kamu
   - Pilih project: **etvwxarauhbutuxrjqpf**

2. **Navigasi ke Edge Functions**:
   - Di sidebar kiri, cari **Edge Functions**
   - Atau buka: https://supabase.com/dashboard/project/etvwxarauhbutuxrjqpf/functions

3. **Pilih function `server`**:
   - Cari function dengan nama `server`
   - Klik untuk membuka editor

4. **Update Code**:
   - Buka file: `src/supabase/functions/server/index.tsx`
   - Copy seluruh isi file
   - Paste ke Supabase editor (hapus semua yang ada)
   - Klik **Deploy** di bottom-right corner

5. **Tunggu sampai status berubah menjadi "Active"** ✅

---

### Option B: Deploy via Supabase CLI (Jika sudah install)

```bash
# Terminal/Command Prompt
cd "c:\Users\ASUS\OneDrive\문서\Downloads\WarungDigitalArkan"

# Login ke Supabase (jika belum login)
supabase login

# Link ke project
supabase link --project-ref etvwxarauhbutuxrjqpf

# Deploy edge function
supabase functions deploy server
```

**Jika error "supabase command not found"**:
- Install Supabase CLI dari: https://supabase.com/docs/guides/cli
- Windows users: Gunakan Homebrew atau installer

---

## 🧪 Langkah 2: Test API Endpoint

Setelah edge function di-deploy, test apakah API bekerja:

### Method 1: Menggunakan Debug Panel (Paling Mudah) 🎯

1. **Jalankan dev server**:
   ```bash
   cd "c:\Users\ASUS\OneDrive\문서\Downloads\WarungDigitalArkan"
   npm run dev
   ```

2. **Buka app di browser**: http://localhost:3000

3. **Login ke Admin Panel**:
   - Email: `admin@arkan.com`
   - Password: `admin123`

4. **Masuk ke "Manajemen Pelanggan"**

5. **Lihat Debug Panel di bottom-right**:
   - Klik tombol `📊 Test /customers`
   - Tunggu response
   - Seharusnya muncul status 200 dan array dengan customers

### Method 2: Menggunakan Browser Console

1. Buka DevTools (F12) → tab **Console**

2. Copy-paste code ini:

```javascript
async function testCustomersAPI() {
  const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634";
  
  console.log("🧪 Testing /customers endpoint...\n");
  
  try {
    const response = await fetch(
      "https://etvwxarauhbutuxrjqpf.supabase.co/functions/v1/make-server-d6ea81e6/customers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JWT_TOKEN}`
        }
      }
    );
    
    console.log("Status:", response.status, response.statusText);
    
    const data = await response.json();
    console.log("Response:", data);
    
    if (Array.isArray(data)) {
      console.log(`✅ Success! Got ${data.length} customers`);
      data.forEach((customer, i) => {
        console.log(`[${i}] ${customer.name} (${customer.email}) - ${customer.role}`);
      });
    } else {
      console.log("❌ Response is not an array!");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testCustomersAPI();
```

3. Tekan Enter
4. Lihat hasil di console

---

## 🎯 Step-by-Step Checklist

- [ ] Edge function di-deploy ke Supabase (status Active)
- [ ] Dev server running (`npm run dev`)
- [ ] Buka admin panel dan masuk ke Manajemen Pelanggan
- [ ] Klik tombol debug di bottom-right atau buka browser console
- [ ] Test `/customers` endpoint
- [ ] Verifikasi response adalah array dengan customers
- [ ] Refresh halaman, seharusnya customers muncul di tabel
- [ ] Jika ada 3 customers, selesai! ✅

---

## 📝 File yang Diubah

| File | Status | Perubahan |
|------|--------|-----------|
| `src/supabase/functions/server/index.tsx` | 🔴 Not deployed | Improved `/customers` endpoint logic |
| `src/components/CustomerDebugPanel.tsx` | ✅ Created | New debug panel component |
| `src/components/AdminCustomers.tsx` | ✅ Updated | Added debug panel, improved logging |

---

## ❌ Troubleshooting

### Masalah 1: "API Error 500" atau "Failed to get customers"

**Penyebab**: Edge function tidak di-deploy atau ada syntax error

**Solusi**:
1. Cek Supabase Dashboard: https://supabase.com/dashboard/project/etvwxarauhbutuxrjqpf/functions
2. Pastikan function `server` status adalah **Active** (hijau)
3. Jika tidak, coba deploy ulang melalui dashboard

---

### Masalah 2: Response berupa array kosong `[]`

**Penyebab**: Database belum terisi dengan customer data

**Solusi**:
1. Pastikan sudah membuat customer account melalui register page
2. Cek di Supabase > SQL Editor:
   ```sql
   SELECT key, value FROM kv_store_d6ea81e6 
   WHERE key LIKE 'user:%' 
   LIMIT 20;
   ```

---

### Masalah 3: CORS Error

**Error**: "Access to fetch blocked"

**Solusi**: Edge function sudah punya CORS config, ensure function di-deploy

---

### Masalah 4: "404 Not Found"

**Penyebab**: Edge function belum di-deploy

**Solusi**: Deploy ke Supabase dashboard terlebih dahulu

