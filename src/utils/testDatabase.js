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
      supabaseUrl: supabase.supabaseUrl
    }

  } catch (err) {
    console.error('Connection test failed:', err)
    return {
      success: false,
      error: err.message
    }
  }
}

// Test function to create a user (for testing)
export const createTestUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

// Test function to fetch posts (for testing)
export const fetchTestPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          id,
          name,
          username,
          avatar,
          verified
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) throw error

    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
