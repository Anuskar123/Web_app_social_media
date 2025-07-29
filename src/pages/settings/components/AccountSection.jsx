import React, { useState } from 'react';
import SettingsItem from './SettingsItem';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AccountSection = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("john.doe@example.com");
  const [newEmail, setNewEmail] = useState("");

  const handleEmailEdit = () => {
    if (isEditingEmail) {
      if (newEmail.trim()) {
        setEmail(newEmail);
        setNewEmail("");
      }
      setIsEditingEmail(false);
    } else {
      setNewEmail(email);
      setIsEditingEmail(true);
    }
  };

  const handleDataDownload = () => {
    // Mock data download functionality
    const mockData = {
      profile: { name: "John Doe", email: email },
      posts: ["Post 1", "Post 2"],
      messages: ["Message 1", "Message 2"],
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(mockData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'socialconnect-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Email Management */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Email Address</h4>
        {isEditingEmail ? (
          <div className="space-y-3">
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              className="w-full"
            />
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleEmailEdit}
                disabled={!newEmail.trim()}
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditingEmail(false);
                  setNewEmail("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-text-primary">{email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEmailEdit}
              iconName="Edit2"
            >
              Edit
            </Button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <SettingsItem
          icon="User"
          title="Edit Profile"
          description="Update your profile information and photo"
          onClick={() => window.location.href = '/user-profile'}
        />
        
        <SettingsItem
          icon="Key"
          title="Change Password"
          description="Update your account password"
          onClick={() => {}}
        />
        
        <SettingsItem
          icon="Download"
          title="Download Your Data"
          description="Export all your account data"
          onClick={handleDataDownload}
        />
        
        <SettingsItem
          icon="UserX"
          title="Deactivate Account"
          description="Temporarily disable your account"
          variant="warning"
          onClick={() => {}}
        />
        
        <SettingsItem
          icon="Trash2"
          title="Delete Account"
          description="Permanently delete your account and all data"
          variant="danger"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default AccountSection;