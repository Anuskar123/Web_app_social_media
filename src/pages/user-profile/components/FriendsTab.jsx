import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FriendsTab = ({ friends, mutualFriends, onRemoveFriend, onMessageFriend }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'mutual' && mutualFriends.includes(friend.id)) ||
      (activeFilter === 'online' && friend.isOnline);
    
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: 'all', label: 'All Friends', count: friends.length },
    { id: 'mutual', label: 'Mutual Friends', count: mutualFriends.length },
    { id: 'online', label: 'Online', count: friends.filter(f => f.isOnline).length },
  ];

  if (friends.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No friends yet</h3>
        <p className="text-text-secondary">Friends will appear here when connections are made.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-border'
              }`}
            >
              <span>{filter.label}</span>
              <span className="text-xs bg-black bg-opacity-20 px-2 py-1 rounded-full">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Friends Grid */}
      {filteredFriends.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Search" size={32} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">No friends found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <Link to={`/user-profile/${friend.id}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  {friend.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-surface rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/user-profile/${friend.id}`}
                    className="font-medium text-text-primary hover:text-primary transition-colors duration-200 block truncate"
                  >
                    {friend.name}
                  </Link>
                  
                  {mutualFriends.includes(friend.id) && (
                    <p className="text-xs text-text-secondary mt-1">
                      {friend.mutualCount} mutual friends
                    </p>
                  )}
                  
                  <p className="text-xs text-text-secondary mt-1">
                    {friend.isOnline ? 'Online now' : `Last seen ${friend.lastSeen}`}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      onClick={() => onMessageFriend(friend.id)}
                      className="flex-1"
                    >
                      Message
                    </Button>
                    
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle dropdown menu
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredFriends.length >= 20 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Friends
          </Button>
        </div>
      )}
    </div>
  );
};

export default FriendsTab;