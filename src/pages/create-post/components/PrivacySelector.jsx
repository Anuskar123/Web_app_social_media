import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PrivacySelector = ({ selectedPrivacy, onPrivacyChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const privacyOptions = [
    {
      value: 'public',
      label: 'Public',
      description: 'Anyone can see this post',
      icon: 'Globe'
    },
    {
      value: 'friends',
      label: 'Friends',
      description: 'Only your friends can see this post',
      icon: 'Users'
    },
    {
      value: 'custom',
      label: 'Custom',
      description: 'Choose specific people',
      icon: 'Settings'
    }
  ];

  const selectedOption = privacyOptions.find(option => option.value === selectedPrivacy);

  const handleSelect = (option) => {
    onPrivacyChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-border rounded-lg transition-colors duration-200 text-sm font-medium text-text-primary"
      >
        <Icon name={selectedOption.icon} size={16} />
        <span>{selectedOption.label}</span>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated z-20">
            <div className="py-2">
              {privacyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`w-full flex items-start space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors duration-200 ${
                    selectedPrivacy === option.value ? 'bg-primary/10 text-primary' : 'text-text-primary'
                  }`}
                >
                  <Icon 
                    name={option.icon} 
                    size={18} 
                    className={selectedPrivacy === option.value ? 'text-primary' : 'text-text-secondary'} 
                  />
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-text-secondary mt-1">{option.description}</div>
                  </div>
                  {selectedPrivacy === option.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PrivacySelector;