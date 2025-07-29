import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from 'components/AppImage';

const UserResult = ({ user }) => {
  return (
    <Link to="/user-profile" className="flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
      <AppImage
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
          {user.verified && (
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-1">{user.username}</p>
        <p className="text-sm text-gray-600 truncate">{user.bio}</p>
        <p className="text-xs text-gray-500 mt-1">{user.followers} followers</p>
      </div>
      <button className="px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors">
        Follow
      </button>
    </Link>
  );
};

export default UserResult;
