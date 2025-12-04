import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function DatabaseDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d6ea81e6`;

  const checkDatabase = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/debug/database`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setDebugInfo(data);
      setMessage('Database checked successfully!');
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const initializeDatabase = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/debug/init`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setMessage(data.message || 'Database initialized!');
      // Recheck database after init
      setTimeout(checkDatabase, 1000);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <details className="bg-white rounded-xl shadow-lg p-4 max-w-md">
        <summary className="cursor-pointer text-blue-900 mb-2">🔧 Debug Database</summary>
        
        <div className="space-y-3 mt-3">
          <div className="flex gap-2">
            <button
              onClick={checkDatabase}
              disabled={loading}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400 text-sm"
            >
              Check DB
            </button>
            <button
              onClick={initializeDatabase}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 text-sm"
            >
              Initialize
            </button>
          </div>

          {message && (
            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              {message}
            </div>
          )}

          {debugInfo && (
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-gray-50 rounded-lg">
                <p><strong>Products:</strong> {debugInfo.productsCount}</p>
                <p><strong>Users:</strong> {debugInfo.usersCount}</p>
                <p><strong>Admin ID:</strong> {debugInfo.adminUserId || 'Not found'}</p>
              </div>
              {debugInfo.products && debugInfo.products.length > 0 && (
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p><strong>Sample Products:</strong></p>
                  {debugInfo.products.map((p: any) => (
                    <p key={p.id} className="text-xs">{p.name} - Rp {p.price}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded-lg">
            <p><strong>Admin Login:</strong></p>
            <p>Email: admin@arkan.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </details>
    </div>
  );
}
