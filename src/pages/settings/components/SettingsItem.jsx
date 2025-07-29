import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsItem = ({ 
  icon, 
  title, 
  description, 
  action, 
  onClick, 
  variant = 'default',
  showArrow = true 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'text-error hover:bg-error/10';
      case 'warning':
        return 'text-warning hover:bg-warning/10';
      default:
        return 'text-text-primary hover:bg-muted';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 cursor-pointer ${getVariantStyles()}`}
    >
      <div className="flex items-center space-x-3 flex-1">
        {icon && (
          <div className="w-8 h-8 flex items-center justify-center">
            <Icon name={icon} size={18} />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          {description && (
            <p className="text-xs text-text-secondary mt-1">{description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {action && (
          <span className="text-xs text-text-secondary">{action}</span>
        )}
        {showArrow && (
          <Icon name="ChevronRight" size={16} className="text-text-secondary" />
        )}
      </div>
    </div>
  );
};

export default SettingsItem;