import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, isOwnProfile, onEditProfile, onFriendAction }) => {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const handlePrimaryAction = () => {
    if (isOwnProfile) {
      onEditProfile();
    } else {
      onFriendAction(user.friendStatus === 'friends' ? 'unfriend' : 'add');
    }
  };

  const getPrimaryButtonText = () => {
    if (isOwnProfile) return 'Edit Profile';
    switch (user.friendStatus) {
      case 'friends': return 'Friends';
      case 'pending': return 'Pending';
      case 'received': return 'Accept';
      default: return 'Add Friend';
    }
  };

  const getPrimaryButtonVariant = () => {
    if (isOwnProfile) return 'outline';
    return user.friendStatus === 'friends' ? 'outline' : 'default';
  };

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-48 md:h-64 bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
        <Image
          src={user.coverPhoto}
          alt="Cover photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Profile Content */}
      <div className="relative px-4 pb-4">
        {/* Profile Picture */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            <div className="relative mb-4 md:mb-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface overflow-hidden bg-surface mx-auto md:mx-0">
                <Image
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {user.isOnline && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-success border-2 border-surface rounded-full"></div>
              )}
            </div>

            {/* User Info */}
            <div className="text-center md:text-left md:pb-4">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{user.name}</h1>
                {user.isVerified && (
                  <Icon name="BadgeCheck" size={24} className="text-primary" />
                )}
              </div>
              <p className="text-text-secondary mb-3 max-w-md">{user.bio}</p>
              
              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start space-x-6 text-sm">
                <div className="text-center">
                  <span className="font-semibold text-text-primary block">{user.stats.posts.toLocaleString()}</span>
                  <span className="text-text-secondary">Posts</span>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-text-primary block">{user.stats.friends.toLocaleString()}</span>
                  <span className="text-text-secondary">Friends</span>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-text-primary block">{user.stats.followers.toLocaleString()}</span>
                  <span className="text-text-secondary">Followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center md:justify-end space-x-3 mt-4 md:mt-0 md:pb-4">
            <Button
              variant={getPrimaryButtonVariant()}
              onClick={handlePrimaryAction}
              iconName={isOwnProfile ? "Edit" : user.friendStatus === 'friends' ? "UserCheck" : "UserPlus"}
              iconPosition="left"
              className="flex-1 md:flex-none"
            >
              {getPrimaryButtonText()}
            </Button>

            {!isOwnProfile && (
              <Button
                variant="outline"
                iconName="MessageCircle"
                onClick={() => onFriendAction('message')}
              >
                Message
              </Button>
            )}

            <div className="relative">
              <Button
                variant="outline"
                iconName="MoreHorizontal"
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              />

              {showOptionsMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-200">
                  <div className="py-2">
                    {isOwnProfile ? (
                      <>
                        <button className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted w-full text-left transition-colors duration-200">
                          <Icon name="Camera" size={16} />
                          <span>Update Cover Photo</span>
                        </button>
                        <button className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted w-full text-left transition-colors duration-200">
                          <Icon name="Settings" size={16} />
                          <span>Privacy Settings</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted w-full text-left transition-colors duration-200">
                          <Icon name="Flag" size={16} />
                          <span>Report Profile</span>
                        </button>
                        <button className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted w-full text-left transition-colors duration-200">
                          <Icon name="UserX" size={16} />
                          <span>Block User</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;