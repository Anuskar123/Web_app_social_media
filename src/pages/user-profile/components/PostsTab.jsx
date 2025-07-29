import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostsTab = ({ posts, onLike, onComment, onShare }) => {
  const [expandedPosts, setExpandedPosts] = useState(new Set());

  const toggleExpanded = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No posts yet</h3>
        <p className="text-text-secondary">When posts are shared, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-surface border border-border rounded-lg overflow-hidden">
          {/* Post Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">{post.author.name}</h4>
                <p className="text-sm text-text-secondary">{formatTimeAgo(post.timestamp)}</p>
              </div>
            </div>
            <Button variant="ghost" iconName="MoreHorizontal" />
          </div>

          {/* Post Content */}
          <div className="px-4 pb-4">
            <p className="text-text-primary mb-3">
              {expandedPosts.has(post.id) || post.content.length <= 200
                ? post.content
                : `${post.content.substring(0, 200)}...`}
              {post.content.length > 200 && (
                <button
                  onClick={() => toggleExpanded(post.id)}
                  className="text-primary hover:underline ml-1"
                >
                  {expandedPosts.has(post.id) ? 'Show less' : 'Show more'}
                </button>
              )}
            </p>

            {/* Post Media */}
            {post.media && (
              <div className="mb-3 rounded-lg overflow-hidden">
                {post.media.type === 'image' && (
                  <Image
                    src={post.media.url}
                    alt="Post image"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                )}
                {post.media.type === 'video' && (
                  <video
                    controls
                    className="w-full h-auto max-h-96 object-cover"
                    poster={post.media.thumbnail}
                  >
                    <source src={post.media.url} type="video/mp4" />
                  </video>
                )}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
              <span>{post.likes.toLocaleString()} likes</span>
              <span>{post.comments.toLocaleString()} comments • {post.shares.toLocaleString()} shares</span>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                iconName={post.isLiked ? "Heart" : "Heart"}
                iconPosition="left"
                onClick={() => onLike(post.id)}
                className={post.isLiked ? "text-error" : "text-text-secondary hover:text-error"}
              >
                Like
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => onComment(post.id)}
                className="text-text-secondary hover:text-primary"
              >
                Comment
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Share"
                iconPosition="left"
                onClick={() => onShare(post.id)}
                className="text-text-secondary hover:text-primary"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsTab;