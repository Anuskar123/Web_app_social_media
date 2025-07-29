// Database Connection Test
import { supabase } from '../lib/supabase'

export const testDatabaseConnection = async () => {
  try {
    // Test 1: Check if Supabase client is configured
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    // Test 2: Try to fetch users table (should work even if empty)
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error('Database connection error:', error)
      return {
        success: false,
        error: error.message,
        details: error
      }
    }

    // Test 3: Check authentication status
    const { data: authData } = await supabase.auth.getSession()
    
        return {
          success: true,
          message: 'Database connected successfully!',
          userCount: count || 0,
          authStatus: authData.session ? 'Authenticated' : 'Not authenticated',
        }
      } catch (err) {
        console.error('Database test error:', err)
        return {
          success: false,
          error: err.message,
          details: err
        }
      }
    }