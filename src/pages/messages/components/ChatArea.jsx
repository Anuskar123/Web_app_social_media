import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatArea = ({ conversation, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😀', '😂', '😍', '🥰', '😊', '👍', '❤️', '🔥', '💯', '🎉', '👏', '🙌'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedImage) {
      const messageData = {
        text: newMessage.trim(),
        image: selectedImage,
        timestamp: new Date(),
        type: selectedImage ? 'image' : 'text'
      };
      
      onSendMessage(messageData);
      setNewMessage('');
      setSelectedImage(null);
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(message => {
      const dateKey = new Date(message.timestamp).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
            <Icon name="MessageCircle" size={40} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">Select a conversation</h3>
          <p className="text-text-secondary">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b border-border bg-surface">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          iconName="ArrowLeft"
          className="lg:hidden mr-2"
        />
        
        <div className="relative flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={conversation.avatar}
              alt={conversation.name}
              className="w-full h-full object-cover"
            />
          </div>
          {conversation.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-text-primary truncate">{conversation.name}</h2>
          <p className="text-sm text-text-secondary">
            {conversation.isOnline ? 'Active now' : `Last seen ${formatMessageTime(conversation.lastSeen)}`}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Phone" />
          <Button variant="ghost" size="sm" iconName="Video" />
          <Button variant="ghost" size="sm" iconName="MoreVertical" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-muted px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-text-secondary">
                  {formatMessageDate(new Date(dateKey))}
                </span>
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div className={`max-w-xs lg:max-w-md ${message.sender === 'You' ? 'order-2' : 'order-1'}`}>
                  {message.sender !== 'You' && (
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <Image
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-text-secondary">{message.sender}</span>
                    </div>
                  )}
                  
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'You' ?'bg-primary text-primary-foreground' :'bg-muted text-text-primary'
                    }`}
                  >
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
                    
                    {message.text && (
                      <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${
                        message.sender === 'You' ? 'text-primary-foreground/70' : 'text-text-secondary'
                      }`}>
                        {formatMessageTime(message.timestamp)}
                      </span>
                      
                      {message.sender === 'You' && (
                        <div className="flex items-center ml-2">
                          <Icon 
                            name={message.status === 'read' ? 'CheckCheck' : 'Check'} 
                            size={14} 
                            className={message.status === 'read' ? 'text-primary-foreground' : 'text-primary-foreground/70'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="flex items-center space-x-2 bg-muted rounded-2xl px-4 py-2">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-surface">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-border">
              <Image
                src={selectedImage}
                alt="Selected image"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedImage(null)}
              iconName="X"
              className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full"
            />
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary"
              rows="1"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              iconName="Smile"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            iconName="Paperclip"
            className="text-text-secondary hover:text-primary"
          />

          <Button
            variant="default"
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && !selectedImage}
            iconName="Send"
            className="rounded-full"
          />
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4 bg-popover border border-border rounded-lg shadow-elevated p-3 z-50">
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors duration-200"
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

export default ChatArea;