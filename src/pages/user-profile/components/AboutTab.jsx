import React from 'react';
import Icon from '../../../components/AppIcon';

const AboutTab = ({ user }) => {
  const aboutSections = [
    {
      title: 'Basic Information',
      icon: 'User',
      items: [
        { label: 'Email', value: user.email, icon: 'Mail' },
        { label: 'Phone', value: user.phone, icon: 'Phone' },
        { label: 'Birthday', value: user.birthday, icon: 'Calendar' },
        { label: 'Gender', value: user.gender, icon: 'Users' },
        { label: 'Relationship Status', value: user.relationshipStatus, icon: 'Heart' },
      ].filter(item => item.value)
    },
    {
      title: 'Work & Education',
      icon: 'Briefcase',
      items: [
        { label: 'Current Position', value: user.currentJob, icon: 'Briefcase' },
        { label: 'Company', value: user.company, icon: 'Building' },
        { label: 'Education', value: user.education, icon: 'GraduationCap' },
        { label: 'Skills', value: user.skills?.join(', '), icon: 'Award' },
      ].filter(item => item.value)
    },
    {
      title: 'Location & Contact',
      icon: 'MapPin',
      items: [
        { label: 'Current City', value: user.location, icon: 'MapPin' },
        { label: 'Hometown', value: user.hometown, icon: 'Home' },
        { label: 'Website', value: user.website, icon: 'Globe' },
        { label: 'Languages', value: user.languages?.join(', '), icon: 'MessageSquare' },
      ].filter(item => item.value)
    },
    {
      title: 'Interests & Hobbies',
      icon: 'Star',
      items: [
        { label: 'Interests', value: user.interests?.join(', '), icon: 'Star' },
        { label: 'Favorite Music', value: user.favoriteMusic, icon: 'Music' },
        { label: 'Favorite Movies', value: user.favoriteMovies, icon: 'Film' },
        { label: 'Favorite Books', value: user.favoriteBooks, icon: 'Book' },
      ].filter(item => item.value)
    }
  ];

  return (
    <div className="space-y-6">
      {aboutSections.map((section) => (
        section.items.length > 0 && (
          <div key={section.title} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name={section.icon} size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">{section.title}</h3>
            </div>
            
            <div className="space-y-3">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name={item.icon} size={16} className="text-text-secondary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-text-secondary">{item.label}:</span>
                    <p className="text-text-primary mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {/* Life Events */}
      {user.lifeEvents && user.lifeEvents.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Calendar" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Life Events</h3>
          </div>
          
          <div className="space-y-4">
            {user.lifeEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={event.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{event.title}</h4>
                  <p className="text-text-secondary text-sm mt-1">{event.description}</p>
                  <p className="text-text-secondary text-xs mt-2">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-text-secondary mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-text-secondary">
              Only information you choose to make public will be visible to other users. 
              You can update your privacy settings at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;