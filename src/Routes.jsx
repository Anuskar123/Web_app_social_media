import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserLogin from "pages/user-login";
import UserRegistration from "pages/user-registration";
import CreatePost from "pages/create-post";
import Settings from "pages/settings";
import Messages from "pages/messages";
import UserProfile from "pages/user-profile";
import NewsFeed from "pages/news-feed"; // Restore the full news feed
// import MinimalNewsFeed from "components/MinimalNewsFeed"; // Demo version
import SearchResults from "pages/search-results";
import Notifications from "pages/notifications";
import NotFound from "pages/NotFound";

import { supabase } from "utils/supabaseClient";

function useSupabaseAuth() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);
  return isAuthenticated;
}

const Routes = () => {
  const isAuthenticated = useSupabaseAuth();
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Only show login/register if not authenticated */}
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<UserLogin />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="*" element={<UserLogin />} />
          </>
        ) : (
          <>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;