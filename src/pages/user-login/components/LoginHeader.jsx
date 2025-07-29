import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <header className="w-full bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">
              SocialConnect
            </span>
          </Link>

          {/* Sign Up Link */}
          <div className="flex items-center space-x-4">
            <span className="text-text-secondary text-sm hidden sm:inline">
              New here?
            </span>
            <Link
              to="/user-registration"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="UserPlus" size={16} className="mr-2" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;