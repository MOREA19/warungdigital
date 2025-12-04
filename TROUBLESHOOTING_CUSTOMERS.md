# TROUBLESHOOTING - MANAJEMEN PELANGGAN FIX

## 🔍 Diagnosis Masalah

Jika setelah deployment masih ada masalah, gunakan checklist ini.

---

## ❌ Issue 1: Customers Masih Tidak Muncul di List

### Diagnostic Steps

**Step 1: Cek DevTools Console**
```
F12 → Console tab
- Lihat apakah ada error messages
- Catat exact error messages
```

**Step 2: Cek Network Requests**
```
F12 → Network tab
- Refresh halaman
- Cari request ke: /customers atau /users
- Check Status:
  - 200 = OK
  - 404 = Endpoint not found
  - 500 = Server error
- Check Response body
```

**Step 3: Run API Test di Console**
```javascript
// Copy-paste di browser console (F12)

// Test 1: Call /customers endpoint
fetch('https://etvwxarauhbutuxrjqpf.supabase.co/functions/v1/make-server-d6ea81e6/customers', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634'
  }
})
.then(r => r.json())
.then(d => {
  console.log('Status:', d.status || 'OK');
  console.log('Customers count:', d.length || 'N/A');
  console.log('Customers:', d);
});
```

### Possible Causes & Fixes

| Penyebab | Gejala | Fix |
|----------|--------|-----|
| Edge function belum di-deploy | Status 404 | `supabase functions deploy server` |
| Edge function error | Status 500, error di response | Lihat error message, cek logs di Supabase dashboard |
| API URL salah | "Failed to fetch" | Cek DATABASE_URL di env |
| Database kosong | Array kosong `[]` | Daftar customer baru atau cek database |
| Component belum mount | No console logs | Refresh page atau reload browser |
| CORS error | "No 'Access-Control-Allow-Origin'" | Pastikan CORS middleware di edge function aktif |

---

## ❌ Issue 2: Refresh Button Tidak Berfungsi

### Diagnostic Steps

**Step 1: Cek Console**
```
F12 → Console
- Klik Refresh button
- Lihat apakah ada new logs
- Catat error jika ada
```

**Step 2: Cek Network**
```
F12 → Network
- Clear network tab (clear button)
- Klik Refresh button
- Lihat apakah ada new requests
- Check response status
```

### Possible Causes & Fixes

| Penyebab | Gejala | Fix |
|----------|--------|-----|
| Button handler tidak attach | Button tidak respond saat click | Cek console untuk errors |
| API call error | Button jadi gray/disabled | Lihat network tab & console |
| State update issue | UI tidak update | Cek React dev tools |
| Performance issue | Button loading lama | Cek network speed |

---

## ❌ Issue 3: Baru Daftar, Tapi Tidak Muncul di List

### Diagnostic Steps

**Step 1: Verifikasi Registrasi Berhasil**
- Setelah register, apakah bisa login dengan akun baru?
- Jika iya → registrasi berhasil di database

**Step 2: Cek Database Langsung**
```
1. Buka Supabase Dashboard
2. SQL Editor
3. Run query:
   SELECT key, value FROM kv_store_d6ea81e6 WHERE key LIKE 'user:%' LIMIT 20;
4. Lihat apakah ada entry untuk new user
```

**Step 3: Cek API Response**
```javascript
// Di browser console
fetch('https://etvwxarauhbutuxrjqpf.supabase.co/functions/v1/make-server-d6ea81e6/customers', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634'
  }
})
.then(r => r.json())
.then(d => d.forEach(c => console.log(c.email, c.name)));
```

### Possible Causes & Fixes

| Penyebab | Gejala | Fix |
|----------|--------|-----|
| User created as admin | Tidak muncul di customer list | Database schema, cek registration code |
| Email key issue | Data ada tapi tidak terfilter | Check filter logic di endpoint |
| Timing issue | Baru daftar langsung cek | Tunggu sebentar atau klik refresh |
| Data format issue | Endpoint return error | Cek console log di edge function |

