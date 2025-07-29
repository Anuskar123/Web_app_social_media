import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProfileSetup = ({ onComplete, onSkip, loading }) => {
  const [profileData, setProfileData] = useState({
    profilePhoto: null,
    bio: '',
    interests: []
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const interestOptions = [
    'Technology', 'Travel', 'Photography', 'Music', 'Sports', 'Art',
    'Cooking', 'Reading', 'Gaming', 'Fitness', 'Movies', 'Fashion'
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({ ...prev, profilePhoto: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleBioChange = (e) => {
    setProfileData(prev => ({ ...prev, bio: e.target.value }));
  };

  const handleComplete = () => {
    onComplete(profileData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Complete Your Profile
        </h3>
        <p className="text-text-secondary">
          Add some details to personalize your experience
        </p>
      </div>

      {/* Profile Photo Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-4 border-white shadow-lg">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-text-secondary" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-primary/90 transition-colors duration-200">
            <Icon name="Camera" size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-sm text-text-secondary">Upload a profile photo</p>
      </div>

      {/* Bio */}
      <Input
        label="Bio (Optional)"
        type="text"
        placeholder="Tell us a bit about yourself..."
        value={profileData.bio}
        onChange={handleBioChange}
        description="Share what makes you unique"
        maxLength={150}
        className="w-full"
      />

      {/* Interests */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          Interests (Optional)
        </label>
        <p className="text-sm text-text-secondary">
          Select topics you're interested in
        </p>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                profileData.interests.includes(interest)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-border'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onSkip}
          disabled={loading}
          className="flex-1"
        >
          Skip for Now
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={handleComplete}
          loading={loading}
          disabled={loading}
          className="flex-1"
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;