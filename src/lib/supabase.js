import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database helper functions
export const dbHelpers = {
  // Posts
  async getPosts(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users!posts_user_id_fkey (
          id,
          name,
          username,
          avatar,
          verified
        ),
        post_likes (
          user_id
        ),
        post_comments (
          id
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) throw error
    return data
  },

  async createPost(postData) {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async likePost(postId, userId) {
    const { data, error } = await supabase
      .from('post_likes')
      .insert([{ post_id: postId, user_id: userId }])
    
    if (error) throw error
    return data
  },

  async unlikePost(postId, userId) {
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId)
    
    if (error) throw error
  },

  async addComment(postId, userId, content) {
    const { data, error } = await supabase
      .from('post_comments')
      .insert([{ 
        post_id: postId, 
        user_id: userId, 
        content: content 
      }])
      .select(`
        *,
        users!post_comments_user_id_fkey (
          id,
          name,
          username,
          avatar
        )
      `)
    
    if (error) throw error
    return data[0]
  },

  async getComments(postId) {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        users!post_comments_user_id_fkey (
          id,
          name,
          username,
          avatar
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  async sharePost(postId, userId, platform) {
    // Log the share action
    const { data, error } = await supabase
      .from('post_shares')
      .insert([{ 
        post_id: postId, 
        user_id: userId, 
        platform: platform 
      }])
    
    if (error) throw error
    
    // Update share count
    const { error: updateError } = await supabase
      .from('posts')
      .update({ shares_count: supabase.raw('shares_count + 1') })
      .eq('id', postId)
    
    if (updateError) throw updateError
    return data
  },

  // Users
  async getUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async searchUsers(query) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, username, avatar, verified')
      .or(`name.ilike.%${query}%, username.ilike.%${query}%`)
      .limit(10)
    
    if (error) throw error
    return data
  },

  // Notifications
  async getNotifications(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        from_user:users!notifications_from_user_id_fkey (
          id,
          name,
          username,
          avatar,
          verified
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async markNotificationAsRead(notificationId) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
    
    if (error) throw error
  },

  // Real-time subscriptions
  subscribeToNotifications(userId, callback) {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  subscribeToPostLikes(postId, callback) {
    return supabase
      .channel('post_likes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes',
          filter: `post_id=eq.${postId}`
        },
        callback
      )
      .subscribe()
  }
}
