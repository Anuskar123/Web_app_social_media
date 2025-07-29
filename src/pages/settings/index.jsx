import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SettingsSection from './components/SettingsSection';
import SearchBar from './components/SearchBar';
import AccountSection from './components/AccountSection';
import PrivacySection from './components/PrivacySection';
import NotificationSection from './components/NotificationSection';
import SecuritySection from './components/SecuritySection';

const Settings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const settingsSections = [
    {
      id: 'account',
      title: 'Account',
      icon: 'User',
      component: AccountSection,
      keywords: ['account', 'email', 'profile', 'password', 'deactivate', 'delete', 'download', 'data']
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: 'Shield',
      component: PrivacySection,
      keywords: ['privacy', 'visibility', 'profile', 'posts', 'friends', 'search', 'online', 'tagging']
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
      component: NotificationSection,
      keywords: ['notifications', 'push', 'email', 'alerts', 'messages', 'likes', 'comments', 'mentions']
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'Lock',
      component: SecuritySection,
      keywords: ['security', 'two-factor', '2fa', 'password', 'sessions', 'login', 'authentication']
    }
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSections(settingsSections);
    } else {
      const filtered = settingsSections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.keywords.some(keyword =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredSections(filtered);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const showSaveNotification = () => {
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-primary" />
            </Link>
            <h1 className="text-xl font-semibold text-text-primary">Settings</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              className="text-text-secondary hover:text-text-primary"
            >
              Help
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 lg:pb-8 lg:pl-64">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search settings..."
          />

          {/* Settings Sections */}
          <div className="space-y-4">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => {
                const SectionComponent = section.component;
                return (
                  <SettingsSection
                    key={section.id}
                    title={section.title}
                    icon={section.icon}
                    defaultExpanded={filteredSections.length === 1}
                  >
                    <SectionComponent onSave={showSaveNotification} />
                  </SettingsSection>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No settings found</h3>
                <p className="text-text-secondary">
                  Try searching for something else or browse all settings.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {searchQuery === '' && (
            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/user-profile"
                  className="flex items-center space-x-3 p-4 bg-muted rounded-lg hover:bg-border transition-colors duration-200"
                >
                  <Icon name="User" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Edit Profile</p>
                    <p className="text-xs text-text-secondary">Update your profile information</p>
                  </div>
                </Link>
                
                <button
                  onClick={showSaveNotification}
                  className="flex items-center space-x-3 p-4 bg-muted rounded-lg hover:bg-border transition-colors duration-200"
                >
                  <Icon name="Download" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Export Data</p>
                    <p className="text-xs text-text-secondary">Download your account data</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
                <a href="#" className="hover:text-text-primary transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-text-primary transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-text-primary transition-colors duration-200">Help Center</a>
              </div>
              <p className="text-xs text-text-secondary">
                © {new Date().getFullYear()} SocialConnect. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>

      {/* Save Confirmation Toast */}
      {showSaveConfirmation && (
        <div className="fixed bottom-4 right-4 z-1000 animate-slide-up">
          <div className="bg-success text-success-foreground px-4 py-3 rounded-lg shadow-elevated flex items-center space-x-3">
            <Icon name="Check" size={20} />
            <span className="text-sm font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;