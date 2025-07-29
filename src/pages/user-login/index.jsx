import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import BiometricAuth from './components/BiometricAuth';
import SecurityFeatures from './components/SecurityFeatures';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/');
    }

    // Set page title
    document.title = 'Sign In - SocialConnect';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <LoginHeader />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <LoginForm />
          <BiometricAuth />
          <SecurityFeatures />
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-text-secondary">
              By signing in, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-200">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-200">
                Privacy Policy
              </a>
            </p>
            <p className="text-xs text-text-secondary mt-2">
              © {new Date().getFullYear()} SocialConnect. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;