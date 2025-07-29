import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PostTextArea from './components/PostTextArea';
import MediaUpload from './components/MediaUpload';
import PrivacySelector from './components/PrivacySelector';
import TagFriends from './components/TagFriends';
import PostPreview from './components/PostPreview';

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [privacy, setPrivacy] = useState('public');
  const [taggedFriends, setTaggedFriends] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Auto-save draft
  useEffect(() => {
    const draftData = {
      content,
      attachments: attachments.map(att => ({ ...att, file: null })), // Don't save file objects
      privacy,
      taggedFriends,
      timestamp: Date.now()
    };

    const timeoutId = setTimeout(() => {
      if (content.trim() || attachments.length > 0) {
        localStorage.setItem('post_draft', JSON.stringify(draftData));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2000);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [content, attachments, privacy, taggedFriends]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('post_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Only load if draft is less than 24 hours old
        if (Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
          setContent(draft.content || '');
          setPrivacy(draft.privacy || 'public');
          setTaggedFriends(draft.taggedFriends || []);
          // Note: attachments are not restored as file objects can't be serialized
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const isValidPost = () => {
    return content.trim().length > 0 || attachments.length > 0;
  };

  const handleCancel = () => {
    if (content.trim() || attachments.length > 0) {
      if (window.confirm('Are you sure you want to discard this post?')) {
        localStorage.removeItem('post_draft');
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const handlePost = async () => {
    if (!isValidPost()) return;

    setIsPosting(true);
    
    // Simulate posting process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft
      localStorage.removeItem('post_draft');
      
      // Show success animation
      setShowSuccessAnimation(true);
      
      // Navigate back after animation
      setTimeout(() => {
        navigate('/', { 
          state: { 
            newPost: {
              content,
              attachments,
              privacy,
              taggedFriends,
              timestamp: new Date()
            }
          }
        });
      }, 1500);
      
    } catch (error) {
      console.error('Error posting:', error);
      setIsPosting(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const clearDraft = () => {
    setContent('');
    setAttachments([]);
    setPrivacy('public');
    setTaggedFriends([]);
    localStorage.removeItem('post_draft');
  };

  if (showSuccessAnimation) {
    return (
      <div className="fixed inset-0 z-50 bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Icon name="Check" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Post Shared!</h2>
          <p className="text-text-secondary">Your post has been shared successfully</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-surface border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="text-text-secondary hover:text-text-primary"
          >
            Cancel
          </Button>
          
          <h1 className="text-lg font-semibold text-text-primary">Create Post</h1>
          
          <Button
            variant="default"
            size="sm"
            onClick={handlePost}
            disabled={!isValidPost() || isPosting}
            loading={isPosting}
            className="min-w-[60px]"
          >
            Post
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block pt-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <h1 className="text-2xl font-semibold text-text-primary">Create Post</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {isValidPost() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreview}
                  iconName="Eye"
                  iconPosition="left"
                >
                  Preview
                </Button>
              )}
              <Button
                variant="default"
                onClick={handlePost}
                disabled={!isValidPost() || isPosting}
                loading={isPosting}
                iconName="Send"
                iconPosition="left"
                className="min-w-[100px]"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:max-w-2xl lg:mx-auto px-4 lg:px-6 pb-20 lg:pb-8">
        <div className="space-y-6">
          {/* Draft Status */}
          {draftSaved && (
            <div className="flex items-center justify-between bg-success/10 text-success px-4 py-2 rounded-lg animate-fade-in">
              <div className="flex items-center space-x-2">
                <Icon name="Save" size={16} />
                <span className="text-sm font-medium">Draft saved</span>
              </div>
              <button
                onClick={clearDraft}
                className="text-xs hover:underline"
              >
                Clear
              </button>
            </div>
          )}

          {/* Text Area */}
          <PostTextArea
            content={content}
            onChange={setContent}
            placeholder="What's on your mind?"
          />

          {/* Media Upload */}
          <MediaUpload
            attachments={attachments}
            onAttachmentsChange={setAttachments}
          />

          {/* Post Options */}
          <div className="flex flex-wrap items-center gap-4">
            <PrivacySelector
              selectedPrivacy={privacy}
              onPrivacyChange={setPrivacy}
            />
            
            <TagFriends
              taggedFriends={taggedFriends}
              onTaggedFriendsChange={setTaggedFriends}
            />
          </div>

          {/* Mobile Preview Button */}
          {isValidPost() && (
            <div className="lg:hidden">
              <Button
                variant="outline"
                fullWidth
                onClick={handlePreview}
                iconName="Eye"
                iconPosition="left"
              >
                Preview Post
              </Button>
            </div>
          )}

          {/* Mobile Post Button */}
          <div className="lg:hidden">
            <Button
              variant="default"
              fullWidth
              onClick={handlePost}
              disabled={!isValidPost() || isPosting}
              loading={isPosting}
              iconName="Send"
              iconPosition="left"
              size="lg"
            >
              {isPosting ? 'Posting...' : 'Share Post'}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PostPreview
          content={content}
          attachments={attachments}
          taggedFriends={taggedFriends}
          privacy={privacy}
          onClose={() => setShowPreview(false)}
          onEdit={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default CreatePost;