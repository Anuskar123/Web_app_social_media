import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import AppImage from 'components/AppImage';

const PostResult = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="block p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-3">
        <AppImage
          src={post.user.avatar}
          alt={post.user.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate">{post.user.name}</h4>
            <span className="text-sm text-gray-500">{post.timestamp}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3">
            {post.content}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostResult;
