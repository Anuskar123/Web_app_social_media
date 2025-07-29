import React, { useState, useEffect } from 'react';
import BottomNavigation from 'components/ui/BottomNavigation';
import Header from 'components/ui/Header';
import { PostCard, StoryCarousel, CreatePostPrompt } from './components';
import { dbHelpers } from '../../lib/supabase';
import { testDatabaseConnection } from '../../utils/testDatabase';
import SimpleTest from '../../components/SimpleTest';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [dbTestResult, setDbTestResult] = useState(null);

  // Test database connection
  const handleTestDatabase = async () => {
    console.log('Testing database connection...');
    const result = await testDatabaseConnection();
    setDbTestResult(result);
    console.log('Database test result:', result);
  };

  // Load posts from database
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setError(null);
      
      // Try to load from database first
      const dbPosts = await dbHelpers.getPosts();
      
      if (dbPosts && dbPosts.length > 0) {
        // Transform database posts to match our format
        const transformedPosts = dbPosts.map(post => ({
          id: post.id,
          user: {
            name: post.users.name,
            avatar: post.users.avatar || '/assets/images/no_image.png',
            verified: post.users.verified
          },
          timestamp: formatTimestamp(post.created_at),
          content: post.content,
          images: post.images || [],
          likes: post.likes_count || 0,
          comments: post.comments_count || 0,
          shares: post.shares_count || 0,
          isLiked: post.post_likes?.some(like => like.user_id === 'current_user_id'), // Replace with actual user ID
          location: post.location
        }));
        
        setPosts(transformedPosts);
      } else {
        // Fall back to mock data if no database posts
        loadMockPosts();
      }
    } catch (err) {
      console.error('Error loading posts from database:', err);
      setError('Failed to load posts from database, using mock data');
      // Fall back to mock data
      loadMockPosts();
    } finally {
      setLoading(false);
    }
  };

  const loadMockPosts = () => {
    // No mock posts for a clean Facebook/Instagram-like experience
    setPosts([]);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMs = now - postDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return postDate.toLocaleDateString();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadPosts();
    } catch (err) {
      console.error('Error refreshing posts:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      // Optimistic update
      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1
            }
          : p
      ));

      // Try to update in database
      if (post.isLiked) {
        await dbHelpers.unlikePost(postId, 'current_user_id'); // Replace with actual user ID
      } else {
        await dbHelpers.likePost(postId, 'current_user_id'); // Replace with actual user ID
      }
    } catch (err) {
      console.error('Error updating like:', err);
      // Revert optimistic update on error
      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes + 1 : p.likes - 1
            }
          : p
      ));
    }
  };

  const handleCommentPost = async (postId, commentText) => {
    try {
      // Update comment count optimistically
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, comments: p.comments + 1 }
          : p
      ));

      // Add comment to database (implement this in dbHelpers)
      // await dbHelpers.addComment(postId, 'current_user_id', commentText);
      
      console.log(`Comment added to post ${postId}: ${commentText}`);
    } catch (err) {
      console.error('Error adding comment:', err);
      // Revert comment count on error
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, comments: p.comments - 1 }
          : p
      ));
    }
  };

  const handleSharePost = async (postId, platform) => {
    try {
      // Update share count optimistically
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, shares: p.shares + 1 }
          : p
      ));

      // Log share to database (implement this in dbHelpers)
      // await dbHelpers.sharePost(postId, 'current_user_id', platform);
      
      console.log(`Post ${postId} shared on ${platform}`);
    } catch (err) {
      console.error('Error sharing post:', err);
      // Revert share count on error
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, shares: p.shares - 1 }
          : p
      ));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header showNotifications={true} />
      
      <main className="pt-16 pb-20">
        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{error}</p>
              </div>
            </div>
          </div>
        )}



        {/* Stories Section */}
        <div className="bg-white border-b border-gray-200">
          <StoryCarousel />
        </div>

        {/* Create Post Prompt */}
        <div className="bg-white border-b border-gray-200 p-4">
          <CreatePostPrompt />
        </div>

        {/* Posts Feed */}
        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onLike={() => handleLikePost(post.id)}
              onComment={handleCommentPost}
              onShare={handleSharePost}
            />
          ))}
        </div>

        {/* Pull to Refresh Indicator */}
        {refreshing && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Load More Posts */}
        <div className="p-4 text-center">
          <button 
            onClick={handleRefresh}
            className="text-blue-500 font-medium hover:text-blue-600"
            disabled={refreshing}
          >
            {refreshing ? 'Loading...' : 'Load more posts'}
          </button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default NewsFeed;
