// TEST API - Copy & paste di browser console (F12)

async function testCustomersAPI() {
    console.log('🧪 Testing Customers API...\n');

    const projectId = 'etvwxarauhbutuxrjqpf';
    const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634";

    const endpoints = [
        { name: 'Endpoint /customers', url: `https://${projectId}.supabase.co/functions/v1/make-server-d6ea81e6/customers` },
        { name: 'Endpoint /users', url: `https://${projectId}.supabase.co/functions/v1/make-server-d6ea81e6/users` }
    ];

    for (const endpoint of endpoints) {
        console.log(`📍 Testing: ${endpoint.name}`);
        console.log(`URL: ${endpoint.url}\n`);

        try {
            const response = await fetch(endpoint.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWT_TOKEN}`,
                }
            });

            console.log(`Status: ${response.status} ${response.statusText}`);

            const data = await response.json();
            console.log(`Response:`, data);
            console.log(`Count: ${Array.isArray(data) ? data.length : 'N/A'}`);

            if (Array.isArray(data)) {
                data.forEach((item, index) => {
                    console.log(`  [${index}] ${item.name} (${item.email}) - Role: ${item.role}`);
                });
            }

        } catch (error) {
            console.error(`❌ Error:`, error.message);
        }

        console.log('\n' + '='.repeat(60) + '\n');
    }

    console.log('✅ Tests complete!');
}

// Run test
testCustomersAPI();