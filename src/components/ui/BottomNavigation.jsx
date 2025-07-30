import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const BottomNavigation = () => {
  const location = useLocation();
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [userAvatar, setUserAvatar] = useState('/assets/images/avatar-placeholder.jpg');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/', 
      icon: 'Home',
      isActive: location.pathname === '/'
    },
    { 
      label: 'Messages', 
      path: '/messages', 
      icon: 'MessageCircle',
      badge: unreadMessages,
      isActive: location.pathname === '/messages'
    },
    { 
      label: 'Create', 
      path: '/create-post', 
      icon: 'Plus',
      isCreate: true,
      isActive: location.pathname === '/create-post'
    },
    { 
      label: 'Profile', 
      path: '/user-profile', 
      icon: 'User',
      isProfile: true,
      isActive: location.pathname === '/user-profile'
    },
  ];

  // Simulate real-time message updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (location.pathname !== '/messages') {
        setUnreadMessages(prev => Math.max(0, prev + Math.floor(Math.random() * 2) - 1));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  // Clear unread count when visiting messages
  useEffect(() => {
    if (location.pathname === '/messages') {
      setUnreadMessages(0);
    }
  }, [location.pathname]);

  const handleCreateClick = (e) => {
    e.preventDefault();
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 z-100 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 lg:hidden">
        <div className="flex items-center justify-around h-16 px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={item.isCreate ? handleCreateClick : undefined}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors duration-200 ${
                item.isActive
                  ? 'text-blue-500' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="relative">
                {item.isProfile ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-current">
                    <Image
                      src={userAvatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Icon name={item.icon} size={24} />
                )}
                
                {/* Message Badge */}
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center animate-fade-in">
                    {item.badge > 99 ? '99+' : item.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Floating Create Button - Mobile Only */}
      <button
        onClick={handleCreateClick}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center z-150 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create Post</h2>
              <button
                onClick={closeCreateModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Create post functionality would be implemented here.
              </p>
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={closeCreateModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <Link
                  to="/create-post"
                  onClick={closeCreateModal}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-center transition-colors duration-200 hover:bg-blue-600"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavigation;