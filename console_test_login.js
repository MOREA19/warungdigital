// Quick test script untuk memeriksa login functionality
// Buka browser console (F12) dan paste kode ini

async function testLogin() {
    console.log('🧪 Starting Login Test...\n');

    const projectId = 'etvwxarauhbutuxrjqpf';
    const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-d6ea81e6`;
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634";

    const testCases = [{
            name: 'Valid Login (budi@example.com)',
            email: 'budi@example.com',
            password: 'password123',
            shouldSucceed: true
        },
        {
            name: 'Valid Login (siti@example.com)',
            email: 'siti@example.com',
            password: 'password123',
            shouldSucceed: true
        },
        {
            name: 'Wrong Password',
            email: 'budi@example.com',
            password: 'wrongpassword',
            shouldSucceed: false
        }
    ];

    for (const testCase of testCases) {
        console.log(`\n📝 Test: ${testCase.name}`);
        console.log(`   Email: ${testCase.email}`);
        console.log(`   Password: ${testCase.password}`);

        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({
                    email: testCase.email,
                    password: testCase.password
                })
            });

            console.log(`   Status: ${response.status} ${response.statusText}`);

            const data = await response.json();

            if (response.ok) {
                console.log(`   ✅ Success! User: ${data.name} (${data.email})`);
                console.log(`   User ID: ${data.id}`);
                console.log(`   Role: ${data.role}`);
            } else {
                console.log(`   ❌ Failed: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.log(`   ⚠️  Network Error: ${error.message}`);
        }
    }

    console.log('\n\n✅ Test Complete!');
    console.log('\n📌 Next Steps:');
    console.log('1. Check above results');
    console.log('2. If all tests pass, login should work in the app');
    console.log('3. If any fail, check:');
    console.log('   - Network tab for API errors');
    console.log('   - Supabase function deployment status');
    console.log('   - Database contents (kv_store_d6ea81e6 table)');
}

// Run test
testLogin();

// Jika ingin di-save sebagai file, gunakan:
// copy(JSON.stringify({test: 'done'})) - untuk copy ke clipboard