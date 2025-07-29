import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileTabs = ({ activeTab, onTabChange, postCount, photoCount, videoCount }) => {
  const tabs = [
    { id: 'posts', label: 'Posts', icon: 'FileText', count: postCount },
    { id: 'photos', label: 'Photos', icon: 'Image', count: photoCount },
    { id: 'videos', label: 'Videos', icon: 'Video', count: videoCount },
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'friends', label: 'Friends', icon: 'Users' },
  ];

  return (
    <div className="bg-surface border-b border-border sticky top-16 z-50">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-primary border-primary' :'text-text-secondary border-transparent hover:text-text-primary hover:border-border'
            }`}
          >
            <Icon name={tab.icon} size={18} />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="text-xs bg-muted text-text-secondary px-2 py-1 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;