import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import PostsTab from './components/PostsTab';
import PhotosTab from './components/PhotosTab';
import VideosTab from './components/VideosTab';
import AboutTab from './components/AboutTab';
import FriendsTab from './components/FriendsTab';
import EditProfileModal from './components/EditProfileModal';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get current user from Supabase session
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    import('../../utils/supabaseClient').then(({ supabase }) => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUserData(user || {});
      });
    });
  }, []);

  // No posts, photos, videos, or friends until user adds their own
  const [userPosts] = useState([]);
  const [userPhotos] = useState([]);
  const [userVideos] = useState([]);
  const [userFriends] = useState([]);
  const mutualFriends = [];

  useEffect(() => {
    setIsLoading(false);
  }, [userId]);

  const handleEditProfile = () => setIsEditModalOpen(true);
  const handleSaveProfile = async (updatedData) => setUserData(prev => ({ ...prev, ...updatedData }));
  const handleFriendAction = () => {};
  const handlePostInteraction = () => {};
  const handleRemoveFriend = () => {};
  const handleMessageFriend = () => {};

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab user={userData} />;
      case 'posts':
        return <PostsTab posts={userPosts} />;
      case 'photos':
        return <PhotosTab photos={userPhotos} />;
      case 'videos':
        return <VideosTab videos={userVideos} />;
      case 'friends':
        return <FriendsTab friends={userFriends} mutualFriends={mutualFriends} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 lg:pl-64">
        <div className="animate-pulse">
          <div className="h-48 md:h-64 bg-muted"></div>
          <div className="px-4 pb-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted mx-auto md:mx-0 mb-4 md:mb-0"></div>
                <div className="text-center md:text-left md:pb-4">
                  <div className="h-8 bg-muted rounded mb-2 w-48 mx-auto md:mx-0"></div>
                  <div className="h-4 bg-muted rounded mb-3 w-64 mx-auto md:mx-0"></div>
                  <div className="flex justify-center md:justify-start space-x-6">
                    <div className="h-12 w-16 bg-muted rounded"></div>
                    <div className="h-12 w-16 bg-muted rounded"></div>
                    <div className="h-12 w-16 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Determine if viewing own profile
  const isOwnProfile = !userId || (userData && userId === userData.id);

  return (
    <div className="min-h-screen bg-background pt-16 lg:pl-64 pb-16 lg:pb-0">
      <div className="max-w-4xl mx-auto">
        {userData ? (
          <ProfileHeader
            user={userData}
            isOwnProfile={isOwnProfile}
            onEditProfile={handleEditProfile}
            onFriendAction={handleFriendAction}
          />
        ) : (
          <div className="text-center text-red-500 py-8">No user data found.</div>
        )}

        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          postCount={userPosts.length}
          photoCount={userPhotos.length}
          videoCount={userVideos.length}
        />

        <div className="p-4">
          {renderTabContent()}
        </div>
      </div>

      <EditProfileModal
        user={userData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default UserProfile;