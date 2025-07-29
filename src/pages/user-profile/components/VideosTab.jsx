import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideosTab = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Video" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No videos yet</h3>
        <p className="text-text-secondary">Videos will appear here when they're uploaded.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-surface border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative aspect-video bg-muted">
              <Image
                src={video.thumbnail}
                alt={video.title || 'Video thumbnail'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                  <Icon name="Play" size={24} className="text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>
            
            <div className="p-3">
              <h4 className="font-medium text-text-primary line-clamp-2 mb-1">
                {video.title || 'Untitled Video'}
              </h4>
              <p className="text-sm text-text-secondary">
                {video.views.toLocaleString()} views • {new Date(video.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-1000 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors duration-200"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="bg-surface rounded-lg overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh] object-contain"
                poster={selectedVideo.thumbnail}
              >
                <source src={selectedVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {selectedVideo.title || 'Untitled Video'}
                </h3>
                {selectedVideo.description && (
                  <p className="text-text-secondary mb-3">{selectedVideo.description}</p>
                )}
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{selectedVideo.views.toLocaleString()} views</span>
                  <span>{new Date(selectedVideo.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideosTab;