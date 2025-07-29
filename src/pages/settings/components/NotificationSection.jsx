import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const NotificationSection = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  
  // Specific notification types
  const [likesComments, setLikesComments] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);
  const [messages, setMessages] = useState(true);
  const [posts, setPosts] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [groupActivity, setGroupActivity] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const notificationTypes = [
    {
      title: "Likes & Comments",
      description: "When someone likes or comments on your posts",
      checked: likesComments,
      onChange: setLikesComments
    },
    {
      title: "Friend Requests",
      description: "When someone sends you a friend request",
      checked: friendRequests,
      onChange: setFriendRequests
    },
    {
      title: "Messages",
      description: "When you receive new messages",
      checked: messages,
      onChange: setMessages
    },
    {
      title: "New Posts",
      description: "When friends share new posts",
      checked: posts,
      onChange: setPosts
    },
    {
      title: "Mentions",
      description: "When someone mentions you in a post",
      checked: mentions,
      onChange: setMentions
    },
    {
      title: "Group Activity",
      description: "Updates from groups you\'ve joined",
      checked: groupActivity,
      onChange: setGroupActivity
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Notification Channels */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">Notification Channels</h4>
        
        <ToggleSwitch
          label="Push Notifications"
          description="Receive notifications on your device"
          checked={pushNotifications}
          onChange={setPushNotifications}
        />
        
        <ToggleSwitch
          label="Email Notifications"
          description="Receive notifications via email"
          checked={emailNotifications}
          onChange={setEmailNotifications}
        />
        
        <ToggleSwitch
          label="In-App Notifications"
          description="Show notifications within the app"
          checked={inAppNotifications}
          onChange={setInAppNotifications}
        />
      </div>

      {/* Notification Types */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">Notification Types</h4>
        
        {notificationTypes.map((notification, index) => (
          <ToggleSwitch
            key={index}
            label={notification.title}
            description={notification.description}
            checked={notification.checked}
            onChange={notification.onChange}
            disabled={!pushNotifications && !emailNotifications && !inAppNotifications}
          />
        ))}
      </div>

      {/* Marketing Communications */}
      <div className="space-y-4 border-t border-border pt-4">
        <h4 className="text-sm font-medium text-text-primary">Marketing Communications</h4>
        
        <ToggleSwitch
          label="Marketing Emails"
          description="Receive updates about new features and promotions"
          checked={marketingEmails}
          onChange={setMarketingEmails}
        />
      </div>

      {/* Notification Summary */}
      <div className="bg-muted rounded-lg p-4">
        <h5 className="text-sm font-medium text-text-primary mb-2">Notification Summary</h5>
        <div className="space-y-1 text-xs text-text-secondary">
          <p>• Active channels: {[pushNotifications && 'Push', emailNotifications && 'Email', inAppNotifications && 'In-App'].filter(Boolean).join(', ') || 'None'}</p>
          <p>• Active types: {notificationTypes.filter(n => n.checked).length} of {notificationTypes.length}</p>
          <p>• Marketing: {marketingEmails ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;