import React from 'react';

const SearchTabs = ({ activeTab, onTabChange, resultCounts }) => {
  const tabs = [
    { id: 'all', label: 'All', count: resultCounts.all },
    { id: 'users', label: 'People', count: resultCounts.users },
    { id: 'posts', label: 'Posts', count: resultCounts.posts },
    { id: 'hashtags', label: 'Tags', count: resultCounts.hashtags },
    { id: 'places', label: 'Places', count: resultCounts.places }
  ];

  return (
    <div className="px-4 border-b border-gray-200">
      <div className="flex space-x-0 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchTabs;
