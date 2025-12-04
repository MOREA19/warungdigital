import { useState } from 'react';
import { AlertCircle, Check, X, Copy } from 'lucide-react';

/**
 * Debug Component untuk Customers API
 * Gunakan di Admin Panel untuk test API endpoint
 */
export function CustomerDebugPanel() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dnd4YXJhdWhidXR1eHJqcXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTk0MDIsImV4cCI6MjA3OTQ3NTQwMn0.CKqTVWWuPDm-E-3Gw1lSFOZQssuVj8aGjw3GvWgm634";
  const API_URL = "https://etvwxarauhbutuxrjqpf.supabase.co/functions/v1/make-server-d6ea81e6";

  const testApi = async (endpoint: string) => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      console.log(`🧪 Testing ${endpoint}...`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWT_TOKEN}`,
        }
      });

      console.log(`Status: ${response.status}`);

      const text = await response.text();
      console.log('Response:', text);

      let data = text;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Response might not be JSON
      }

      setTestResult({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        data,
        isArray: Array.isArray(data),
        arrayLength: Array.isArray(data) ? data.length : 'N/A',
        timestamp: new Date().toLocaleTimeString()
      });

      if (!response.ok) {
        setError(`API returned status ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      console.error('❌ Error:', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col z-50">
      <div className="bg-gray-900 text-white p-4 font-bold">
        🔧 API Debug Panel
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => testApi('/customers')}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-3 rounded text-sm font-medium transition"
          >
            {isLoading ? '⏳ Testing...' : '📊 Test /customers'}
          </button>
          <button
            onClick={() => testApi('/users')}
            disabled={isLoading}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-2 px-3 rounded text-sm font-medium transition"
          >
            {isLoading ? '⏳ Testing...' : '👥 Test /users'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-2">
            <div className="flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-red-700">{error}</div>
            </div>
          </div>
        )}

        {/* Result */}
        {testResult && (
          <div className="bg-gray-50 border border-gray-200 rounded p-2 space-y-2">
            <div className="flex justify-between items-start">
              <div className="text-xs font-semibold text-gray-700">
                {testResult.endpoint}
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded ${
                testResult.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {testResult.status}
              </div>
            </div>

            {testResult.isArray && (
              <div className="bg-blue-50 border border-blue-200 rounded p-1.5 text-xs">
                ✅ Valid array with {testResult.arrayLength} items
              </div>
            )}

            <button
              onClick={() => copyToClipboard(JSON.stringify(testResult.data, null, 2))}
              className="w-full text-left bg-white hover:bg-gray-100 border border-gray-200 rounded p-1.5 text-xs font-mono text-gray-700 max-h-32 overflow-auto break-words"
            >
              <div className="flex gap-2 items-start">
                <Copy className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <div className="flex-1 truncate">{JSON.stringify(testResult.data).substring(0, 100)}...</div>
              </div>
            </button>

            <div className="text-xs text-gray-500 text-right">
              {testResult.timestamp}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 border-t pt-2">
          <p className="font-semibold mb-1">📝 What to check:</p>
          <ul className="space-y-1 text-gray-600">
            <li>✓ Status should be 200</li>
            <li>✓ Response should be JSON array</li>
            <li>✓ Should have customer objects</li>
            <li>✓ Each object should have: id, email, name, role</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 p-2 text-xs text-gray-600 border-t">
        Check browser console (F12) for detailed logs
      </div>
    </div>
  );
}
