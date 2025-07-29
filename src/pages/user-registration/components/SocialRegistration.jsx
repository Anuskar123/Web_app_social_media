import React from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = ({ onSocialRegister, loading }) => {
  const socialOptions = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  const handleSocialClick = (provider) => {
    onSocialRegister(provider);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            size="lg"
            onClick={() => handleSocialClick(option.id)}
            disabled={loading}
            className={`${option.bgColor} ${option.textColor} ${option.borderColor} hover:opacity-90 transition-opacity duration-200`}
            iconName={option.icon}
            iconPosition="left"
            iconSize={20}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialRegistration;