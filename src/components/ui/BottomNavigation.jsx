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
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border lg:hidden">
        <div className="flex items-center justify-around h-16 px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={item.isCreate ? handleCreateClick : undefined}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors duration-200 ${
                item.isActive
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
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
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center animate-fade-in">
                    {item.badge > 99 ? '99+' : item.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-surface lg:border-r lg:border-border lg:flex lg:flex-col lg:z-100">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Users" size={24} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">SocialConnect</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={item.isCreate ? handleCreateClick : undefined}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                item.isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <div className="relative">
                {item.isProfile ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={userAvatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Icon name={item.icon} size={20} />
                )}
                
                {/* Message Badge */}
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </div>
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/settings"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              location.pathname === '/settings' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
          >
            <Icon name="Settings" size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Floating Create Button (Mobile) */}
      <button
        onClick={handleCreateClick}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevated flex items-center justify-center z-150 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-surface rounded-xl shadow-elevated w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-text-primary">Create Post</h2>
              <button
                onClick={closeCreateModal}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-text-secondary text-center">
                Create post functionality would be implemented here.
              </p>
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={closeCreateModal}
                  className="flex-1 px-4 py-2 bg-muted text-text-primary rounded-lg font-medium transition-colors duration-200 hover:bg-border"
                >
                  Cancel
                </button>
                <Link
                  to="/create-post"
                  onClick={closeCreateModal}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors duration-200 hover:bg-primary/90"
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