import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostPreview = ({ content, attachments, taggedFriends, privacy, onClose, onEdit }) => {
  const currentUser = {
    name: "John Doe",
    username: "@john.doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const privacyIcons = {
    public: 'Globe',
    friends: 'Users',
    custom: 'Settings'
  };

  const formatContent = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Preview Post</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="bg-card border border-border rounded-xl p-4">
            {/* Post Header */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-text-primary">{currentUser.name}</h3>
                  <span className="text-text-secondary text-sm">{currentUser.username}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-text-secondary text-sm">Just now</span>
                  <Icon name={privacyIcons[privacy]} size={14} className="text-text-secondary" />
                </div>
              </div>
            </div>

            {/* Post Content */}
            {content && (
              <div className="mb-4">
                <p className="text-text-primary text-lg leading-relaxed whitespace-pre-wrap">
                  {formatContent(content)}
                </p>
              </div>
            )}

            {/* Tagged Friends */}
            {taggedFriends.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-text-secondary text-sm">
                  <Icon name="Users" size={16} />
                  <span>with</span>
                  <div className="flex flex-wrap gap-1">
                    {taggedFriends.map((friend, index) => (
                      <span key={friend.id} className="text-primary font-medium">
                        {friend.name}
                        {index < taggedFriends.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Media Attachments */}
            {attachments.length > 0 && (
              <div className="mb-4">
                {attachments.length === 1 ? (
                  <div className="rounded-lg overflow-hidden">
                    {attachments[0].type === 'image' ? (
                      <Image
                        src={attachments[0].url}
                        alt="Post attachment"
                        className="w-full max-h-96 object-cover"
                      />
                    ) : (
                      <div className="bg-muted aspect-video flex items-center justify-center">
                        <div className="text-center">
                          <Icon name="Play" size={48} className="text-text-secondary mb-2" />
                          <p className="text-text-secondary">{attachments[0].name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`grid gap-2 ${
                    attachments.length === 2 ? 'grid-cols-2' : 
                    attachments.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
                  }`}>
                    {attachments.slice(0, 4).map((attachment, index) => (
                      <div key={attachment.id} className="relative aspect-square rounded-lg overflow-hidden">
                        {attachment.type === 'image' ? (
                          <Image
                            src={attachment.url}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Icon name="Video" size={24} className="text-text-secondary" />
                          </div>
                        )}
                        
                        {/* More indicator for 4+ attachments */}
                        {index === 3 && attachments.length > 4 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              +{attachments.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="Heart" size={20} />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="MessageCircle" size={20} />
                  <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="Share" size={20} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <button className="text-text-secondary hover:text-text-primary transition-colors duration-200">
                <Icon name="Bookmark" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;