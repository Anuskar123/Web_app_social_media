import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import SettingsItem from './SettingsItem';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecuritySection = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [showActiveSessions, setShowActiveSessions] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "Active now",
      current: true
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, NY",
      lastActive: "2 hours ago",
      current: false
    },
    {
      id: 3,
      device: "Chrome on Android",
      location: "Boston, MA",
      lastActive: "1 day ago",
      current: false
    }
  ];

  const handleLogoutSession = (sessionId) => {
    // Mock logout functionality
    console.log(`Logging out session: ${sessionId}`);
  };

  const handleLogoutAllSessions = () => {
    // Mock logout all functionality
    console.log('Logging out all sessions except current');
  };

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="space-y-4">
        <ToggleSwitch
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          checked={twoFactorAuth}
          onChange={setTwoFactorAuth}
        />
        
        <ToggleSwitch
          label="Login Alerts"
          description="Get notified when someone logs into your account"
          checked={loginAlerts}
          onChange={setLoginAlerts}
        />
      </div>

      {/* Password Security */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Password Security</h4>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-primary">Password Strength</span>
            <span className="text-xs text-success font-medium">Strong</span>
          </div>
          
          <div className="w-full bg-border rounded-full h-2 mb-3">
            <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          
          <div className="space-y-1 text-xs text-text-secondary">
            <p>✓ At least 8 characters</p>
            <p>✓ Contains uppercase and lowercase letters</p>
            <p>✓ Contains numbers</p>
            <p>✓ Contains special characters</p>
          </div>
        </div>
        
        <SettingsItem
          icon="Key"
          title="Change Password"
          description="Update your account password"
          onClick={() => {}}
        />
      </div>

      {/* Active Sessions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-text-primary">Active Sessions</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActiveSessions(!showActiveSessions)}
            iconName={showActiveSessions ? "ChevronUp" : "ChevronDown"}
          >
            {showActiveSessions ? 'Hide' : 'Show'}
          </Button>
        </div>
        
        {showActiveSessions && (
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="bg-muted rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Monitor" size={16} className="text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">
                        {session.device}
                      </span>
                      {session.current && (
                        <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary mb-1">
                      <Icon name="MapPin" size={12} className="inline mr-1" />
                      {session.location}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {session.lastActive}
                    </p>
                  </div>
                  
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLogoutSession(session.id)}
                      iconName="LogOut"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogoutAllSessions}
              iconName="LogOut"
              className="w-full"
            >
              Logout All Other Sessions
            </Button>
          </div>
        )}
      </div>

      {/* Security Recommendations */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-warning mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-1">Security Recommendations</h5>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Enable two-factor authentication for better security</li>
              <li>• Review and remove unused active sessions regularly</li>
              <li>• Use a strong, unique password for your account</li>
              <li>• Keep your recovery email up to date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;