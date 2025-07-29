import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PostTextArea = ({ content, onChange, placeholder = "What's on your mind?" }) => {
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 2000;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onChange(value);
    }
  };

  const characterCount = content.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isAtLimit = characterCount >= maxLength;

  return (
    <div className="relative">
      <div className={`border-2 rounded-xl transition-colors duration-200 ${
        isFocused ? 'border-primary' : 'border-border'
      }`}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full p-4 bg-transparent text-text-primary placeholder-text-secondary resize-none outline-none min-h-[120px] max-h-[300px] text-lg leading-relaxed"
          style={{ scrollbarWidth: 'thin' }}
        />
      </div>
      
      {/* Character Counter */}
      {characterCount > 0 && (
        <div className={`flex items-center justify-end mt-2 text-sm ${
          isAtLimit ? 'text-error' : isNearLimit ? 'text-warning' : 'text-text-secondary'
        }`}>
          <Icon 
            name={isAtLimit ? "AlertCircle" : isNearLimit ? "AlertTriangle" : "Type"} 
            size={16} 
            className="mr-1" 
          />
          <span>{characterCount}/{maxLength}</span>
        </div>
      )}
    </div>
  );
};

export default PostTextArea;