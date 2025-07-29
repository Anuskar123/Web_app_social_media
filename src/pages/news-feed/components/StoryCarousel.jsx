import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from 'components/AppImage';

const StoryCarousel = () => {
  const stories = [
    {
      id: 'my-story',
      user: { name: 'Your Story', avatar: '/assets/images/no_image.png' },
      isMyStory: true,
      hasStory: false
    },
    {
      id: 1,
      user: { name: 'John Doe', avatar: '/assets/images/no_image.png' },
      hasStory: true,
      viewed: false
    },
    {
      id: 2,
      user: { name: 'Sarah', avatar: '/assets/images/no_image.png' },
      hasStory: true,
      viewed: true
    },
    {
      id: 3,
      user: { name: 'Mike Chen', avatar: '/assets/images/no_image.png' },
      hasStory: true,
      viewed: false
    },
    {
      id: 4,
      user: { name: 'Emma Wilson', avatar: '/assets/images/no_image.png' },
      hasStory: true,
      viewed: true
    },
    {
      id: 5,
      user: { name: 'David Kim', avatar: '/assets/images/no_image.png' },
      hasStory: true,
      viewed: false
    }
  ];

  return (
    <div className="p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            {story.isMyStory ? (
              <Link to="/create-story" className="flex flex-col items-center space-y-1">
                <div className="relative">
                  <AppImage
                    src={story.user.avatar}
                    alt={story.user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs text-gray-600 text-center max-w-16 truncate">
                  {story.user.name}
                </span>
              </Link>
            ) : (
              <Link to={`/story/${story.id}`} className="flex flex-col items-center space-y-1">
                <div className="relative">
                  <AppImage
                    src={story.user.avatar}
                    alt={story.user.name}
                    className={`w-16 h-16 rounded-full object-cover border-3 ${
                      story.viewed 
                        ? 'border-gray-300' 
                        : 'border-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 border-blue-500'
                    }`}
                  />
                  {!story.viewed && (
                    <div className="absolute inset-0 rounded-full border-3 border-transparent bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-white"></div>
                      <AppImage
                        src={story.user.avatar}
                        alt={story.user.name}
                        className="absolute inset-1 w-14 h-14 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-600 text-center max-w-16 truncate">
                  {story.user.name}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryCarousel;
