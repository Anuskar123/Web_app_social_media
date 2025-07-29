import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotosTab = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Image" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No photos yet</h3>
        <p className="text-text-secondary">Photos will appear here when they're uploaded.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.url}
              alt={photo.caption || 'Photo'}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-1000 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors duration-200"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="bg-surface rounded-lg overflow-hidden">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Photo'}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {selectedPhoto.caption && (
                <div className="p-4">
                  <p className="text-text-primary">{selectedPhoto.caption}</p>
                  <p className="text-sm text-text-secondary mt-2">
                    {new Date(selectedPhoto.timestamp).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotosTab;