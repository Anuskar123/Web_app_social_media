import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const NotificationFilters = ({ onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    unreadOnly: false,
    timeRange: 'all',
    types: []
  });

  const notificationTypes = [
    { id: 'likes', label: 'Likes & Reactions', icon: '❤️' },
    { id: 'comments', label: 'Comments', icon: '💬' },
    { id: 'follows', label: 'Follows', icon: '👥' },
    { id: 'mentions', label: 'Mentions', icon: '@' },
    { id: 'shares', label: 'Shares', icon: '🔄' },
    { id: 'birthdays', label: 'Birthdays', icon: '🎂' }
  ];

  const timeRanges = [
    { value: 'all', label: 'All time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' }
  ];

  const handleTypeToggle = (typeId) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(typeId)
        ? prev.types.filter(t => t !== typeId)
        : [...prev.types, typeId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      unreadOnly: false,
      timeRange: 'all',
      types: []
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filter Notifications
        </h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Unread Only Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Show unread only</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.unreadOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, unreadOnly: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Time Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
          <select
            value={filters.timeRange}
            onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notification Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Notification Types</label>
          <div className="space-y-2">
            {notificationTypes.map(type => (
              <label key={type.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.types.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-lg">{type.icon}</span>
                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          onClick={clearFilters}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default NotificationFilters;
