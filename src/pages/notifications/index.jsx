import React, { useState, useEffect } from 'react';
import BottomNavigation from 'components/ui/BottomNavigation';
import Header from 'components/ui/Header';
import { NotificationTabs, NotificationItem, NotificationFilters } from './components';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        type: 'like',
        user: {
          name: 'Sarah Johnson',
          avatar: '/assets/images/no_image.png',
          verified: true
        },
        content: 'liked your post',
        postPreview: 'Beautiful sunset today! Nature never fails to amaze me...',
        timestamp: '2 minutes ago',
        read: false,
        actionData: {
          postId: 123
        }
      },
      {
        id: 2,
        type: 'comment',
        user: {
          name: 'Mike Chen',
          avatar: '/assets/images/no_image.png',
          verified: false
        },
        content: 'commented on your post',
        comment: 'Amazing shot! What camera did you use?',
        postPreview: 'Beautiful sunset today! Nature never fails to amaze me...',
        timestamp: '5 minutes ago',
        read: false,
        actionData: {
          postId: 123,
          commentId: 456
        }
      },
      {
        id: 3,
        type: 'follow',
        user: {
          name: 'Emma Wilson',
          avatar: '/assets/images/no_image.png',
          verified: true
        },
        content: 'started following you',
        timestamp: '1 hour ago',
        read: false,
        actionData: {
          userId: 789
        }
      },
      {
        id: 4,
        type: 'mention',
        user: {
          name: 'David Kim',
          avatar: '/assets/images/no_image.png',
          verified: false
        },
        content: 'mentioned you in a post',
        postPreview: 'Great discussion with @you about web development trends...',
        timestamp: '2 hours ago',
        read: true,
        actionData: {
          postId: 101
        }
      },
      {
        id: 5,
        type: 'share',
        user: {
          name: 'Alex Rodriguez',
          avatar: '/assets/images/no_image.png',
          verified: false
        },
        content: 'shared your post',
        postPreview: 'JavaScript tips that changed my coding game forever!',
        timestamp: '3 hours ago',
        read: true,
        actionData: {
          postId: 202
        }
      },
      {
        id: 6,
        type: 'friend_request',
        user: {
          name: 'Lisa Chang',
          avatar: '/assets/images/no_image.png',
          verified: false
        },
        content: 'sent you a friend request',
        timestamp: '1 day ago',
        read: false,
        actionData: {
          userId: 303
        }
      },
      {
        id: 7,
        type: 'post_reaction',
        user: {
          name: 'Tom Wilson',
          avatar: '/assets/images/no_image.png',
          verified: true
        },
        content: 'reacted 😍 to your post',
        postPreview: 'Weekend coffee and coding session...',
        timestamp: '1 day ago',
        read: true,
        actionData: {
          postId: 404,
          reaction: '😍'
        }
      },
      {
        id: 8,
        type: 'birthday',
        user: {
          name: 'Jessica Lee',
          avatar: '/assets/images/no_image.png',
          verified: false
        },
        content: 'has a birthday today',
        timestamp: 'Today',
        read: false,
        actionData: {
          userId: 505
        }
      }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 800);
  }, []);

  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    
    const typeMap = {
      likes: ['like', 'post_reaction'],
      comments: ['comment', 'mention'],
      follows: ['follow', 'friend_request'],
      posts: ['share', 'mention']
    };
    
    return notifications.filter(notification => 
      typeMap[activeTab]?.includes(notification.type)
    );
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => 
      notification.id !== notificationId
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Notifications" 
        showBack={true}
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={markAllAsRead}
              className="text-blue-500 hover:text-blue-600 font-medium text-sm"
            >
              Mark all read
            </button>
          ) : null
        }
      />
      
      <main className="pt-16 pb-20">
        {/* Notification Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <NotificationTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            unreadCount={unreadCount}
          />
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="bg-white divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {activeTab === 'all' 
                ? "You're all caught up! Check back later for new notifications."
                : `No ${activeTab} notifications at the moment.`
              }
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="p-4 text-center bg-white border-t border-gray-100">
            <button className="text-blue-500 font-medium hover:text-blue-600">
              Load older notifications
            </button>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Notifications;
