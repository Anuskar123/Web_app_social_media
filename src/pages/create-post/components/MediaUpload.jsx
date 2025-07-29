import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaUpload = ({ attachments, onAttachmentsChange }) => {
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileUpload = (files, type) => {
    Array.from(files).forEach((file, index) => {
      const fileId = `${type}_${Date.now()}_${index}`;
      const reader = new FileReader();
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      reader.onload = (e) => {
        const newAttachment = {
          id: fileId,
          type: type,
          file: file,
          url: e.target.result,
          name: file.name,
          size: file.size,
          progress: 100
        };
        
        onAttachmentsChange(prev => [...prev, newAttachment]);
        
        // Simulate compression for images
        if (type === 'image') {
          setTimeout(() => {
            setUploadProgress(prev => {
              const updated = { ...prev };
              delete updated[fileId];
              return updated;
            });
          }, 1500);
        }
      };
      
      reader.readAsDataURL(file);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
      }, 200);
    });
  };

  const removeAttachment = (id) => {
    onAttachmentsChange(prev => prev.filter(item => item.id !== id));
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Media Options */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          iconName="Image"
          iconPosition="left"
          className="text-primary hover:bg-primary/10"
        >
          Photo
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => videoInputRef.current?.click()}
          iconName="Video"
          iconPosition="left"
          className="text-secondary hover:bg-secondary/10"
        >
          Video
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="MapPin"
          iconPosition="left"
          className="text-accent hover:bg-accent/10"
        >
          Location
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Smile"
          iconPosition="left"
          className="text-warning hover:bg-warning/10"
        >
          Emoji
        </Button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files, 'image')}
      />
      
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files, 'video')}
      />

      {/* Attachment Previews */}
      {attachments.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border">
                {attachment.type === 'image' ? (
                  <Image
                    src={attachment.url}
                    alt={attachment.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-muted">
                    <Icon name="Video" size={32} className="text-text-secondary mb-2" />
                    <span className="text-xs text-text-secondary text-center px-2 truncate">
                      {attachment.name}
                    </span>
                  </div>
                )}
                
                {/* Upload Progress */}
                {uploadProgress[attachment.id] !== undefined && uploadProgress[attachment.id] < 100 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-xs">{Math.round(uploadProgress[attachment.id])}%</span>
                    </div>
                  </div>
                )}
                
                {/* Compression Indicator */}
                {attachment.type === 'image' && uploadProgress[attachment.id] === undefined && (
                  <div className="absolute top-2 left-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full flex items-center">
                    <Icon name="Check" size={12} className="mr-1" />
                    Compressed
                  </div>
                )}
              </div>
              
              {/* Remove Button */}
              <button
                onClick={() => removeAttachment(attachment.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
              >
                <Icon name="X" size={14} />
              </button>
              
              {/* File Info */}
              <div className="mt-1 text-xs text-text-secondary">
                <div className="truncate">{attachment.name}</div>
                <div>{formatFileSize(attachment.size)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;