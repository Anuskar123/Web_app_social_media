import React from 'react';
import { Link } from 'react-router-dom';
import { Hash, TrendingUp } from 'lucide-react';

const HashtagResult = ({ hashtag }) => {
  return (
    <Link to={`/hashtag/${hashtag.tag.slice(1)}`} className="flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Hash className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900">{hashtag.tag}</h3>
          {hashtag.trending && (
            <TrendingUp className="w-4 h-4 text-orange-500" />
          )}
        </div>
        <p className="text-sm text-gray-500">{hashtag.posts}</p>
      </div>
    </Link>
  );
};

export default HashtagResult;
