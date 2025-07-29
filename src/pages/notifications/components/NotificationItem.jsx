import React from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Heart, MessageCircle, UserPlus, Share, AtSign, Gift, X } from 'lucide-react';
import AppImage from 'components/AppImage';

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getNotificationIcon = (type) => {
    const iconClass = "w-4 h-4";
    
    switch (type) {
      case 'like':
        return <Heart className={`${iconClass} text-red-500`} />;
      case 'comment':
        return <MessageCircle className={`${iconClass} text-blue-500`} />;
      case 'follow':
        return <UserPlus className={`${iconClass} text-green-500`} />;
      case 'mention':
        return <AtSign className={`${iconClass} text-purple-500`} />;
      case 'share':
        return <Share className={`${iconClass} text-blue-500`} />;
      case 'friend_request':
        return <UserPlus className={`${iconClass} text-green-500`} />;
      case 'post_reaction':
        return <span className="text-lg">{notification.actionData?.reaction || '❤️'}</span>;
      case 'birthday':
        return <Gift className={`${iconClass} text-yellow-500`} />;
      default:
        return <Heart className={`${iconClass} text-gray-500`} />;
    }
  };

  const getNotificationAction = () => {
    switch (notification.type) {
      case 'friend_request':
        return (
          <div className="flex space-x-2 mt-2">
            <button className="px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
              Accept
            </button>
            <button className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300">
              Decline
            </button>
          </div>
        );
      case 'follow':
        return (
          <button className="mt-2 px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
            Follow back
          </button>
        );
      case 'birthday':
        return (
          <button className="mt-2 px-4 py-1.5 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600">
            Say happy birthday
          </button>
        );
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'like':
      case 'comment':
      case 'mention':
      case 'share':
      case 'post_reaction':
        // Navigate to post
        break;
      case 'follow':
      case 'friend_request':
      case 'birthday':
        // Navigate to user profile
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`relative p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
        !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        {/* User Avatar */}
        <div className="relative flex-shrink-0">
          <Link to="/user-profile" onClick={(e) => e.stopPropagation()}>
            <AppImage
              src={notification.user.avatar}
              alt={notification.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
          {/* Notification Icon */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border">
            {getNotificationIcon(notification.type)}
          </div>
        </div>

        {/* Notification Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <Link 
                  to="/user-profile" 
                  className="font-semibold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {notification.user.name}
                </Link>
                {notification.user.verified && (
                  <svg className="w-4 h-4 text-blue-500 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {' '}{notification.content}
              </p>

              {/* Comment or Post Preview */}
              {notification.comment && (
                <p className="text-sm text-gray-600 mt-1 bg-gray-100 p-2 rounded-lg">
                  "{notification.comment}"
                </p>
              )}
              
              {notification.postPreview && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {notification.postPreview}
                </p>
              )}

              <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>

              {/* Action Buttons */}
              {getNotificationAction()}
            </div>

            {/* Options Menu */}
            <div className="flex items-center space-x-1">
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                className="p-1 hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
