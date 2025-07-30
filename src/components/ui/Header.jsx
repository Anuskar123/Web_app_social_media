import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, ArrowLeft, Menu, X, Home, MessageCircle, Plus, User, Settings } from 'lucide-react';
import Icon from '../AppIcon';

const Header = ({ 
  title = 'SocialConnect', 
  showBack = false, 
  showSearch = true, 
  showNotifications = true, 
  rightAction = null 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadNotifications] = useState(3);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  const navigationItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Messages', path: '/messages', icon: MessageCircle },
    { label: 'Create Post', path: '/create-post', icon: Plus },
    { label: 'Profile', path: '/user-profile', icon: User },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  // Close sidebar when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.menu-trigger')
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Left Side */}
          <div className="flex items-center space-x-3">
            {/* Hamburger Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="menu-trigger p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Back Button (mobile only) */}
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors md:hidden"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            )}

            {/* Logo and Title */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={20} color="white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
                {title}
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Custom Right Action */}
            {rightAction && (
              <div className="mr-2">{rightAction}</div>
            )}
            
            {/* Search Button */}
            {showSearch && (
              <Link
                to="/search"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Link>
            )}

            {/* Notifications Button */}
            {showNotifications && (
              <Link
                to="/notifications"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label={`Notifications${unreadNotifications > 0 ? ` (${unreadNotifications} unread)` : ''}`}
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Menu */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 max-w-xs bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link 
            to="/" 
            className="flex items-center space-x-2" 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              SocialConnect
            </span>
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-2 py-4 space-y-1">
            {navigationItems.map(({ label, path, icon: IconComponent }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  isActive(path)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <IconComponent size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>SocialConnect v1.0</p>
            <p>© 2025 All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;