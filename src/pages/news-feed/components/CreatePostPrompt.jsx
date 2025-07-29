import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from 'components/AppImage';

const CreatePostPrompt = () => {
  return (
    <Link to="/create-post" className="flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
      <AppImage
        src="/assets/images/no_image.png"
        alt="Your avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-500 hover:bg-gray-200 transition-colors">
        What's on your mind?
      </div>
    </Link>
  );
};

export default CreatePostPrompt;
