import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BiometricAuth = () => {
  const navigate = useNavigate();
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if WebAuthn is supported
    if (window.PublicKeyCredential && 
        typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
      window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(available => {
          setIsSupported(available);
        })
        .catch(() => {
          setIsSupported(false);
        });
    }
  }, []);

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful authentication
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', 'biometric@socialconnect.com');
      localStorage.setItem('authMethod', 'biometric');
      
      navigate('/');
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="Fingerprint" size={24} className="text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          Quick Sign In
        </h3>
        <p className="text-xs text-text-secondary mb-4">
          Use your fingerprint or face ID for secure access
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBiometricLogin}
          loading={isLoading}
          iconName="Fingerprint"
          iconPosition="left"
          className="w-full"
        >
          {isLoading ? 'Authenticating...' : 'Use Biometric'}
        </Button>
      </div>
    </div>
  );
};

export default BiometricAuth;