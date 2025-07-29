import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isOwn, senderAvatar, senderName, onReact, onReply }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleReaction = (emoji) => {
    onReact(message.id, emoji);
    setShowReactions(false);
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Icon name="Clock" size={12} className="text-primary-foreground/70" />;
      case 'sent':
        return <Icon name="Check" size={12} className="text-primary-foreground/70" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={12} className="text-primary-foreground/70" />;
      case 'read':
        return <Icon name="CheckCheck" size={12} className="text-primary-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 group`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'} relative`}>
        {/* Sender Info (for group chats) */}
        {!isOwn && senderName && (
          <div className="flex items-center mb-1">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              <Image
                src={senderAvatar}
                alt={senderName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-text-secondary">{senderName}</span>
          </div>
        )}

        {/* Message Actions */}
        <div className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1 pr-2 pl-2`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReactions(!showReactions)}
            iconName="Smile"
            className="w-6 h-6 text-text-secondary hover:text-primary bg-surface border border-border rounded-full shadow-sm"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply(message)}
            iconName="Reply"
            className="w-6 h-6 text-text-secondary hover:text-primary bg-surface border border-border rounded-full shadow-sm"
          />
        </div>

        {/* Reply Context */}
        {message.replyTo && (
          <div className={`mb-2 p-2 rounded-lg border-l-4 ${
            isOwn 
              ? 'bg-primary/10 border-primary' :'bg-muted border-text-secondary'
          }`}>
            <p className="text-xs font-medium text-text-secondary mb-1">
              Replying to {message.replyTo.sender}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {message.replyTo.text || 'Image'}
            </p>
          </div>
        )}

        {/* Message Content */}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwn
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-text-primary'
          }`}
        >
          {/* Image Content */}
          {message.type === 'image' && message.image && (
            <div className="mb-2 rounded-lg overflow-hidden">
              <Image
                src={message.image}
                alt="Shared image"
                className="w-full h-auto max-w-xs cursor-pointer hover:opacity-90 transition-opacity duration-200"
                onClick={() => window.open(message.image, '_blank')}
              />
            </div>
          )}

          {/* File Content */}
          {message.type === 'file' && message.file && (
            <div className="flex items-center space-x-3 p-2 bg-black/10 rounded-lg mb-2">
              <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center">
                <Icon name="File" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.file.name}</p>
                <p className="text-xs opacity-70">{message.file.size}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                className="text-current hover:bg-black/10"
              />
            </div>
          )}

          {/* Text Content */}
          {message.text && (
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          )}

          {/* Message Footer */}
          <div className="flex items-center justify-between mt-1">
            <span className={`text-xs ${
              isOwn ? 'text-primary-foreground/70' : 'text-text-secondary'
            }`}>
              {formatTime(message.timestamp)}
            </span>
            
            {isOwn && (
              <div className="flex items-center ml-2">
                {getStatusIcon()}
              </div>
            )}
          </div>
        </div>

        {/* Message Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {message.reactions.map((reaction, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-surface border border-border rounded-full px-2 py-1 text-xs cursor-pointer hover:bg-muted transition-colors duration-200"
                onClick={() => handleReaction(reaction.emoji)}
              >
                <span>{reaction.emoji}</span>
                <span className="text-text-secondary">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Reaction Picker */}
        {showReactions && (
          <div className={`absolute top-full mt-2 ${isOwn ? 'right-0' : 'left-0'} bg-popover border border-border rounded-lg shadow-elevated p-2 z-50`}>
            <div className="flex space-x-1">
              {reactions.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleReaction(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors duration-200 text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;