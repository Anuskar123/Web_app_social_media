import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-text-primary">
            SocialConnect
          </span>
        </Link>

        {/* Login Link */}
        <Link
          to="/user-login"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
        >
          Already have an account? Login
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;