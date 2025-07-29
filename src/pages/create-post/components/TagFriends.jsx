import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TagFriends = ({ taggedFriends, onTaggedFriendsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  const mockFriends = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarah.j",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike Chen",
      username: "@mike.chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Davis",
      username: "@emily.d",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      username: "@alex.rod",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Jessica Wilson",
      username: "@jess.w",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(friend => !taggedFriends.some(tagged => tagged.id === friend.id));

  const handleTagFriend = (friend) => {
    onTaggedFriendsChange(prev => [...prev, friend]);
    setSearchQuery('');
  };

  const handleRemoveTag = (friendId) => {
    onTaggedFriendsChange(prev => prev.filter(friend => friend.id !== friendId));
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="space-y-3">
      {/* Tag Friends Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-border rounded-lg transition-colors duration-200 text-sm font-medium text-text-primary"
      >
        <Icon name="UserPlus" size={16} />
        <span>Tag Friends</span>
        {taggedFriends.length > 0 && (
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            {taggedFriends.length}
          </span>
        )}
      </button>

      {/* Tagged Friends Display */}
      {taggedFriends.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {taggedFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{friend.name}</span>
              <button
                onClick={() => handleRemoveTag(friend.id)}
                className="hover:bg-primary/20 rounded-full p-1 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-surface rounded-xl shadow-elevated max-w-md mx-auto max-h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Tag Friends</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            {/* Search Input */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search friends..."
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Friends List */}
            <div className="flex-1 overflow-y-auto">
              {filteredFriends.length > 0 ? (
                <div className="p-2">
                  {filteredFriends.map((friend) => (
                    <button
                      key={friend.id}
                      onClick={() => handleTagFriend(friend)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-text-primary">{friend.name}</div>
                        <div className="text-sm text-text-secondary">{friend.username}</div>
                      </div>
                      <Icon name="Plus" size={18} className="text-primary" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-text-secondary">
                  <Icon name="Users" size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No friends found</p>
                  {searchQuery && (
                    <p className="text-sm mt-1">Try a different search term</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TagFriends;