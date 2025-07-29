import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import ProfileSetup from './components/ProfileSetup';
import WelcomeAnimation from './components/WelcomeAnimation';
import Icon from '../../components/AppIcon';


const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('registration'); // registration, profile, welcome
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleRegistrationSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        createdAt: new Date().toISOString()
      };
      
      setUserData(newUser);
      setCurrentStep('profile');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error - in real app, show error message
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegistration = async (provider) => {
    setLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const socialUser = {
        id: Date.now(),
        fullName: provider === 'google' ? 'John Doe' : 'Jane Smith',
        email: provider === 'google' ? 'john@gmail.com' : 'jane@facebook.com',
        provider: provider,
        createdAt: new Date().toISOString()
      };
      
      setUserData(socialUser);
      setCurrentStep('profile');
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = async (profileData) => {
    setLoading(true);
    
    try {
      // Simulate profile completion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user data with profile info
      setUserData(prev => ({
        ...prev,
        ...profileData,
        profileCompleted: true
      }));
      
      setCurrentStep('welcome');
    } catch (error) {
      console.error('Profile completion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSkip = () => {
    setCurrentStep('welcome');
  };

  const handleWelcomeComplete = () => {
    // Store user data in localStorage (in real app, this would be handled by auth context)
    localStorage.setItem('currentUser', JSON.stringify(userData));
    navigate('/user-profile');
  };

  if (currentStep === 'welcome') {
    return (
      <WelcomeAnimation
        userName={userData?.fullName}
        onComplete={handleWelcomeComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Background Card */}
          <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
            {currentStep === 'registration' ? (
              <>
                {/* Registration Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-text-primary mb-2">
                    Create Your Account
                  </h1>
                  <p className="text-text-secondary">
                    Join SocialConnect and start connecting with friends
                  </p>
                </div>

                {/* Registration Form */}
                <RegistrationForm
                  onSubmit={handleRegistrationSubmit}
                  loading={loading}
                />

                {/* Social Registration */}
                <div className="mt-8">
                  <SocialRegistration
                    onSocialRegister={handleSocialRegistration}
                    loading={loading}
                  />
                </div>
              </>
            ) : (
              /* Profile Setup */
              <ProfileSetup
                onComplete={handleProfileComplete}
                onSkip={handleProfileSkip}
                loading={loading}
              />
            )}
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6">
            <p className="text-sm text-text-secondary">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {loading && currentStep === 'registration' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000">
          <div className="bg-card rounded-xl p-6 shadow-elevated">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-text-primary font-medium">
                Creating your account...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;