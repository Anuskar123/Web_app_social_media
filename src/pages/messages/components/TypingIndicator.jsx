import React from 'react';
import Image from '../../../components/AppImage';

const TypingIndicator = ({ users }) => {
  if (!users || users.length === 0) return null;

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0].name} is typing...`;
    } else if (users.length === 2) {
      return `${users[0].name} and ${users[1].name} are typing...`;
    } else {
      return `${users[0].name} and ${users.length - 1} others are typing...`;
    }
  };

  return (
    <div className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary">
      <div className="flex -space-x-1">
        {users.slice(0, 3).map((user, index) => (
          <div key={user.id} className="w-6 h-6 rounded-full overflow-hidden border-2 border-surface">
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-1">
        <span>{getTypingText()}</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-text-secondary rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;