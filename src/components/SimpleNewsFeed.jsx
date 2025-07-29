import React, { useState } from 'react';
import BottomNavigation from 'components/ui/BottomNavigation';
import Header from 'components/ui/Header';

const SimpleNewsFeed = () => {
  const [testResult, setTestResult] = useState(null);

  const testSupabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      // Import Supabase client
      const { supabase } = await import('../lib/supabase');
      console.log('Supabase client loaded:', supabase);
      
      // Test basic connection - try to query users table
      const { data, error, count } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .limit(1);
      
      if (error) {
        console.error('Database error:', error);
        setTestResult({
          success: false,
          message: `Database Error: ${error.message}`,
          details: error
        });
      } else {
        console.log('Database query successful:', { data, count });
        setTestResult({
          success: true,
          message: 'Database connected successfully!',
          details: {
            userCount: count || 0,
            sampleData: data,
            supabaseUrl: supabase.supabaseUrl
          }
        });
      }
    } catch (err) {
      console.error('Connection test failed:', err);
      setTestResult({
        success: false,
        message: `Connection failed: ${err.message}`,
        error: err
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header showNotifications={true} />
      
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Welcome Message */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to SocialConnect! 🚀
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your app is working! Now let's test the database connection.
            </p>
          </div>

          {/* Database Test */}
          <div className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              🔌 Database Connection Test
            </h2>
            
            <button
              onClick={testSupabaseConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test Database Connection
            </button>

            {testResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                testResult.success 
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
              }`}>
                <h3 className="font-semibold">{testResult.message}</h3>
                {testResult.details && (
                  <pre className="mt-2 text-xs overflow-auto">
                    {JSON.stringify(testResult.details, null, 2)}
                  </pre>
                )}
                {testResult.error && (
                  <p className="mt-2 text-sm">Error: {testResult.error.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Mock Posts */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900 dark:text-white">Demo User</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <p className="text-gray-900 dark:text-white">
                Welcome to your social media app! Once the database is connected, real posts will appear here.
              </p>
              <div className="flex items-center mt-4 space-x-4 text-gray-500 dark:text-gray-400">
                <button className="flex items-center hover:text-blue-600">
                  ❤️ Like
                </button>
                <button className="flex items-center hover:text-blue-600">
                  💬 Comment
                </button>
                <button className="flex items-center hover:text-blue-600">
                  📤 Share
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SimpleNewsFeed;
