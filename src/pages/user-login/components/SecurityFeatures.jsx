import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Login',
      description: 'Your data is protected with industry-standard encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your personal information with third parties'
    },
    {
      icon: 'Eye',
      title: 'Account Safety',
      description: 'Monitor login attempts and secure your account activity'
    }
  ];

  return (
    <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
        Your Security Matters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name={feature.icon} size={20} className="text-primary" />
            </div>
            <h4 className="text-sm font-medium text-text-primary mb-1">
              {feature.title}
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityFeatures;