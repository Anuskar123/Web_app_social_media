import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, Filter, TrendingUp } from 'lucide-react';
import BottomNavigation from 'components/ui/BottomNavigation';
import { SearchTabs, SearchFilters, UserResult, PostResult, HashtagResult } from './components';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState({
    users: [],
    posts: [],
    hashtags: [],
    places: []
  });
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'React development',
    'JavaScript tips',
    'Sarah Johnson',
    '#photography'
  ]);

  const trendingSearches = [
    '#SocialConnect',
    'Web Development',
    '#Photography',
    'Tech News',
    '#Travel2025'
  ];

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    
    // Mock search results
    const mockResults = {
      users: [
        {
          id: 1,
          name: 'Sarah Johnson',
          username: '@sarah.j',
          avatar: '/assets/images/no_image.png',
          verified: true,
          followers: '2.5k',
          bio: 'UI/UX Designer passionate about creating beautiful experiences'
        },
        {
          id: 2,
          name: 'Mike Chen',
          username: '@mike_codes',
          avatar: '/assets/images/no_image.png',
          verified: false,
          followers: '1.2k',
          bio: 'Full-stack developer | Coffee enthusiast'
        }
      ],
      posts: [
        {
          id: 1,
          user: {
            name: 'John Doe',
            avatar: '/assets/images/no_image.png'
          },
          content: 'Just finished an amazing React project! The new hooks are incredible 🚀',
          timestamp: '2 hours ago',
          likes: 24,
          comments: 8
        },
        {
          id: 2,
          user: {
            name: 'Emma Wilson',
            avatar: '/assets/images/no_image.png'
          },
          content: 'JavaScript tips that changed my coding game forever! Thread 🧵',
          timestamp: '4 hours ago',
          likes: 156,
          comments: 23
        }
      ],
      hashtags: [
        {
          tag: '#react',
          posts: '45.2k posts',
          trending: true
        },
        {
          tag: '#javascript',
          posts: '123k posts',
          trending: false
        }
      ],
      places: [
        {
          id: 1,
          name: 'New York, NY',
          posts: '2.1M posts'
        }
      ]
    };

    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
      
      // Add to recent searches
      if (searchQuery && !recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
    }, 800);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      performSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
    setResults({ users: [], posts: [], hashtags: [], places: [] });
  };

  const handleRecentSearch = (searchTerm) => {
    setQuery(searchTerm);
    setSearchParams({ q: searchTerm });
    performSearch(searchTerm);
  };

  const getResultCount = () => {
    const total = results.users.length + results.posts.length + results.hashtags.length + results.places.length;
    return total;
  };

  const showEmptyState = !loading && query && getResultCount() === 0;
  const showSearchPrompt = !query && !loading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <form onSubmit={handleSearch} className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for people, posts, hashtags..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </form>
        </div>

        {/* Filters */}
        {showFilters && (
          <SearchFilters onClose={() => setShowFilters(false)} />
        )}

        {/* Search Tabs */}
        {query && (
          <SearchTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            resultCounts={{
              all: getResultCount(),
              users: results.users.length,
              posts: results.posts.length,
              hashtags: results.hashtags.length,
              places: results.places.length
            }}
          />
        )}
      </div>

      <main className="pb-20">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Search Prompt */}
        {showSearchPrompt && (
          <div className="p-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Searches</h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="flex items-center space-x-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Trending</span>
              </h3>
              <div className="space-y-2">
                {trendingSearches.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(trend)}
                    className="flex items-center space-x-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">{trend}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {showEmptyState && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or check the spelling.</p>
            <button
              onClick={clearSearch}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Search Results */}
        {!loading && query && getResultCount() > 0 && (
          <div className="space-y-6">
            {/* All Results or Filtered Results */}
            {(activeTab === 'all' || activeTab === 'users') && results.users.length > 0 && (
              <div className="bg-white">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">People</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {results.users.map((user) => (
                    <UserResult key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'posts') && results.posts.length > 0 && (
              <div className="bg-white">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Posts</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {results.posts.map((post) => (
                    <PostResult key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'hashtags') && results.hashtags.length > 0 && (
              <div className="bg-white">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Hashtags</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {results.hashtags.map((hashtag, index) => (
                    <HashtagResult key={index} hashtag={hashtag} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SearchResults;
