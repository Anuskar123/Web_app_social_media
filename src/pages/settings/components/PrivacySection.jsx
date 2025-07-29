import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import Select from '../../../components/ui/Select';

const PrivacySection = () => {
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [postVisibility, setPostVisibility] = useState('friends');
  const [friendRequests, setFriendRequests] = useState(true);
  const [profileSearchable, setProfileSearchable] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowTagging, setAllowTagging] = useState(true);

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see' },
    { value: 'friends', label: 'Friends Only', description: 'Only your friends' },
    { value: 'private', label: 'Private', description: 'Only you' }
  ];

  const friendRequestOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'friends_of_friends', label: 'Friends of Friends' },
    { value: 'no_one', label: 'No One' }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Profile Visibility</h4>
        <Select
          options={visibilityOptions}
          value={profileVisibility}
          onChange={setProfileVisibility}
          placeholder="Select visibility"
        />
        <p className="text-xs text-text-secondary">
          Controls who can see your profile information
        </p>
      </div>

      {/* Post Visibility */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Default Post Visibility</h4>
        <Select
          options={visibilityOptions}
          value={postVisibility}
          onChange={setPostVisibility}
          placeholder="Select default visibility"
        />
        <p className="text-xs text-text-secondary">
          Default audience for your new posts
        </p>
      </div>

      {/* Privacy Toggles */}
      <div className="space-y-4">
        <ToggleSwitch
          label="Accept Friend Requests"
          description="Allow others to send you friend requests"
          checked={friendRequests}
          onChange={setFriendRequests}
        />
        
        <ToggleSwitch
          label="Profile Searchable"
          description="Allow your profile to appear in search results"
          checked={profileSearchable}
          onChange={setProfileSearchable}
        />
        
        <ToggleSwitch
          label="Show Online Status"
          description="Let friends see when you're online"
          checked={showOnlineStatus}
          onChange={setShowOnlineStatus}
        />
        
        <ToggleSwitch
          label="Allow Tagging"
          description="Let friends tag you in their posts"
          checked={allowTagging}
          onChange={setAllowTagging}
        />
      </div>

      {/* Privacy Preview */}
      <div className="bg-muted rounded-lg p-4">
        <h5 className="text-sm font-medium text-text-primary mb-2">Privacy Preview</h5>
        <div className="space-y-2 text-xs text-text-secondary">
          <p>• Profile visible to: <span className="font-medium">{visibilityOptions.find(opt => opt.value === profileVisibility)?.label}</span></p>
          <p>• Posts visible to: <span className="font-medium">{visibilityOptions.find(opt => opt.value === postVisibility)?.label}</span></p>
          <p>• Friend requests: <span className="font-medium">{friendRequests ? 'Enabled' : 'Disabled'}</span></p>
          <p>• Search visibility: <span className="font-medium">{profileSearchable ? 'Visible' : 'Hidden'}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;