---

## ❌ Issue 4: Console Errors

### Error: "Cannot read property 'role' of undefined"

**Penyebab:** Data object tidak valid (bukan user object)

**Fix:**
```
Ini sudah diperbaiki di update server-side dengan:
- Check item.id.startsWith('user-')
- Check typeof item === 'object'
- Check item.email exists

Jika masih muncul:
1. supabase functions deploy server
2. Restart: npm run dev
3. Clear browser cache: Ctrl+Shift+Delete
```

### Error: "Failed to fetch"

**Penyebab:** Network atau CORS issue

**Fix:**
```
1. Check internet connection
2. Cek API URL correct
3. Deploy ulang: supabase functions deploy server
4. Cek Supabase project status
```

### Error: "Invalid email or password" when login

**Penyebab:** User credentials salah

**Fix:**
```
Test dengan demo account:
- Email: budi@example.com
- Password: password123

Atau:
- Email: siti@example.com  
- Password: password123

Atau (admin):
- Email: admin@arkan.com
- Password: admin123
```

---

## 🧪 Manual Testing Script

Jika ingin manual test semua endpoint:

```javascript
// Copy-paste di browser console

const BASE_URL = 'https://etvwxarauhbutuxrjqpf.supabase.co/functions/v1/make-server-d6ea81e6';
const AUTH = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634';

async function testAPIs() {
  console.log('🧪 Testing APIs...\n');
  
  try {
    // Test 1: /customers
    console.log('📍 Test 1: GET /customers');
    const resp1 = await fetch(`${BASE_URL}/customers`, { headers: { Authorization: AUTH } });
    const data1 = await resp1.json();
    console.log(`Status: ${resp1.status}, Count: ${data1.length || 'N/A'}`);
    console.log('Customers:', data1);
    
    // Test 2: /users
    console.log('\n📍 Test 2: GET /users');
    const resp2 = await fetch(`${BASE_URL}/users`, { headers: { Authorization: AUTH } });
    const data2 = await resp2.json();
    console.log(`Status: ${resp2.status}, Count: ${data2.length || 'N/A'}`);
    console.log('Users:', data2);
    
    console.log('\n✅ Tests complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPIs();
```

---

## 📋 Checklist Pre-Deployment

- [ ] Edge function file updated dengan filter logic baru
- [ ] AdminCustomers component updated dengan refresh button
- [ ] Ran: `supabase functions deploy server`
- [ ] Restarted dev server: `npm run dev`
- [ ] Cleared browser cache
- [ ] No errors di console
- [ ] Network requests return 200 OK
- [ ] Can see customers in list
- [ ] Refresh button works
- [ ] New registrations appear after refresh

---

## 🎯 Resolution Steps

Jika masih ada issue:

1. **Close browser completely** (bukan tab, tapi close app)
2. **Run these commands:**
   ```bash
   supabase functions deploy server
   npm run dev
   ```
3. **Open browser fresh & test:**
   - Go to admin page
   - Click "Manajemen Pelanggan"
   - See if customers appear
   - Try refresh button

4. **If still not working:**
   - Share screenshot dari:
     - DevTools Console (F12)
     - DevTools Network tab
     - Exact error messages
   - Share output dari: `supabase functions list`

---

## 📞 Emergency Troubleshooting

Jika absolutely nothing works:

```bash
# Reset everything
npm run build
supabase functions deploy server --force
npm run dev
```

Then:
1. Close browser completely
2. Clear ALL cookies & cache for site
3. Open fresh browser window
4. Test again

---

## ✅ Success Indicators

Ketika semua sudah bekerja:

```
✅ List menampilkan customers
✅ Refresh button ada dan berfungsi
✅ Bisa search/filter customers
✅ Stats cards menampilkan angka correct
✅ New registrations muncul setelah refresh
✅ No errors di console
✅ All network requests 200 OK
```

Good luck! 🚀
