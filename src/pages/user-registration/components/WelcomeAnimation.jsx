import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeAnimation = ({ userName, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: 'CheckCircle',
      title: 'Account Created!',
      description: `Welcome to SocialConnect, ${userName}!`
    },
    {
      icon: 'Users',
      title: 'Join the Community',
      description: 'Connect with friends and discover new content'
    },
    {
      icon: 'Heart',
      title: 'Start Sharing',
      description: 'Share your thoughts and engage with others'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(onComplete, 1500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-1000">
      <div className="text-center space-y-8 px-6">
        <motion.div
          key={currentStep}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Icon 
                name={steps[currentStep].icon} 
                size={40} 
                color="white" 
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-text-primary">
            {steps[currentStep].title}
          </h2>

          {/* Description */}
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            {steps[currentStep].description}
          </p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Loading Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="flex justify-center"
        >
          <Icon name="Loader2" size={24} className="text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;